/*===========================================================*/
/*ID of order recovery part 11*/
/*===========================================================*/
const queryOrderId = window.location.search;
const urlParams = new URLSearchParams(queryOrderId);
const getOrderId = queryOrderId.toString().split("?orderId=").join("");
//console.log(getOrderId);

/*Add ID of order in confirmation page for the user*/
const confirmationID = async () => {
    await getOrderId;
    document.getElementById("orderId").innerHTML = getOrderId;
    localStorage.clear();
}
confirmationID();