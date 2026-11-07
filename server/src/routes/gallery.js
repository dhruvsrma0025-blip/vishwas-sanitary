import { Router } from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryFile = path.resolve(__dirname, '../../data/gallery.json');

router.get('/', async (req, res, next) => {
  try {
    const raw = await fs.readFile(galleryFile, 'utf8');
    const data = JSON.parse(raw);
    const categories = data.categories || [];
    const category = typeof req.query.category === 'string' ? req.query.category : 'all';

    if (category !== 'all' && !categories.some((entry) => entry.id === category)) {
      return res.status(400).json({
        success: false,
        message: `Unknown category "${category}".`,
        categories,
      });
    }

    const items =
      category === 'all'
        ? data.items
        : data.items.filter((item) => item.category === category);

    return res.json({
      success: true,
      count: items.length,
      category,
      categories,
      items,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
