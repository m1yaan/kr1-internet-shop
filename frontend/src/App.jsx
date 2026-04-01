import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">Интернет-магазин</h1>
          <p className="header__subtitle">КР1 — Управление товарами</p>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <ProductList />
        </div>
      </main>
      <footer className="footer">
        <div className="footer__inner">
          © {new Date().getFullYear()} — Фронтенд и бэкенд разработка
        </div>
      </footer>
    </div>
  );
}

export default App;