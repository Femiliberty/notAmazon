var Cart = require('../models/Cart');

module.exports = {
  add: (item, id) => {

    Cart.items[id] = item;
    console.log(Cart.items)
    // if (!storedItem) {
    //   storedItem = Cart.items[id] = { qty: 0, item: item, price: 0 };
    // }
    // storedItem.qty++;
    // storedItem.price = storedItem.item.price * storedItem.qty;
    // Cart.totalQty++;
    // Cart.totalPrice += storedItem.price;
  }
};