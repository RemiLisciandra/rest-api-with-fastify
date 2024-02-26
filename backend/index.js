import cors from "@fastify/cors";
import Fastify from "fastify";
import fs from "fs/promises";
import path from "path";

const fastify = Fastify({
  logger: true,
});

const dbDir = path.join(process.cwd(), "db");
const dbFile = path.join(dbDir, "db.json");

async function ensureDatabaseDirExists() {
  try {
    await fs.access(dbDir);
  } catch {
    await fs.mkdir(dbDir);
  }
}

async function checkHabitsFileExists() {
  try {
    await fs.access(dbFile);
    return true;
  } catch {
    return false;
  }
}

async function ensureHabitsJsonFileExists() {
  await ensureDatabaseDirExists();
  const fileExists = await checkHabitsFileExists();
  if (!fileExists) {
    try {
      await fs.writeFile(dbFile, '', "utf-8");
      fastify.log.info("Habits JSON file created successfully");
    } catch (error) {
      fastify.log.error(error);
    }
  } else {
    fastify.log.info("Habits JSON file already exists");
  }
}

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

const startServer = async() => {
  try {
    await fastify.listen({ port: 3000 });
    await ensureHabitsJsonFileExists();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

await startServer();
