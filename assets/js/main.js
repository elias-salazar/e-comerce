data = [
  {
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "assets/images/featured1.png",
    category: "hoodies",
    quantity: 10,
  },
  {
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "assets/images/featured2.png",
    category: "shirts",
    quantity: 15,
  },
  {
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "assets/images/featured3.png",
    category: "sweatshirts",
    quantity: 20,
  },
  {
    id: 4,
    name: "sweatshirt",
    price: 14.0,
    image: "assets/images/home.png",
    category: "sweatshirts",
    quantity: 5,
  },
];

const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footers");
const counter = document.getElementById("cart-counter");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};
let mostrar = [];

/**/
document.addEventListener("DOMContentLoaded", () => {
  load();
  pintarCards(data);
  bg();
});

/**/
cards.addEventListener("click", (e) => {
  addCarrito(e);
});
items.addEventListener("click", (e) => {
  btnAccion(e);
});

/*load */
const loader = document.getElementById("loader");
function load() {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 3000);
}

/* dark mode */
const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", (e) => {
  document.body.classList.toggle("dark-theme");
  if (themeButton.classList.contains("bx-moon")) {
    themeButton.classList.replace("bx-moon", "bx-sun");
  } else {
    themeButton.classList.replace("bx-sun", "bx-moon");
  }
});
/* mostrar menu*/
const navOpen = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav--close");
const menuContainer = document.getElementById("nav--menu");
navOpen.addEventListener("click", () => {
  menuContainer.classList.remove("hide");
});
navClose.addEventListener("click", () => {
  menuContainer.classList.add("hide");
});

/* scroll */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

/* MOSTRAR PRODUCTOS */
const pintarCards = (datos) => {
  datos.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.name;
    templateCard.querySelector("p").textContent = producto.price;
    templateCard.querySelector("img").setAttribute("src", producto.image);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

/* MOSTRAR FILTRO */
const btnMostrarTodo = document.querySelector(".btn-showAll");
btnMostrarTodo.addEventListener("click", () => {
  cards.innerHTML = "";
  pintarCards(data);
});
const btnHooddies = document.querySelector(".btn-hoddies");
btnHooddies.addEventListener("click", () => {
  const hoodies = data.filter((producto) => producto.name === "Hoodies");
  cards.innerHTML = "";
  pintarCards(hoodies);
});
const btnShirts = document.querySelector(".btn-shirts");
btnShirts.addEventListener("click", () => {
  const shirts = data.filter((producto) => producto.name === "Shirts");
  cards.innerHTML = "";
  pintarCards(shirts);
});

const btnSweatshirt = document.querySelector(".btn-sweatshirt");
btnSweatshirt.addEventListener("click", () => {
  const sweatshirt = data.filter((producto) => producto.name === "Sweatshirts");
  cards.innerHTML = "";
  pintarCards(sweatshirt);
});

/* carrito */
const cartOpen = document.getElementById("cart--shop");
const cartClose = document.getElementById("close--cart");
const cartContainer = document.getElementById("cart--container");
cartOpen.addEventListener("click", () => {
  cartContainer.classList.remove("hide");
});
cartClose.addEventListener("click", () => {
  cartContainer.classList.add("hide");
});

/* AGREGAR AL CARRITO */
const imgPrincipal = document.querySelector(".addToCart");
imgPrincipal.addEventListener("click", () => {
  const imgp = data.find((articulo) => articulo.id == 4);
  const producto = {
    id: imgp.id,
    image: imgp.image,
    name: imgp.name,
    price: imgp.price,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  pintarCarrito();
});

const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    image: objeto.querySelector("img").getAttribute("src"),
    name: objeto.querySelector("h5").textContent,
    price: objeto.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  pintarCarrito();
};

/* MOSTRAR CARRITO */
const pintarCarrito = () => {
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("img").setAttribute("src", producto.image);
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.price * producto.cantidad;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  pintarFooter();
  bg();
};

const pintarFooter = () => {
  footer.innerHTML = "";

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, price }) => acc + cantidad * price,
    0
  );
  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;
  counter.textContent = nCantidad;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);
  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    alert("gracias por su compra");
  });
};
const bg = () => {
  if (Object.keys(carrito).length == 0) {
    cartContainer.classList.add("bg-image");
    return;
  } else {
    cartContainer.classList.remove("bg-image");
  }
};

const btnAccion = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};
