import {readDbFile} from "../../utils.js";

export const getHabitById = (fastify, dbFile) => {
    fastify.get('/habits/:id', async (req, res) => {
        try {
            const data = await readDbFile(dbFile, "utf-8");
            const habits = data.habits;
            const id = parseInt(req.params.id, 10);

            const habit = habits.find(habit => habit.id === id);

            if(habit) {
                res.send(habit);
            } else {
                res.status(404).send({ error: 'Resource not found' });
            }

        } catch {
            res.status(500).send({ error: 'Failed to read resource' });
        }
    });
};