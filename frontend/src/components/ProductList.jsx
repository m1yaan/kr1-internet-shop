import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { api } from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setError('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = () => {
    setModalMode('create');
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setModalMode('edit');
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить этот товар?')) return;
    try {
      await api.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error('Ошибка удаления:', err);
      alert('Не удалось удалить товар');
    }
  };

  const handleSubmit = async (productData) => {
    try {
      if (modalMode === 'create') {
        await api.createProduct(productData);
      } else {
        await api.updateProduct(editingProduct.id, productData);
      }
      await loadProducts();
      setModalOpen(false);
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      alert('Не удалось сохранить товар');
    }
  };

  if (loading) return <div className="loading">Загрузка товаров...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">Товары ({products.length})</h2>
        <button className="btn btn--primary" onClick={handleCreate}>
          + Добавить товар
        </button>
      </div>
      
      {products.length === 0 ? (
        <div className="empty-state">
          <p>Нет товаров. Создайте первый товар!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      <ProductModal
        open={modalOpen}
        mode={modalMode}
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ProductList;