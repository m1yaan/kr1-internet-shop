class Product {
  constructor(id, name, category, description, price, stock, rating, imageUrl) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.rating = rating || 0;
    this.imageUrl = imageUrl || '';
    this.createdAt = new Date();
  }
}

module.exports = Product;