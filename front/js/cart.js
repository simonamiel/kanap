/*Retrieve product informations from localstorage and product page*/
let addkanap = JSON.parse(localStorage.getItem("product"));

/*insertion of items in the shopping cart and display of information part 7*/
const addcart = async () => {
	if (addkanap) {
		await addkanap;
		//console.log(addkanap);
		/*Add product informations to cart items list*/
		document.getElementById("cart__items").innerHTML = addkanap.map(
			(product) => `
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
        `
		);

		moreQuantity();
        supprQuantity();
       
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

/*Modification of the more quantities in the basket part 9*/
const moreQuantity = async (addcart) => {
	await addcart;
	console.log("modifQty");
	let modificationMore = document.querySelectorAll(".cart__item");
	console.log(modificationMore);
	modificationMore.forEach((changeQtyMore) => {
		changeQtyMore.addEventListener("change", () => {
			console.log(changeQtyMore);
            console.log(addkanap);
            

			/*comparison of localstorage with the basket whith an eventlistener on change*/
			for (i = 0; i < addkanap.length; i++) {
				if (
					addkanap[i].idProductSelection == changeQtyMore.dataset.id &&
					addkanap[i].colorSelection == changeQtyMore.dataset.color
				)
                {
					return (
                        /*For more quantity in input selection add more product to localstorage*/
						addkanap[i].quantitySelection++,
						console.log(addkanap[i]),
						localStorage.setItem("product", JSON.stringify(addkanap)),
						(document.querySelectorAll(".itemQuantity")[i].textContent =
						addkanap[i].quantitySelection),
                        (addkanap = JSON.parse(localStorage.getItem("product"))),
                        console.log(addkanap),
                        /*Update total of quantity list*/
                        kanapQuantityTotal = [],
                        addkanap.forEach((kanap) => {
                        kanapQuantityTotal.push(kanap.quantitySelection),
                        (document.getElementById("totalQuantity").innerHTML = kanapQuantityTotal),
                        totalkanap = (document.getElementById("totalQuantity").textContent = `${eval(kanapQuantityTotal.join("+"))}`),
	                    console.log(totalkanap)
                        }),
                        /*Update total of price list*/
                        kanapPriceTotal = [],
	                    addkanap.forEach((kanap) => {
		                kanapPriceTotal.push(kanap.price * kanap.quantitySelection),
		                document.getElementById("totalPrice").innerHTML = kanapPriceTotal,
                        totalkanapPrice = (document.getElementById("totalPrice").textContent = `${eval(kanapPriceTotal.join("+"))}`),
                        console.log(totalkanapPrice)
	                    })
                        );
				}
                
            
            }
		})
    })
}
/*Modification of the less quantities in the basket part 9*/
/*const lessQuantity = async (addcart) => {
    await addcart;
	console.log("modifQty");
    let modificationLess = document.querySelectorAll(".cart__item");
	console.log(modificationLess);
	modificationLess.forEach((changeQtyLess) => {
		changeQtyLess.addEventListener("change", () => {
			console.log(changeQtyLess);
            console.log(addkanap);

            let totalProductList = addkanap.length;

            for(i=0; i < totalProductList; i++) {
                console.log(totalProductList);
                if (addkanap[i].quantitySelection == 1 && totalProductList != 1) {
                    return (
                        localStorage.removeItem("product"),
                        (location.href = "cart.html"),
                        console.log("remove")
                    )
                }

            }
        })
    })
}*/
const supprQuantity = async (addcart) => {
    await addcart;
	console.log("supprQty");
    let modificationSuppr = document.querySelectorAll(".cart__items >");
	console.log(modificationSuppr);
	modificationSuppr.forEach((changeQtySuppr) => {
		changeQtySuppr.addEventListener("click", () => {
            for (i = 0; i < addkanap.length; i++) {
				if (
					addkanap[i].idProductSelection == changeQtySuppr.dataset.id &&
					addkanap[i].colorSelection == changeQtySuppr.dataset.color
				) {
                    return (
                        addkanap.splice(i, 1),
                        localStorage.setItem("product", JSON.stringify(addkanap)),
                        location.href = "cart.html",
                        console.log("test")
                    )

                }
        }})
    })
}
