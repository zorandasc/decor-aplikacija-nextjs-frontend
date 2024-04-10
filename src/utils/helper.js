//for string representation
export function formatNumber(num) {
  var numSplit, int;
  //var dec;

  num = Math.abs(num);

  num = num.toFixed(2);

  numSplit = num.split(".");

  int = numSplit[0];

  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
  }

  //dec = numSplit[1];
  //return int + "." + dec;
  return int;
}

export function calculatePrice(items) {
  let totalPrice = 0;
  items.map((product) => {
    totalPrice += product.price * product.quantity;
    return totalPrice;
  });
  //return formatNumber(totalPrice);
  return totalPrice;
}

export function calculateTotalPrice(orders) {
  let totPrice = 0;
  let totAvans = 0;
  let totForPayment = 0;
  orders.map((order) => {
    totPrice += order.totalPrice;
    totAvans += order.avans;
    return null;
  });
  totForPayment = totPrice - totAvans;

  return { totPrice, totAvans, totForPayment };
}

// padTo2Digits function, which takes
//care of adding a leading zero if the month or day
//only contain a single digit (are less than 10).

//We want to make sure that the result is always
//consistent and has 2 digits for the months and days,
//so we used the padStart method.

//padStart: const str1 = '5';
//console.log(str1.padStart(2, "0"));
// expected output: "05"
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

//Date.getMonth - returns an integer between 0 (January)
//and 11 (December) and represents the month for a given date.
//Yes, unfortunately the getMonth method is off by 1.
export function formatDate(responseDate) {
  //convert date string to Date object
  const date = new Date(responseDate);
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export function compareDates(d1, d2) {
  var parts = d1.split("/");
  var d1parts = Number(parts[2] + parts[1] + parts[0]);
  parts = d2.split("/");
  var d2parts = Number(parts[2] + parts[1] + parts[0]);
  return d1parts >= d2parts;
}

/*
  //za racunjanje id svakog rowa
  const calculateLocalId = (i) => {
    return i + currentPage * pageSize + 1 - pageSize;
  };
*/
