import Event from '../models/Event.js';
import { eventSchema } from '../validators/eventValidator.js';

export const getActiveEvents = async (request, reply) => {
  try {
    const today = new Date();
    const events = await Event.find({ 
      isActive: true, 
      endDate: { $gte: today } 
    }).sort({ startDate: 1 });
    reply.code(200).send(events);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getAllEvents = async (request, reply) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    reply.code(200).send(events);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const createEvent = async (request, reply) => {
  try {
    const data = eventSchema.parse(request.body);
    const event = new Event(data);
    await event.save();
    reply.code(201).send(event);
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors });
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const deleteEvent = async (request, reply) => {
  try {
    const event = await Event.findByIdAndDelete(request.params.id);
    if (!event) return reply.code(404).send({ error: 'Event not found' });
    reply.code(200).send({ success: true });
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};
