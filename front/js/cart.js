/*Retrieve product informations from localstorage and product page*/
let addkanap = JSON.parse(localStorage.getItem("product"));

/*insertion of items in the shopping cart and display of information*/
const addcart = async () => {
    if(addkanap) {
        await addkanap;
        console.log(addkanap);
        /*Add product informations to cart items list*/
        document.getElementById("cart__items").innerHTML = addkanap.map((product) =>  `
        <article class="cart__item" data-id="${product._id}" data-color="${product.colorSelection}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
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
        `)
        /*Add the total price in function of number of pieces and unit price*/
        document.getElementById("totalPrice").innerHTML = addkanap.map((product) => `
        ${product.quantitySelection * product.price}
        `)
        /*Add the total of pieces in function of number of piece in cart*/
        document.getElementById("totalQuantity").innerHTML = addkanap.map((product) => `
        ${product.quantitySelection}
        `);
        return;
    }
};
addcart();

