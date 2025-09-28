import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = Router();

router.post('/register', UserController.registerRider);
router.post('/login', UserController.loginRider);
router.get('/me', authenticateToken, UserController.getMyProfile);

export default router;