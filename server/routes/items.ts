// server/routes/items.ts
import express from 'express';
import { db } from '../pgServer';

const router = express.Router();

// GET all items
router.get('/', async (_, res) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju artikala.' });
  }
});

// POST new item
router.post('/', async (req, res) => {
  const { name, price, store_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items (name, price, store_id) VALUES ($1, $2, $3) RETURNING *',
      [name, price, store_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri dodavanju artikla.' });
  }
});

// PUT update item
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  try {
    const result = await db.query(
      'UPDATE items SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri ažuriranju artikla.' });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri brisanju artikla.' });
  }
});

export default router;
