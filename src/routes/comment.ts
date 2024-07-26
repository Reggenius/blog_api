import { Router } from "express";
import commentController from "../controllers/commentController";
import authMiddleware from "../middleware/auth";
import validate from "../middleware/validate";
import { validateId, validateComment } from "../utils/validations";
import { extractParamFromBaseURL } from "../utils/validations";

const router = Router();

router.get("/", extractParamFromBaseURL, commentController.getPaginatedComments);

router.use(authMiddleware);
router.put("/:id", validate(validateId), validate(validateComment, false), commentController.updateAComment);
router.delete("/:id", validate(validateId), commentController.deleteAComment);

router.use(extractParamFromBaseURL);
router.post("/", validate(validateComment, false), commentController.createAComment);

export default router;