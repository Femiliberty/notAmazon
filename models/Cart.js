module.exports = function Cart(initItems) {
    this.items = initItems;

    this.totalQty = 0;
    this.totalPrice = 0;

    if (this.items) {
        for (var key in this.items) {
            this.totalQty += this.items[key].qty;
            this.totalPrice += this.items[key].qty * this.items[key].item.price;
        }
    }

    this.add = function (item, id, size, qty) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {qty: qty, item: item, size: size, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        storedItem.size = storedItem.size ? storedItem.size : size;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.removeOne = function (item, id) {
        var storedItem = this.items[id];
        storedItem.qty--;
        this.totalQty--;
        this.totalPrice -= storedItem.item.price;
        if(storedItem.qty == 0){
            delete this.items[id];
        }
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
