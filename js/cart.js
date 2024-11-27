class Product{
    constructor(name, price, size, quantity){
        this.price = price;
        this.name = name;
        this.size = size;
        this.quantity = quantity;
    }
}

class Order{
    constructor(){
        this.date;
        this.product = [];
    }

    addProduct(product){
        let currentOrder = localStorage.getItem('order');
        this.product = JSON.parse(currentOrder);
        this.product.push(product);
        localStorage.setItem('order', JSON.stringify(this.product));
    }

    displayOrder(){
        console.log(JSON.parse(localStorage.getItem('order')));
    }
}

function validateOrder(id){
    let productSize = U.$(id + 'Size');
    let productQuantity = U.$(id + 'Quantity');
    let productPrice = U.$(id + 'Price');
    let productName = U.$(id + 'Name');
    let isSize = false;
    let isQuantity = false;

    //validates that a size has been selected
    if(productSize.value == "selectSize"){
        if(!(U.$(id + 'SizeError'))){
            addErrorMessage(id + 'Size', "Please select a valid size"); 
            isQuantity = false;
        } 
    }  else if(U.$(id + 'SizeError')){
        removeErrorMessage( id + 'SizeError');
        isSize = true;
    }   else{
        isSize = true;
    }
    
    //validates if a quantity has been selected
    if(productQuantity.value == "selectQuantity"){
        if(!(U.$(id + 'QuantityError'))){
            addErrorMessage(id + 'Quantity', "Please select a valid Quantity"); 
            isQuantity = false;
        } 
    }  else if(U.$(id + 'QuantityError')){
        removeErrorMessage( id + 'QuantityError');
        isQuantity = true;
    }   else {
        isQuantity = true;
    }

    //adds product to order 
    if(isQuantity && isSize){
        let product = new Product(
            productName.dataset.value, 
            productPrice.dataset.value, 
            productSize.value, 
            productQuantity.value
        );

        order.addProduct(product);

    }
}

function viewOrder(){
    console.log(order);
}

var order = new Order();


// products
U.addEvent(U.$('productOneSubmit'), 'click', () => {validateOrder('productOne')});

U.addEvent(U.$('productTwoSubmit'), 'click', () => {validateOrder('productTwo')});

U.addEvent(U.$('productThreeSubmit'), 'click', () => {validateOrder('productThree')});


U.addEvent(U.$('viewOrder'), 'click', () => {order.displayOrder()});

