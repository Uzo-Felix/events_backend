import { Router } from 'express';
import upload from '../config/multer-cloudinary-config';
import {
	createEvent,
	eventSearch,
	getAllEvents,
	getEventById,
	deleteEvent,
	updateEvent,
	getEventsCalendar,
	getUpcomingEvents,
	registerForEvent,
} from '../Controllers/event.controller';
import protect from '../middleware/auth.middleware';
const router = Router();

/*@POST /events
 * This route should take care of creating events should return a 201
 * PROTECTED ROUTE
 */
router.post('/', upload.single('image'), protect, createEvent);

/*@GET /events
 * This route should take care of getting events created by all users
 * PROTECTED ROUTE
 */
router.get('/', getAllEvents);

/*@GET /events/upcoming
 * PROTECTED ROUTE
 */
router.get('/upcoming', getUpcomingEvents);

/*@GET /events/calendar
 * This route should take care of getting all events (calendar)
 * PROTECTED ROUTE
 */
router.get('/calendar', protect, getEventsCalendar);

/*@GET /events/search?keyword=
 * This route should take care of the searching event by name
 */
router.get('/search', eventSearch);

/*@GET /events/eventId/register
 * This route should take care of registering the user a particular event
 */
router.get('/:eventId/register', registerForEvent);

/*@GET /events/eventId
 * This route should take care of getting a particular event
 */
router.get('/:eventId', getEventById);

/*@PUT /events/:id
 * This route should take care of updating events should return a 201
 * PROTECTED ROUTE
 */
router.put('/:eventId', upload.single('image'), protect, updateEvent);

/*@DELETE /events/eventId
 * This route should take care of deleting a particular event
 */
router.delete('/:eventId', deleteEvent);

export default router;
