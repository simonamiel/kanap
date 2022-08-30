/*Create an empty array to remove product (see below section removeProduct)*/
let sumOfProduct = []
/*Retrieve product informations from localstorage and product page*/
let addkanap = JSON.parse(localStorage.getItem("product"));
/*Retrieve informations from API*/
const productRetrieve = async () => {
	await addkanap;
	addkanap.map((idkanap) => {
		//console.log(idkanap._id);

		let urlProduct = `http://localhost:3000/api/products/${idkanap._id}`;
		//console.log(urlProduct);
		let addPriceInfo = fetch(urlProduct)
			.then((result) => result.json())
			.then((productPrice) => {
				price = productPrice.price;
				//console.log(price);
				idkanap.price = price;
				//console.log(addkanap);
				/*Add product informations to cart items list*/
				document.getElementById("cart__items").innerHTML = addkanap
					.map(
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
					)
					.join("");

				totals();
				modifQty();
        removeProduct();
			});
	});
};
productRetrieve();

/*=========================================================*/
/*Add the total of pieces in function of number of piece in cart part 8*/
const totals = async (productRetrieve) => {
  await productRetrieve;
	//console.log(addkanap); //addKanap = Localstorage (see above)

	let kanapQuantityTotal = [];

	if (addkanap) {
		addkanap.forEach((kanap) => {
			kanapQuantityTotal.push(kanap.quantitySelection);
			//console.log(kanapQuantityTotal);
		});
		document.getElementById("totalQuantity").innerHTML = kanapQuantityTotal;
		let totalkanap = (document.getElementById(
			"totalQuantity"
		).textContent = `${eval(kanapQuantityTotal.join("+"))}`);
		//console.log(totalkanap);
	}
	/*Add the total price in function of number of pieces and unit price part 8*/
	let kanapPriceTotal = [];

	if (addkanap) {
		addkanap.forEach((kanap) => {
			kanapPriceTotal.push(kanap.price * kanap.quantitySelection);
			//console.log(kanapPriceTotal);
		});
		document.getElementById("totalPrice").innerHTML = kanapPriceTotal;
		let totalkanapPrice = (document.getElementById(
			"totalPrice"
		).textContent = `${eval(kanapPriceTotal.join("+"))}`);
		//console.log(totalkanapPrice);
	}
};

/*=========================================================*/
/*Modification of the more or less quantities in the basket part 9*/
const modifQty = async (productRetrieve) => {
	await addkanap;
	await productRetrieve;
	//console.log(addkanap);

	//console.log(addkanap);

	/*Selection of cart item to listen changements*/
	let changeQty = document.querySelectorAll(".cart__item");
	//console.log(changeQty);
	/*For each modification of cart*/
	changeQty.forEach((itemChange) => {
		/*Listen the changement of quantities*/
		itemChange.addEventListener("change", (event) => {
			for (let i = 0; i < addkanap.length; i++) {
				/*Changement if product are the same then we change the quantity on addkanap*/
				if (
					addkanap[i].idProductSelection == itemChange.dataset.id &&
					addkanap[i].colorSelection == itemChange.dataset.color
				) {
					addkanap[i].quantitySelection = `${event.target.value}`;
					/*Reload page for update info total quantity and price*/
					window.location.reload();
					//console.log(addkanap);

					/*Verification that the quantities user selection is OK*/
					if (
						addkanap[i].quantitySelection > 0 &&
						addkanap[i].quantitySelection <= 100
					) {
            /*Remove price of addKanap before send to Localstorage*/
						const priceLess = addkanap.forEach((removePrice) => {
							removePrice.price = addkanap.filter(
								(filterPrice) => typeof filterPrice === `number`
							);
						});
            /*Send addKanap to localstorage*/
						localStorage.setItem("product", JSON.stringify(addkanap));
					} else {
						alert("Veuillez renseigner une quantité correcte (1 à 100)");
					}
				}
			}
		});
	});
};

