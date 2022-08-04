/*ID of product recovery */
const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const getId = params.toString().split("=").join("");
console.log(getId);
