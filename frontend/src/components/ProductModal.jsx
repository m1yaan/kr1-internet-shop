import React, { useState, useEffect } from 'react';

function ProductModal({ open, mode, product, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    rating: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        rating: product.rating || '',
        imageUrl: product.imageUrl || ''
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        rating: '',
        imageUrl: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      name: formData.name.trim(),
      category: formData.category.trim() || 'Без категории',
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      imageUrl: formData.imageUrl.trim()
    };
    
    if (!data.name || !data.price || !data.stock) {
      alert('Заполните обязательные поля: название, цена, количество');
      return;
    }
    
    onSubmit(data);
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">
            {mode === 'create' ? 'Добавить товар' : 'Редактировать товар'}
          </h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите название товара"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Категория</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Например: Электроника, Одежда..."
            />
          </div>
          
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание товара"
              rows={3}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Цена *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Количество *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Рейтинг</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="0-5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>URL изображения</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          
          <div className="modal__footer">
            <button type="button" className="btn btn--cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;