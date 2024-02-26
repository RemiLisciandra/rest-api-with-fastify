import fs from "fs/promises";
import { readDbFile } from "../../utils.js";
import { v4 as uuidv4 } from "uuid";

export const postHabit = (fastify, dbFile) => {
  fastify.post(
    "/habit/new",
    {
      schema: {
        body: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
    async (req, res) => {
      try {
        const data = await readDbFile(dbFile, "utf-8");
        const { title } = req.body;

        const titleExists = data.habits.some((habit) => habit.title === title);
        if (titleExists) {
          return res
            .status(400)
            .send({ error: "A resource with this title already exists." });
        }

        const today = new Date().toISOString().split("T")[0];

        const createdHabit = {
          id: uuidv4(),
          title,
          daysDone: { [today]: false },
        };

        data.habits.push(createdHabit);
        await fs.writeFile(dbFile, JSON.stringify(data, null, 2), "utf-8");
        res.send({
          message: "The habit has been successfully created",
          habit: createdHabit,
        });
      } catch {
        res.status(500).send({ error: "Failed to create the habit" });
      }
    }
  );
};
