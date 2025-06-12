// server/routes/items_tags.ts
import express from 'express';
import { db } from '../pgServer';

const router = express.Router();

// GET all item-tag pairs
router.get('/', async (_, res) => {
  try {
    const result = await db.query('SELECT * FROM items_tags ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju poveznica artikl-oznaka.' });
  }
});

// POST new item-tag relation
router.post('/', async (req, res) => {
  const { item_id, tag_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items_tags (item_id, tag_id) VALUES ($1, $2) RETURNING *',
      [item_id, tag_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri povezivanju artikla i oznake.' });
  }
});

// DELETE item-tag relation
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM items_tags WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri uklanjanju poveznice.' });
  }
});

export default router;
