class Product{
    constructor(name, price, img){
        this.price = price;
        this.name = name;
        this.img = img;
    }
}

var originalBlend = new Product ('Originial Blend', 10, "img/productOne.png");
var lightBlend = new Product ('Light Blend', 7,"img/productTwo.png");
var darkBlend = new Product('Dark Blend' , 15,"img/productThree.png");

class Order{
    constructor(product, size, quantity){
        this.date = new Date().toJSON().slice(0, 10);
        this.product = product;
        this.size = size;
        this.quantity = quantity;
    }
}

class Cart{
    static addOrder(order){
       let tempCart = [];
       let currentCart = JSON.parse(localStorage.getItem('cart'));
       if(currentCart){tempCart = currentCart}

       tempCart.push(order);
       localStorage.setItem('cart', JSON.stringify(tempCart));
    }

    static displayOrder(order, id){
        let destination = U.$(id);

        // While the div has at least one child
        while (destination.firstChild) {
          // Remove the first child
          destination.removeChild(destination.firstChild);
        }

        let div = document.createElement("div");
        let img = document.createElement('img');
        img.src = order.product.img;
        div.appendChild(img);
        div.innerHTML += order.quantity + ' ' + order.size + ' bags of ' +order.product.name + ' have been added to your shopping cart!';
        destination.appendChild(div);
    }

    static displayCart(){
        console.log(JSON.parse(localStorage.getItem('cart')));
    }
}

function validateOrder(id){
    let size = U.$(id + 'Size');
    let quantity = U.$(id + 'Quantity');
    let product;
    let isSize = false;
    let isQuantity = false;

    switch(id){
        case 'productOne':
            product = originalBlend;
            break;
        case 'productTwo':
            product = lightBlend;
            break;
        case 'productThree':
            product = darkBlend;
            break;
    }
    
    //validates that a size has been selected
    if(size.value == "selectSize"){
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
    if(quantity.value == "selectQuantity"){
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
        let order = new Order(product, size.value, quantity.value);
        Cart.addOrder(order);
        Cart.displayOrder(order, 'cartDisplay');
    }
}

// products
U.addEvent(U.$('productOneSubmit'), 'click', () => {validateOrder('productOne')});

U.addEvent(U.$('productTwoSubmit'), 'click', () => {validateOrder('productTwo')});

U.addEvent(U.$('productThreeSubmit'), 'click', () => {validateOrder('productThree')});


U.addEvent(U.$('viewOrder'), 'click', Cart.displayCart);

