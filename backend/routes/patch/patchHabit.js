import fs from "fs/promises";
import { readDbFile } from "../../utils.js";

export const patchHabit = (fastify, dbFile) => {
    fastify.patch('/habit/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const today = new Date().toISOString().split('T')[0];

            const data = await readDbFile(dbFile, "utf-8");
            const habitIndex = data.habits.findIndex(habit => habit.id === id);

            if (habitIndex === -1) {
                return res.status(404).send({ error: 'Resource not found.' });
            }

            if (title) {
                data.habits[habitIndex].title = title;
            }

            if (!data.habits[habitIndex].daysDone[today]) {
                data.habits[habitIndex].daysDone[today] = false;
            }

            await fs.writeFile(dbFile, JSON.stringify(data, null, 2), "utf-8");
            res.send({ message: 'The resource updated successfully', habit: data.habits[habitIndex] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Failed to update the resource.' });
        }
    });
};