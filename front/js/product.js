/*ID of product recovery */
const queryId = window.location.search;
const urlParams = new URLSearchParams (queryId);
const getId = queryId.toString().split("?").join("");
console.log(getId);










/*const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const getId = params.toString().split("=").join("");
console.log(params);*/
