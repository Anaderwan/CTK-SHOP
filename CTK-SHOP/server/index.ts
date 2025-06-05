// server/index.ts
import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// ESM fix za __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get('/stores', async (_, res) => {
  try {
    const filePath = path.join(__dirname, 'db.json');
    const data = await readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    res.json(json.stores);
  } catch (err) {
    res.status(500).json({ error: 'Nije moguće pročitati stores iz db.json.' });
  }
});

app.get('/items', async (_, res) => {
  try {
    const filePath = path.join(__dirname, 'db.json');
    const data = await readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    res.json(json.items);
  } catch (err) {
    res.status(500).json({ error: 'Nije moguće pročitati items iz db.json.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server je pokrenut na http://localhost:${port}`);
});
