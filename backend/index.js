import cors from "@fastify/cors";
import Fastify from "fastify";
import path from "path";
import { startServer, updateAllHabitsWithToday } from "./utils.js";

import { getHabits } from "./routes/get/getHabits.js";
import { getHabitById } from "./routes/get/getHabitById.js";
import { getTodayHabits } from "./routes/get/getTodayHabits.js";
import { deleteHabits } from "./routes/delete/deleteHabits.js";
import { deleteHabitById } from "./routes/delete/deleteHabitById.js";
import { postHabit } from "./routes/post/postHabit.js";
import { patchHabit } from "./routes/patch/patchHabit.js";

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

postHabit(fastify, dbFile);

patchHabit(fastify, dbFile);

deleteHabits(fastify, dbFile);
deleteHabitById(fastify, dbFile);

await updateAllHabitsWithToday(dbFile);

await startServer(fastify, dbFile);
