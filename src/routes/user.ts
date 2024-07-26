import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/auth";
import { validateUserRegistration, validateLoginInput } from "../utils/validations";
import validate from "../middleware/validate";


const router = Router();

router.post("/register", validate(validateUserRegistration, false), userController.registerUser);
router.post("/login", validate(validateLoginInput, false), userController.authenticateUser);

router.use(authMiddleware);
router.get("/profile", userController.getUser);

export default router;