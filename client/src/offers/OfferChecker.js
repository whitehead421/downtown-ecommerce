// check the offer for item and return the offer if it is valid

// 3 TSHIRTS FOR £55
const offer1 = (item) => {
  return (
    (item.CATEGORY.includes("BOY T-SHIRT") ||
      item.CATEGORY.includes("GIRL T-SHIRT") ||
      item.CATEGORY.includes("BABY T-SHIRT")) &&
    item.SFIYAT === 20
  );
};
// 2 SWIMMING SHORTS FOR £45
const offer2 = (item) => {
  return item.CATEGORY.includes("BOY SWIMMING SHORT") && item.SFIYAT === 25;
};

// 2 FOOTBALL KIT FOR £35
const offer3 = (item) => {
  return item.CATEGORY.includes("FOOTBALL KİTS") && item.SFIYAT === 20;
};

const offerList = [offer1, offer2, offer3];

export function checkOfferForItem(item) {
  var availableOffers = [];
  for (let i = 0; i < offerList.length; i++) {
    if (offerList[i](item)) {
      availableOffers.push(offerList[i].name);
    } else {
      continue;
    }
  }
  return availableOffers;
}

function getOffersList(cartProducts) {
  const offerNames = {
    offer1: "3TFOR55",
    offer2: "2SFOR45",
    offer3: "2FFOR35",
  };
  var offers = {};
  for (let i = 0; i < cartProducts.length; i++) {
    checkOfferForItem(cartProducts[i]).forEach((offer) => {
      offers[offerNames[offer]] = offers[offerNames[offer]]
        ? offers[offerNames[offer]] + cartProducts[i].quantity
        : 1;
    });
  }
  return offers;
}

export function calculateDiscount(cartProducts) {
  var discount = 0;
  var offers = getOffersList(cartProducts);
  Object.keys(offers).forEach((offer) => {
    switch (offer) {
      case "3TFOR55":
        discount += Math.floor(offers[offer] / 3) * 5;
        break;
      case "2SFOR45":
        discount += Math.floor(offers[offer] / 2) * 5;
        break;
      case "2FFOR35":
        discount += Math.floor(offers[offer] / 2) * 5;
        break;
      default:
        break;
    }
  });
  return { discount, offers };
}
