import { readDbFile } from "../../utils.js";
import fs from "fs/promises";

export const deleteHabitById = (fastify, dbFile) => {
  fastify.delete("/habits/:id", async (req, res) => {
    try {
      const data = await readDbFile(dbFile, "utf-8");
      const habits = data.habits;
      const id = parseInt(req.params.id, 10);

      const index = habits.findIndex((habit) => habit.id === id);

      if (index !== -1) {
        const deletedHabit = habits.splice(index, 1);
        await fs.writeFile(dbFile, JSON.stringify(data, null, 2), "utf-8");

        res.send({
          message: "Resource deleted successfully",
          habit: deletedHabit,
        });
      } else {
        res.status(404).send({ error: "Resource not found" });
      }
    } catch {
      res.status(500).send({ error: "Failed to read resource" });
    }
  });
};
