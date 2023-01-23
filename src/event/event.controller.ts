import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('event-all')
  getAllEvents() {
    return this.eventService.findAll();
  }
  @MessagePattern('event-by-id')
  getEventById(id: number) {
    return this.eventService.findById(id);
  }
  @EventPattern('event-create')
  async createNewEvent(event: CreateEventDto) {
    this.eventService.create(event);
  }
  @EventPattern('event-delete')
  async deleteEvent(id: number) {
    this.eventService.delete(id);
  }
}
