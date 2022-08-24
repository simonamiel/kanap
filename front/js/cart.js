/*Retrieve product informations from localstorage and product page*/
let addkanap = JSON.parse(localStorage.getItem("product"));

/*Retrieve informations from API*/
const productRetrieve = async () => {
	await addkanap;
	addkanap.map((idkanap) => {
		console.log(idkanap._id);

		let urlProduct = `http://localhost:3000/api/products/${idkanap._id}`;
		console.log(urlProduct);
            let addPriceInfo = fetch(urlProduct)
			.then((result) => result.json())
			.then((productPrice) => {
				price = productPrice.price;
				console.log(price);
        idkanap.price = price;
        console.log(addkanap);
        
			});
	});
};
/*insertion of items in the shopping cart and display of information part 7*/
const addcart = async () => {
	if (addkanap) {
    await productRetrieve();
    await addkanap;
		console.log(addkanap);
    console.log(price);
		/*Add product informations to cart items list*/
		document.getElementById("cart__items").innerHTML = addkanap.map(
			(product) => `
        <article class="cart__item" data-id="${product.idProductSelection}" data-color="${product.colorSelection}">
                <div class="cart__item__img">
                  <img src="${product.productUrl}" alt="${product.productAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.productName}</h2>
                    <p>${product.colorSelection}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantitySelection}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
		);
		//moreQuantity();
		//lessQuantity();
		//supprQuantity();
		//modifQty();
	}
};
addcart();

/*Add the total of pieces in function of number of piece in cart part 8*/
console.log(addkanap); //addKanap = Localstorage (see above)

let kanapQuantityTotal = [];

if (addkanap) {
	addkanap.forEach((kanap) => {
		kanapQuantityTotal.push(kanap.quantitySelection);
		console.log(kanapQuantityTotal);
	});
	document.getElementById("totalQuantity").innerHTML = kanapQuantityTotal;
	let totalkanap = (document.getElementById(
		"totalQuantity"
	).textContent = `${eval(kanapQuantityTotal.join("+"))}`);
	console.log(totalkanap);
}
/*Add the total price in function of number of pieces and unit price part 8*/
let kanapPriceTotal = [];

if (addkanap) {
	addkanap.forEach((kanap) => {
		kanapPriceTotal.push(kanap.price * kanap.quantitySelection);
		console.log(kanapPriceTotal);
	});
	document.getElementById("totalPrice").innerHTML = kanapPriceTotal;
	let totalkanapPrice = (document.getElementById(
		"totalPrice"
	).textContent = `${eval(kanapPriceTotal.join("+"))}`);
	console.log(totalkanapPrice);
}

/*=========================================================*/
/*Modification of the more quantities in the basket part 9*/
