// home background
document.addEventListener("DOMContentLoaded", () => {
  const imgList = [
    "happy-oldman",
    "mclaren",
    "military-woman-staring",
    "police-in-street",
    "woman-staring-dark",
    "car-on-fire",
    "apcs",
    "city-at-night",
    "fluid",
    "happy-kid",
    "mountain",
    "notredame",
    "tribal",
    "weird"
  ];
  const randInt = Math.floor(Math.random() * imgList.length);

  const selectedImg = `url('/img/${imgList[randInt]}.jpg')`;
  console.log(selectedImg);

  document.getElementById("page").style.backgroundImage = selectedImg;
});

// Side menu
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Store actions

// Shopping bag modal
var modal = document.getElementById("shoppingModal");
var openModalBtn = document.getElementById("openBagBtn");
var closeModalBtn = document.getElementById("closeBagBtn");

openModalBtn.addEventListener("click", openBagModal);
closeModalBtn.addEventListener("click", closeBagModal);

const currBagQuantity = parseInt(
  document.getElementById("bagQuantity").innerText
);

function openBagModal() {
  modal.classList += " is-active";
}

function closeBagModal() {
  modal.classList.remove("is-active");
}

// Item class
class Item {
  constructor(image, name, qty, price, sku) {
    this.image = image;
    this.name = name;
    this.qty = qty;
    this.price = (price * qty).toFixed(2);
    this.sku = sku;
  }
}

// UI handling
class UI {
  static displayBagItems() {
    const storedBagItems = Store.getBagItems();
    const bagItems = storedBagItems;

    bagItems.forEach(item => UI.addItemToBag(item));
  }

  static addItemToBag(item) {
    const list = document.querySelector(".bagitems");

    const row = document.createElement("tr");

    // template of row
    row.innerHTML = `
      <td>
        <figure class="image is-96x96">
          <img src="${item.image}" alt="" />
        </figure>
      </td>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>$${item.price}</td>
      <td class="is-not-visible">${item.sku}</td>
      <td><a class="delete is-medium"></a></td>`;

    list.appendChild(row);
  }

  static deleteItem(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static updateBagQuantity(qty) {
    const currBagQuantity = parseInt(
      document.getElementById("bagQuantity").innerText
    );

    document.getElementById("bagQuantity").innerHTML = currBagQuantity + qty;
  }

  static updateBagSubtotal(price) {
    const currSubtotal = parseFloat(
      document.getElementById("subtotal").innerText
    );

    document.getElementById("subtotal").innerHTML = (
      currSubtotal + parseFloat(price)
    ).toFixed(2);
  }

  static updateBagData() {
    const bagData = Store.getBagData();
    document.getElementById("bagQuantity").innerHTML = bagData[0];
    document.getElementById("subtotal").innerHTML = bagData[1];
  }

  static updateOnReload() {
    UI.displayBagItems();
    UI.updateBagData();
  }
}

// Handles local storage for the shopping bag
class Store {
  static getBagItems() {
    let bagItems;
    if (localStorage.getItem("bagItems") === null) {
      bagItems = [];
    } else {
      bagItems = JSON.parse(localStorage.getItem("bagItems"));
    }
    return bagItems;
  }

  static getBagData() {
    let bagData;
    if (localStorage.getItem("bagData") === null) {
      bagData = [0, 0.0];
    } else {
      bagData = JSON.parse(localStorage.getItem("bagData"));
    }
    return bagData;
  }

  static addItem(item) {
    const bagItems = Store.getBagItems();
    let bagData = Store.getBagData();

    bagData[0] += item.qty;
    bagData[1] = (parseFloat(bagData[1]) + parseFloat(item.price)).toFixed(2);

    bagItems.push(item);

    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    localStorage.setItem("bagData", JSON.stringify(bagData));
  }

  static removeBagItem(sku) {
    const bagItems = Store.getBagItems();
    const bagData = Store.getBagData();

    bagItems.forEach((item, index) => {
      if (item.sku === sku) {
        bagData[0] -= item.qty;
        bagData[1] = (parseFloat(bagData[1]) - parseFloat(item.price)).toFixed(
          2
        );
        bagItems.splice(index, 1);
      }
    });

    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    localStorage.setItem("bagData", JSON.stringify(bagData));
  }
}

// Update quantity
function getItemQuantity(i) {
  const itemQuantitySelector = document.getElementById(`${i}Quantity`);
  const itemQuantity = parseInt(
    itemQuantitySelector.options[itemQuantitySelector.selectedIndex].value
  );
  return itemQuantity;
}

// Events
document.addEventListener("DOMContentLoaded", UI.updateOnReload);

function addToBag(i) {
  let image, name, qty, price;

  switch (i) {
    case "wts":
      image = "img/tshirt-color.png";
      name = "White T-Shirt";
      qty = getItemQuantity(i);
      price = 35.99;
      sku = "wts";
      break;
    case "bts":
      image = "img/tshirt-black.png";
      name = "Black T-Shirt";
      qty = getItemQuantity(i);
      price = 39.99;
      sku = "bts";
      break;
    case "bhd":
      image = "img/hoodie-black.png";
      name = "Black Hoodie";
      qty = getItemQuantity(i);
      price = 101.99;
      sku = "bhd";
      break;
    case "bil":
      image = "img/billboard.jpg";
      name = "Billboard";
      qty = getItemQuantity(i);
      price = 349.99;
      sku = "bil";
      break;
    case "bcd":
      image = "img/business-card.jpg";
      name = "25 Business Cards";
      qty = getItemQuantity(i);
      price = 31.99;
      sku = "bcd";
      break;
  }

  const item = new Item(image, name, qty, price, sku);

  UI.addItemToBag(item);
  Store.addItem(item);
  UI.updateBagData();
}

document.querySelector(".bagitems").addEventListener("click", e => {
  UI.deleteItem(e.target);
  Store.removeBagItem(
    e.target.parentElement.previousElementSibling.textContent
  );

  UI.updateBagData();
});

// Checkout init
function checkoutInit() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.classList += " is-loading";

  function showError() {
    const notifDiv = document.getElementById("notif");
    notifDiv.className = "notification is-danger";
    notifDiv.innerText =
      "Shoot! An error has occurred. Please reload the page and try again.";

    checkoutBtn.classList.remove("is-loading");
  }

  setTimeout(showError, 10000);
}

// Tribute actions

function tributePaymentOption(opt) {
  const opts = document.querySelectorAll("#payopts");
  console.log(opts);
  const selectedOption = document.querySelector(`.${opt}`);

  opts.forEach(option => {
    if (!option.classList.contains("is-info")) {
      selectedOption.classList += " is-info";
    } else {
      option.classList.remove("is-info");
      selectedOption.classList += " is-info";
    }
  });
}

function tributeInit() {
  const continueBtn = document.getElementById("tributeBtn");
  continueBtn.classList += " is-loading";

  function showError() {
    const notifDiv = document.getElementById("notif-trib");
    notifDiv.className = "notification is-danger";
    notifDiv.innerText =
      "Shoot! An error has occurred. Please reload the page and try again.";

    continueBtn.classList.remove("is-loading");
  }

  setTimeout(showError, 8000);
}
