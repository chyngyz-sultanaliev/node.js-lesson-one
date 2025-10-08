import "dotenv/config";
import express from "express";
import path from "path";
import globalRouter from "./routes";

const buildServer = () => {
  const server = express();
  server.use(express.json());

  server.use(express.static(path.join(__dirname, "../public")));

  server.use("/api", globalRouter);

  server.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  server.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
  });

  return server;
};

export default buildServer;
