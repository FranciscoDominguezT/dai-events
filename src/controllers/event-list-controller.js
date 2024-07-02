import {Router} from "express";
import EventListService from '../services/event-list-service.js';

const router = Router();
const svc = new EventListService();

router.get('', async (req, res) => {
    let response;
    const returnArray = await svc.getAllAsync();

    if (returnArray != null) {
        response = res.status(200).json(returnArray);
    } else {
        response = res.status(500).send('Error interno');
    }
    return response;
});

router.get('/:id', async (req, res) => {
    let response;
    const element = req.params.id;
    
    const returnArray = await svc.getDetailsAsync(element);
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Evento no encontrado');
    }
    return response;
});

router.get('/:id/enrollment', async (req, res) => {
    let response;
    const eventId = req.params.id;
    
    const returnArray = await svc.getParticipantsAsync(eventId);
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Evento no encontrado');
    }
    return response;
});

router.get('/', async (req, res) => {
  const { name, category, startDate, endDate, page, pageSize } = req.query;

  try {
      const events = await searchEvents({ name, category, startDate, endDate, page, pageSize });
      res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

export default router;