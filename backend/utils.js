import fs from "fs/promises";

async function checkHabitsFileExists(dbFile) {
  try {
    await fs.access(dbFile);
    return true;
  } catch {
    return false;
  }
}

async function ensureDatabaseDirExists(dbDir) {
  try {
    await fs.access(dbDir);
  } catch {
    await fs.mkdir(dbDir, { recursive: true });
  }
}

async function ensureHabitsJsonFileExists(dbFile, fastify) {
  const dbDir = dbFile.substring(0, dbFile.lastIndexOf("/"));
  await ensureDatabaseDirExists(dbDir);
  const fileExists = await checkHabitsFileExists(dbFile);
  if (!fileExists) {
    try {
      await fs.writeFile(dbFile, JSON.stringify({ habits: [] }), "utf-8");
      fastify.log.info("Habits JSON file created successfully.");
    } catch (error) {
      fastify.log.error(error);
    }
  } else {
    fastify.log.info("Habits JSON file already exists.");
  }
}

export async function readDbFile(dbFile) {
  try {
    const data = await fs.readFile(dbFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the DB file : ", error);
    throw error;
  }
}

export async function startServer(fastify, dbFile) {
  try {
    await fastify.listen({ port: 3000 });
    await ensureHabitsJsonFileExists(dbFile, fastify);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

export async function updateAllHabitsWithToday(dbFile) {
  try {
    console.log("Starting to update resources with today's date...");
    const data = await fs.readFile(dbFile, "utf-8");
    const jsonData = JSON.parse(data);

    const today = new Date().toISOString().split("T")[0];

    jsonData.habits.forEach((habit) => {
      if (!habit.daysDone[today]) {
        habit.daysDone[today] = false;
      }
    });

    await fs.writeFile(dbFile, JSON.stringify(jsonData, null, 2), "utf-8");
    console.log("All resources updated with today's date set to false.");
  } catch {
    console.error("Failed to update all resources with today's date.");
  }
}
