export const rating = (luotXem) => {
  var rating = 4.4;
  if (luotXem >= "5000") {
    rating = 4.9;
    return rating;
  } else if (luotXem >= "4500") {
    rating = 4.8;
    return rating;
  } else if (luotXem >= "3000") {
    rating = 4.7;
    return rating;
  } else if (luotXem >= "2000") {
    rating = 4.6;
    return rating;
  } else if (luotXem >= "100") {
    rating = 4.5;
    return rating;
  } else {
    return rating;
  }
};
