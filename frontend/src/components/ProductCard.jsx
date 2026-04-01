import React from 'react';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="product-card__placeholder">📷</div>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <span className="product-card__category">{product.category}</span>
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__footer">
          <div className="product-card__price">
            {product.price.toLocaleString()} ₽
          </div>
          <div className="product-card__stock">
            {product.stock} шт.
          </div>
          {product.rating > 0 && (
            <div className="product-card__rating">
              {product.rating}
            </div>
          )}
        </div>
        
        <div className="product-card__actions">
          <button className="btn btn--edit" onClick={() => onEdit(product)}>
            Редактировать
          </button>
          <button className="btn btn--delete" onClick={() => onDelete(product.id)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;