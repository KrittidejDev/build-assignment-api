import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4001;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.post("/assignments" , async (req, res) => {
  try {
  const newAssignment = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
    published_at: new Date(),
  };

   await connectionPool.query(
    `insert into assignments (title, content, category, created_at, updated_at, published_at)
    values ($1, $2, $3, $4, $5, $6)`,
    [
      newAssignment.title, 
      newAssignment.content, 
      newAssignment.category,
      newAssignment.created_at,
      newAssignment.updated_at,
      newAssignment.published_at,
    ]
   );

  return res.status(201).json({
    message: "Assignment created successfully"});
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create assignment because database connection",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
