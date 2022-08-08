/*ID of product recovery part 4 & 5*/
const queryId = window.location.search;
const urlParams = new URLSearchParams (queryId);
const getId = queryId.toString().split("?").join("");
console.log(getId)

let dataproduct = [];

/*product insertion according to id */
const productData = async () => {
    await fetch(`http://localhost:3000/api/products/${getId}`)
    .then(result => result.json())
    .then(data => {
        productInfo = data
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
    console.log(colors);
    let addColors = document.createElement("option");

/*Insertion of "value" and "HTML text" data in each option tag for each color*/
    addColors.value = `${colors}`;
    addColors.innerHTML = `${colors}`;

/*Indication that "addColors" is a child of "selectColors"*/
    selectColors.appendChild(addColors);
    console.log(addColors);

 });
    
};
addProduct();

/*verification that the color and the quantity is well informed before putting it in the basket*/
const checkProduct = async () => {
    document.getElementById("addToCart").addEventListener("click",function(eventColors){
        var select = document.getElementById('colors');
        var choice = select.selectedIndex;
        var value =  select.options[choice].value;
        if(value === ""){
            alert("Veuillez choisir une couleur");
    
        }
    
    });
    document.getElementById("addToCart").addEventListener("click",function(eventQuantity){
        var productQuantity = document.getElementById("quantity").value;
        if(productQuantity <= 0){
            alert("Veuillez renseigner une quantité")
        }
        console.log(productQuantity);   
    });
};
checkProduct();