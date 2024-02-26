import {readDbFile} from "../../utils.js";

export const getHabits = (fastify, dbFile) => { // Ajout de dbFile comme argument
    fastify.get('/habits', async (req, res) => {
        try {
            return await readDbFile(dbFile);
        } catch (error) {
            res.status(500).send({ error: 'Failed to read data' });
        }
    });
};