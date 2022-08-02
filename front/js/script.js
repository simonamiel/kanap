let productData = [];

async function productDatabase (){
    let result = await fetch("http://localhost:3000/api/products");
    let data = await result.json();
    console.log(data);
}
productDatabase();
