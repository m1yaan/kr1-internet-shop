const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();
let products = [
  { id: nanoid(8), name: 'Смартфон Galaxy S23', category: 'Электроника', description: 'Флагманский смартфон с отличной камерой', price: 69990, stock: 12, rating: 4.7, imageUrl: 'https://via.placeholder.com/200x200?text=Phone' },
  { id: nanoid(8), name: 'Ноутбук MacBook Air', category: 'Электроника', description: 'Легкий и мощный ноутбук для работы', price: 89990, stock: 8, rating: 4.9, imageUrl: 'https://via.placeholder.com/200x200?text=Laptop' },
  { id: nanoid(8), name: 'Наушники Sony WH-1000XM5', category: 'Аудио', description: 'Беспроводные наушники с шумоподавлением', price: 29990, stock: 20, rating: 4.8, imageUrl: 'https://via.placeholder.com/200x200?text=Headphones' },
  { id: nanoid(8), name: 'Умные часы Apple Watch', category: 'Электроника', description: 'Смарт-часы с отслеживанием здоровья', price: 39990, stock: 10, rating: 4.6, imageUrl: 'https://via.placeholder.com/200x200?text=Watch' },
  { id: nanoid(8), name: 'Футболка хлопковая', category: 'Одежда', description: 'Качественная хлопковая футболка', price: 1990, stock: 50, rating: 4.3, imageUrl: 'https://via.placeholder.com/200x200?text=TShirt' },
  { id: nanoid(8), name: 'Кроссовки Nike Air', category: 'Обувь', description: 'Спортивные кроссовки для бега', price: 7990, stock: 25, rating: 4.5, imageUrl: 'https://via.placeholder.com/200x200?text=Shoes' },
  { id: nanoid(8), name: 'Книга "JavaScript для профессионалов"', category: 'Книги', description: 'Углубленное руководство по JavaScript', price: 1500, stock: 30, rating: 4.9, imageUrl: 'https://via.placeholder.com/200x200?text=Book' },
  { id: nanoid(8), name: 'Кофеварка DeLonghi', category: 'Дом', description: 'Автоматическая кофеварка', price: 24990, stock: 5, rating: 4.7, imageUrl: 'https://via.placeholder.com/200x200?text=Coffee' },
  { id: nanoid(8), name: 'Игровая мышь Logitech', category: 'Компьютеры', description: 'Игровая мышь с подсветкой', price: 3990, stock: 18, rating: 4.4, imageUrl: 'https://via.placeholder.com/200x200?text=Mouse' },
  { id: nanoid(8), name: 'Рюкзак городской', category: 'Аксессуары', description: 'Вместительный рюкзак для повседневной носки', price: 3490, stock: 22, rating: 4.2, imageUrl: 'https://via.placeholder.com/200x200?text=Backpack' }
];

function findProductOr404(id, res) {
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Товар не найден' });
    return null;
  }
  return product;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный ID
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           description: Рейтинг товара (0-5)
 *         imageUrl:
 *           type: string
 *           description: URL изображения
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Информация о товаре
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
router.get('/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (product) res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Некорректные данные
 */
router.post('/', (req, res) => {
  const { name, category, description, price, stock, rating, imageUrl } = req.body;
  
  if (!name || !price || stock === undefined) {
    return res.status(400).json({ error: 'Необходимо указать name, price и stock' });
  }
  
  const newProduct = {
    id: nanoid(8),
    name: name.trim(),
    category: category || 'Без категории',
    description: description || '',
    price: Number(price),
    stock: Number(stock),
    rating: rating ? Number(rating) : 0,
    imageUrl: imageUrl || ''
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить товар (частичное обновление)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
router.patch('/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  
  const { name, category, description, price, stock, rating, imageUrl } = req.body;
  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Нет данных для обновления' });
  }
  
  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (rating !== undefined) product.rating = Number(rating);
  if (imageUrl !== undefined) product.imageUrl = imageUrl;
  
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 */
router.delete('/:id', (req, res) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;