import express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.mjs";

const app = express();
const port = 4001;

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form-urlencoded

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.use("/assignments", assignmentRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
