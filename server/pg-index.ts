
import express from 'express';
import bodyParser from 'body-parser';
import storesRoutes from './routes/stores';
import itemsRoutes from './routes/items';
import tagsRoutes from './routes/tags';
import itemsTagsRoutes from './routes/items_tags';

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Rute povezane sa stvarnom PostgreSQL bazom
app.use('/stores', storesRoutes);
app.use('/items', itemsRoutes);
app.use('/tags', tagsRoutes);
app.use('/items_tags', itemsTagsRoutes);

app.listen(port, () => {
  console.log(`🚀 PostgreSQL API running at http://localhost:${port}`);
});
