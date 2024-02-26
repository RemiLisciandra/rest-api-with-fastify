import {readDbFile} from "../../utils.js";

export const getHabits = (fastify, dbFile) => {
    fastify.get('/habits', async (req, res) => {
        try {
            return await readDbFile(dbFile, "utf-8");
        } catch (error) {
            res.status(500).send({ error: 'Failed to read resource' });
        }
    });
};