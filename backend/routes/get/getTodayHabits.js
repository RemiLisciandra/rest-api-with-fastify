import { readDbFile } from "../../utils.js";

export const getTodayHabits = (fastify, dbFile) => {
  fastify.get("/habits/today", async (req, res) => {
    try {
      const data = await readDbFile(dbFile, "utf-8");
      const habits = Array.isArray(data.habits) ? data.habits : [];
      let results = [];
      const today = new Date().toISOString().split("T")[0];

      habits.forEach((habit) => {
        if (habit.daysDone && today in habit.daysDone) {
          results.push(habit);
        }
      });
      return res.send(results);
    } catch (error) {
      res.status(500).send({ error: "Failed to read resource" });
    }
  });
};
