// server/routes/stores.ts
import express from 'express';
import { db } from '../pgServer';

const router = express.Router();

// GET all stores
router.get('/', async (_, res) => {
  try {
    const result = await db.query('SELECT * FROM stores ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju trgovina.' });
  }
});

// GET store by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM stores WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju trgovine.' });
  }
});

// POST new store
router.post('/', async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO stores (name, user_id) VALUES ($1, $2) RETURNING *',
      [name, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri unosu trgovine.' });
  }
});

// PUT update store
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const result = await db.query(
      'UPDATE stores SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri ažuriranju trgovine.' });
  }
});

// DELETE store
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM stores WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Greška pri brisanju trgovine.' });
  }
});

export default router;
