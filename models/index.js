// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { route } = require('../routes/api/tag-routes');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})
// Categories have many Products
Category.hasMany(Product, {
  onDelete: 'CASCADE'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: ProductTag
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
