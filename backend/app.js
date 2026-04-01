const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Swagger конфигурация
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Интернет-магазин API',
      version: '1.0.0',
      description: 'API для управления товарами в интернет-магазине',
      contact: {
        name: 'Студент',
        email: 'student@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Локальный сервер'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'stock'],
          properties: {
            id: {
              type: 'string',
              description: 'Уникальный ID товара'
            },
            name: {
              type: 'string',
              description: 'Название товара'
            },
            category: {
              type: 'string',
              description: 'Категория товара'
            },
            description: {
              type: 'string',
              description: 'Описание товара'
            },
            price: {
              type: 'number',
              description: 'Цена товара'
            },
            stock: {
              type: 'integer',
              description: 'Количество на складе'
            },
            rating: {
              type: 'number',
              description: 'Рейтинг товара (0-5)'
            },
            imageUrl: {
              type: 'string',
              description: 'URL изображения товара'
            }
          },
          example: {
            name: 'Смартфон XYZ',
            category: 'Электроника',
            description: 'Мощный смартфон с отличной камерой',
            price: 29990,
            stock: 15,
            rating: 4.5,
            imageUrl: 'https://example.com/phone.jpg'
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Маршруты
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), message: 'Сервер работает' });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

module.exports = app;