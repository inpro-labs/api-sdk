import { Context } from "rich-domain";
import { ConsoleLogger, Injectable, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, Reflector } from "@nestjs/core";
import { EVENT_SUBSCRIBE_CLASS_METADATA } from "./event-subscriber.decorator";
import { IEventSubscriber } from "./event-subscriber.interface";

@Injectable()
export class EventSubscriberExplorer implements OnModuleInit {
  private readonly subscribedEvents: string[] = [];
  private readonly events = Context.events();
  private readonly logger = new ConsoleLogger("EventSubscriberExplorer");

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    this.logger.log("Initializing event subscribers...");

    for (const wrapper of providers) {
      const instance = wrapper.instance as unknown;
      const metatype = wrapper.metatype;

      if (!instance || !metatype) continue;

      const eventName: string = this.reflector.get(
        EVENT_SUBSCRIBE_CLASS_METADATA,
        metatype
      );

      if (!eventName) continue;

      const subscriber = instance as IEventSubscriber;

      if (eventName && typeof subscriber.handle === "function") {
        this.subscribedEvents.push(eventName);
        this.events.subscribe(eventName, async (data) => {
          this.logger.log(`Event ${eventName} received`);
          await subscriber.handle(data);
        });
      }
    }

    this.logger.log(
      this.subscribedEvents.length > 0
        ? `Event subscribers initialized: ${this.subscribedEvents.join(", ")}`
        : "No events subscribed"
    );
  }

  onModuleDestroy() {
    for (const eventName of this.subscribedEvents) {
      this.events.removerEvent(eventName);
    }

    this.logger.log("Event subscribers removed");
  }
}
