// server/routes/tags.ts
import express from 'express';
import { db } from '../pgServer';

const router = express.Router();

// GET all tags
router.get('/', async (_, res) => {
  try {
    const result = await db.query('SELECT * FROM tags ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju oznaka.' });
  }
});

// POST new tag
router.post('/', async (req, res) => {
  const { name, store_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tags (name, store_id) VALUES ($1, $2) RETURNING *',
      [name, store_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri dodavanju oznake.' });
  }
});

// PUT update tag
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const result = await db.query(
      'UPDATE tags SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri ažuriranju oznake.' });
  }
});

// DELETE tag
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM tags WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri brisanju oznake.' });
  }
});

export default router;