/*=========================================================*/
/*Remove product in cart whith "supprimer" button part 9*/
const removeProduct = async (productRetrieve) => {
	await addkanap;
  await productRetrieve;
	console.log("remove");

  /*Selection of HTML parts for remove operation*/
	let removeItem = document.querySelectorAll(".cart__item");
	let removeKanap = document.querySelectorAll(".deleteItem");
	console.log(removeItem);
	console.log(removeKanap);
  /*Remove opération in function of click button "supprimer"*/
  removeKanap.forEach((removeSet) => {
    removeSet.addEventListener("click", () => {
    console.log(removeSet.closest('.cart__item'));
    removeData = removeSet.closest('.cart__item');

    let totalAddKanapRemove = addkanap.length;

    if(totalAddKanapRemove == 1) {
      return (localStorage.removeItem("product"),
      console.log("removeAll")),
      alert("Votre panier est vide !"),
      location.href = "index.html"
    }else{
      sumOfProduct = addkanap.filter(element => {
        if(removeData.dataset.id != element._id || removeData.dataset.color != element.colorSelection) {
          return true
        }
      });
      console.log(sumOfProduct);
      localStorage.setItem("product", JSON.stringify(sumOfProduct));
      console.log("remove product selection");
      alert("Produit supprimé"),
      location.href = "cart.html";
    };
      
    });
  });
  return;
};

/*=========================================================*/
/*place the order : form validation and send data part 10*/
/*=========================================================*/

/*Retrieve form elements to control*/
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

/*Variables contains user's value written*/
let valueFirstName, valueLastName, valueAdress, valueCity, valueEmail;

/*===========================================================*/
/*FirstName control form*/
/*===========================================================*/
firstName.addEventListener("input", (val) => {
  valueFirstName;
  /*If de input value is empty*/
  if(val.target.value.length == 0) {
    console.log("vide");
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null;
    console.log(valueFirstName);
  /*Control of number of characters in accordance with Regex below*/
  }else if (val.target.value.length < 3 || val.target.value.length > 25){
    firstNameErrorMsg.innerHTML = "Ce champ doit contenir entre 3 et 25 caratères";
    valueFirstName = null;
    console.log("nb de caractère non conforme");

  }
  /*Regex to control the good user's value and set "success"*/ 
  if (val.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = val.target.value;
    console.log("success");
    console.log(valueFirstName);
  }
  /*Condition for exclude special characters != Regex*/
  if (!val.target.value.match(/^[a-z A-Z]{3,25}$/) && val.target.value.length > 3 && val.target.value.length < 25) {
    firstNameErrorMsg.innerHTML = "Ce champ ne doit pas contenir de caractères spéciaux, de chiffres ou de ponctuations";
    valueFirstName = null;
    console.log("caractères spéciaux");
  }
});
/*===========================================================*/
/*lastName control form*/
/*===========================================================*/
lastName.addEventListener("input", (val) => {
  valueLastName;
  /*If de input value is empty*/
  if(val.target.value.length == 0) {
    console.log("vide");
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null;
    console.log(valueLastName);
  /*Control of number of characters in accordance with Regex below*/
  }else if (val.target.value.length < 3 || val.target.value.length > 25){
    lastNameErrorMsg.innerHTML = "Ce champ doit contenir entre 3 et 25 caratères";
    valueLastName = null;
    console.log("nb de caractère non conforme");

  }
  /*Regex to control the good user's value and set "success"*/ 
  if (val.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = val.target.value;
    console.log("success");
    console.log(valueLastName);
  }
  /*Condition for exclude special characters != Regex*/
  if (!val.target.value.match(/^[a-z A-Z]{3,25}$/) && val.target.value.length > 3 && val.target.value.length < 25) {
    lastNameErrorMsg.innerHTML = "Ce champ ne doit pas contenir de caractères spéciaux, de chiffres ou de ponctuations";
    valueLastName = null;
    console.log("caractères spéciaux");
  }
});
/*===========================================================*/
/*Adress control form*/
/*===========================================================*/
address.addEventListener("input", (val) => {
  valueAdress;
  /*If de input value is empty*/
  if(val.target.value.length == 0) {
    console.log("vide");
    addressErrorMsg.innerHTML = "";
    valueAdress = null;
    console.log(valueAdress);
  /*Control of number of characters in accordance with Regex below*/
  }else if (val.target.value.length < 3 || val.target.value.length > 35){
    addressErrorMsg.innerHTML = "Ce champ doit contenir entre 3 et 35 caratères";
    valueAdress = null;
    console.log("nb de caractère non conforme");

  }
  /*Regex to control the good user's value and set "success"*/ 
  if (val.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    addressErrorMsg.innerHTML = "";
    valueAdress = val.target.value;
    console.log("success");
    console.log(valueAdress);
  }
  /*Condition for exclude special characters != Regex*/
  if (!val.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) && val.target.value.length > 3 && val.target.value.length < 35) {
    addressErrorMsg.innerHTML = "Exemple : 345 rue de la Paix. Ce champ ne doit pas contenir de caractères spéciaux ou de ponctuations";
    valueAdress = null;
    console.log("caractères spéciaux");
  }
});