import { readDbFile } from "../../utils.js";

export const getTodayHabits = (fastify, dbFile) => {
  fastify.get("/habits/today", async (req, res) => {
    try {
      const data = await readDbFile(dbFile, "utf-8");
      const habits = data.habits;
      let results = [];
      const today = new Date().toISOString().split("T")[0];

      habits.forEach((habit) => {
        if (habit.daysDone && habit.daysDone[today]) {
          results.push(habit);
        }
      });

      if (results.length === 0) {
        return res.send({ habits: [] });
      } else {
        return res.send(results);
      }
    } catch {
      res.status(500).send({ error: "Failed to read resource" });
    }
  });
};
