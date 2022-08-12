/*ID of product recovery part 4 & 5*/
const queryId = window.location.search;
const urlParams = new URLSearchParams(queryId);
const getId = queryId.toString().split("?").join("");
console.log(getId);

let dataproduct = [];

/*product insertion according to id */
const productData = async () => {
	await fetch(`http://localhost:3000/api/products/${getId}`)
		.then((result) => result.json())
		.then((data) => {
			productInfo = data;
			console.log(productInfo);
		});
};

/*insertion of product information according to the id */
const addProduct = async () => {
	await productData();
	document.querySelector(".item__img").innerHTML = `
    <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}"/>
    `;
	document.getElementById("title").innerHTML = `
    ${productInfo.name}
    `;
	document.getElementById("price").innerHTML = `
    ${productInfo.price}
    `;
	document.getElementById("description").innerHTML = `
    ${productInfo.description}
    `;

	/*Selection of color in color's field*/

	/*Selection of HTML's id="colors"*/
	let selectColors = document.getElementById("colors");

	/*Read the array for each color and create an option element in HTML*/
	productInfo.colors.forEach((colors) => {
		//console.log(colors);
		let addColors = document.createElement("option");

		/*Insertion of "value" and "HTML text" data in each option tag for each color*/
		addColors.value = `${colors}`;
		addColors.innerHTML = `${colors}`;

		/*Indication that "addColors" is a child of "selectColors"*/
		selectColors.appendChild(addColors);
		//console.log(addColors);
	});
	addToCart(productInfo);
};
addProduct();

/*verification that the color and the quantity is well informed before putting it in the basket*/
const checkProduct = async () => {
	document
		.getElementById("addToCart")
		.addEventListener("click", function (eventColors) {
			var select = document.getElementById("colors");
			var choice = select.selectedIndex;
			var value = select.options[choice].value;
			if (value === "") {
				alert("Veuillez choisir une couleur");
			}
		});
	document
		.getElementById("addToCart")
		.addEventListener("click", function (eventQuantity) {
			var productQuantity = document.getElementById("quantity").value;
			if (productQuantity <= 0 || productQuantity > 100) {
				alert("Veuillez renseigner une quantité valide");
			}
		});
};
checkProduct();

/*Transmission of items to the basket whith button "ajouter au panier"*/
const addToCart = () => {
	/*Add event on button click*/
	document.getElementById("addToCart").addEventListener("click", () => {
		/*Get Array from localstorage*/
		let productArray = JSON.parse(localStorage.getItem("product"));

		/*Get color's / quantity's / Id / product info*/
		let selectColor = document.getElementById("colors");
		let selectQuantity = document.getElementById("quantity");
		let idKanap = productInfo._id;
		console.log(idKanap);
		console.log(selectColor.value);
		console.log(selectQuantity.value);
		console.log(productArray);

		/*Assign info of user selection to a const*/
		const addSelectedInfo = Object.assign({}, productInfo, {
			idProductSelection: `${idKanap}`,
			colorSelection: `${selectColor.value}`,
			quantitySelection: `${selectQuantity.value}`,
		});
		//console.log(addSelectedInfo);

		/*Condition if Array of localstorage is empty, create array and push object as string (whith user selection)*/
		if (productArray == null) {
			productArray = [];
			productArray.push(addSelectedInfo);
			//console.log(productArray);
			localStorage.setItem("product", JSON.stringify(productArray));
		} else if (productArray != null) {
		/*Condition if Array of localstorage have already products, */
			/*Loop for add product even if array have already products*/
			for (let i = 0; i < productArray.length; i++) {
				/*If the product selected is the same that already in the cart*/
				if (
					productArray[i].idProductSelection == idKanap &&
					productArray[i].colorSelection == selectColor.value
				) {
					//console.log("ajout quantité");
					return (
						(productArray[i].quantitySelection =
							parseInt(productArray[i].quantitySelection) +
							parseInt(addSelectedInfo.quantitySelection)),
						localStorage.setItem("product", JSON.stringify(productArray)),
						(productArray = JSON.parse(localStorage.getItem("product")))
						//console.log("test");
					);
				}
			}
			for (let i = 0; i < productArray.length; i++) {
				/*If the product selected is différent that already in the cart != Color Value and == kanap Id*/
				if (
					(productArray[i].idProductSelection == idKanap &&
						productArray[i].colorSelection != selectColor.value) ||
					productArray[i].idProductSelection != idKanap
				) {
					return (
						console.log("nouveau"),
						productArray.push(addSelectedInfo),
						localStorage.setItem("product", JSON.stringify(productArray)),
						(productArray = JSON.parse(localStorage.getItem("product")))
					);
				}
			}
		}
	});
	/*Return in localstorage always the new product selected*/
	return (productArray = JSON.parse(localStorage.getItem("product")));
};
