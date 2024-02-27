import fs from "fs/promises";

export const deleteHabits = (fastify, dbFile) => {
  fastify.delete("/habits", async (req, res) => {
    try {
      await fs.writeFile(dbFile, JSON.stringify({ habits: [] }), "utf-8");
      res.send({ message: "All resources have been successfully deleted." });
    } catch {
      res.status(500).send({ error: "Failed to delete resource." });
    }
  });
};
