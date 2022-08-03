let productData = [];

/*Add array and data of API part 2*/
const dataArray = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(result => result.json())
    .then(data => {
        kanapData = data
        console.log(kanapData);
    });
};

/*Add products on home page part 3*/
const addProduct = async () => {
    await dataArray();
    document.getElementById("items").innerHTML = kanapData.map((kanap) => `
    <a href="./product.html?id=42" class="items a">
        <article class="items article">
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}" class="items article img">
              <h3 class="items article h3">${kanap.name}</h3>
              <p class="items article p">${kanap.description}</p>
        </article>
    </a>
    `).join("");
};
addProduct ()