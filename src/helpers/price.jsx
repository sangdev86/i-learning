export const price = (luotXem) => {
  var pay = 0;
  if (luotXem >= "5000") {
    pay = 12.99;
    return pay;
  } else if (luotXem >= "4500") {
    pay = 11.99;
    return pay;
  } else if (luotXem >= "3000") {
    pay = 10.99;
    return pay;
  } else if (luotXem >= "2000") {
    pay = 9.99;
    return pay;
  } else if (luotXem >= "100") {
    pay = 8.99;
    return pay;
  } else {
    return pay;
  }
};
