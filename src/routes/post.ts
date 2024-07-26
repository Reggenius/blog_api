import { Router } from "express";
import postController from "../controllers/postController";
import validate from "../middleware/validate";
import { validatePostCreation, validateId } from "../utils/validations";
import authMiddleware from "../middleware/auth";

const router = Router();

router.get("/", postController.getPaginatedPosts);
router.get("/:id", validate(validateId), postController.getPost);

router.use(authMiddleware);
router.post("/", validate(validatePostCreation, false), postController.createAPost);
router.put("/:id", validate(validateId), validate(validatePostCreation, false), postController.updateAPost);
router.delete("/:id", validate(validateId), postController.deleteAPost);

export default router;