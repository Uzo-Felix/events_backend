import { Router } from 'express';
import protect from '../middleware/auth.middleware';
import upload from '../config/multer-cloudinary-config';
import {
	changePassword,
	getUserPreference,
	updateUserPreference,
	updateUserProfile,
} from '../Controllers/user.controller';
const router = Router();

/*@GET /user/
 * This route should
 */
router.get('/settings', protect, getUserPreference);

/*@POST /user
 * This route should
 */
router.post('/settings', protect, updateUserPreference);

/*@POST /user
 * This route should
 */
router.put('/update-profile', upload.single('avatar'), protect, updateUserProfile);

/*@POST /user
 * This route should
 */
router.patch('/change-password', protect, changePassword);

export default router;
