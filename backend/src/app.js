import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Routes
import sessionRoutes from "./routes/session.routes.js";
import participantRoutes from "./routes/participant.routes.js";
import responseRoutes from "./routes/response.routes.js";
import processRoutes from "./routes/process.routes.js";
import questionRoutes from "./routes/question.routes.js";
// import reportRoutes from "./routes/report.routes.js";
import resultRoutes from "./routes/result.routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/sessions", sessionRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/process", processRoutes);
app.use("/api/questions", questionRoutes);
// app.use("/api/report", reportRoutes);
app.use("/api/results", resultRoutes);

export default app;
