import cors from "@fastify/cors";
import Fastify from "fastify";
import path from "path";
import { startServer } from "./utils.js";

import { getHabits } from "./route/get/getHabits.js";
import {getHabitById} from "./route/get/getHabitById.js";
import {deleteHabitById} from "./route/delete/deleteHabitById.js";
import {getTodayHabits} from "./route/get/getTodayHabits.js";

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
getHabitById(fastify, dbFile);
getTodayHabits(fastify, dbFile);

deleteHabitById(fastify, dbFile);

await startServer(fastify, dbFile);