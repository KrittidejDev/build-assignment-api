import * as AssignmentModel from "../models/assignmentModel.mjs";

// GET /assignments
export const getAssignments = async (req, res) => {
  try {
    const data = await AssignmentModel.getAllAssignments();
    res.status(200).json({ data });
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
};

// GET /assignments/:assignmentId
export const getAssignment = async (req, res) => {
  try {
    const assignment = await AssignmentModel.getAssignmentById(
      req.params.assignmentId
    );
    if (!assignment)
      return res
        .status(404)
        .json({ message: "Server could not find a requested assignment" });
    res.status(200).json({ data: assignment });
  } catch (err) {
    res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
};

// POST /assignments
export const createAssignment = async (req, res) => {
  const { title, content, category } = req.body;
  // Validation
  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!content) return res.status(400).json({ message: "Content is required" });
  if (!category)
    return res.status(400).json({ message: "Category is required" });

  try {
    const assignment = await AssignmentModel.createAssignment(req.body);
    res.status(201).json({ data: assignment });
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).json({
      message: "Server could not create assignment because database connection",
    });
  }
};

// PUT /assignments/:assignmentId
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await AssignmentModel.getAssignmentById(
      req.params.assignmentId
    );
    if (!assignment)
      return res.status(404).json({
        message: "Server could not find a requested assignment to update",
      });

    await AssignmentModel.updateAssignment(req.params.assignmentId, req.body);
    res.status(200).json({ message: "Updated assignment successfully" });
  } catch (err) {
    console.log("err put assignment", err);
    res.status(500).json({
      message: "Server could not update assignment because database connection",
    });
  }
};

// DELETE /assignments/:assignmentId
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await AssignmentModel.getAssignmentById(
      req.params.assignmentId
    );
    if (!assignment)
      return res.status(404).json({
        message: "Server could not find a requested assignment to delete",
      });

    await AssignmentModel.deleteAssignment(req.params.assignmentId);
    res.status(200).json({ message: "Deleted assignment successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server could not delete assignment because database connection",
    });
  }
};
