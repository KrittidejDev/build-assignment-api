import express from "express";
import * as AssignmentController from "../controllers/assignmentController.mjs";

const router = express.Router();

router.get("/", AssignmentController.getAssignments);
router.post("/", AssignmentController.createAssignment);
router.get("/:assignmentId", AssignmentController.getAssignment);
router.put("/:assignmentId", AssignmentController.updateAssignment);
router.delete("/:assignmentId", AssignmentController.deleteAssignment);

export default router;
