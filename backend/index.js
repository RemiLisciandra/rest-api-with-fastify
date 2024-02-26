import cors from "@fastify/cors";
import Fastify from "fastify";
import path from "path";
import { getHabits } from "./route/get/getHabits.js";
import { startServer } from "./utils.js";

const fastify = Fastify({
  logger: true,
});

const dbDir = path.join(process.cwd(), "db");
const dbFile = path.join(dbDir, "db.json");

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

getHabits(fastify, dbFile);

await startServer(fastify, dbFile);