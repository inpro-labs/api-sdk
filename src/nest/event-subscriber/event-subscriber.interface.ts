import { Event } from "types-ddd";

export type IEventSubscriber = {
  handle(data: Event): void | Promise<void>;
};
