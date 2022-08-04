let itemsData = [];

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
const addProducts = async () => {
    await dataArray();
    document.getElementById("items").innerHTML = kanapData.map((kanap) => `
    <a href="./product.html?${kanap._id}" class="items a">
            <article class="items article">
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
          </a>
    `).join("");
};
addProducts ()