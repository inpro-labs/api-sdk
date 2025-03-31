import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';

export const EVENT_SUBSCRIBE_CLASS_METADATA = 'event:subscribe:class';

export function EventSubscribe(eventName: string): ClassDecorator {
  return (target: any) => {
    SetMetadata(EVENT_SUBSCRIBE_CLASS_METADATA, eventName)(target);
  };
}
