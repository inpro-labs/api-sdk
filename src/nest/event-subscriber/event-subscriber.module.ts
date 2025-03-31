import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { EventSubscriberExplorer } from "./event-subscriber.explorer";

@Module({
  imports: [DiscoveryModule],
  providers: [EventSubscriberExplorer],
})
export class EventSubscribeModule {}
