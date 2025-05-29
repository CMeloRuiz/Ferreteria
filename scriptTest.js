const itemsPerPage = 12;
let currentPage = 1;
let filteredProducts = [];

const productGrid = document.getElementById('productGrid');
const pagination = document.getElementById('pagination');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('search');
const message = document.getElementById("no-results-message");


function displayProducts(page) {
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  filteredProducts = productosUnificados.filter(product => {
    const matchesCategory = category === 'all' || product.cat === category;
    const matchesSearch = product.clave.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productsToShow = filteredProducts.slice(start, end);

  renderProducts(productsToShow);
  renderPagination(filteredProducts.length, page);
  currentPage = page;
}


function renderProducts(productsToShow) {
  productGrid.innerHTML = '';

  // Mostrar mensaje si no hay productos
  if (productsToShow.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }

  productsToShow.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const variantesHTML = Array.isArray(producto.variantes)
			? producto.variantes.map(nombre => `<li>${nombre}</li>`).join("")
			: "<li>Sin variantes</li>";

    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.clave}">
      <h3>${producto.clave}</h3>

      <div class="dropdown-container">
        <button class="dropdown-toggle">Ver Referencias ▼</button>
        <ul class="dropdown-menu">
          ${variantesHTML}
        </ul>
      </div>

      <button class="cotizar-btn">
        <i class="fa-brands fa-whatsapp"></i>
        COTIZAR
      </button>
    `;

    productGrid.appendChild(card);

    const toggleBtn = card.querySelector(".dropdown-toggle");
    const dropdownMenu = card.querySelector(".dropdown-menu");

    toggleBtn.addEventListener("click", () => {
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    let arrayDropdownMenu = Array.from(dropdownMenu.children);
    arrayDropdownMenu.forEach(menuBtn => {
      menuBtn.addEventListener("click", () => {
        const productTitle = card.querySelector("h3");
        productTitle.textContent = menuBtn.textContent;

        // Ocultar el menú desplegable
        dropdownMenu.style.display = "none";
      });
    });
  });

  // Escuchar clics globalmente para cerrar los dropdowns
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      // Si el clic NO fue dentro del dropdown ni en el botón, lo oculta
      if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
        menu.style.display = "none";
      }
    });
  });
}


function renderPagination(totalItems, currentPage) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) {
        btn.disabled = true;
        btn.classList.add('active');
    };
    btn.addEventListener('click', () => displayProducts(i));
    pagination.appendChild(btn);
  }
}


function populateCategories() {
  const categories = Array.from(new Set(productsList.map(p => p.cat)));
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}


// Asegúrate de tener una función que filtre los productos:
function filterAndRenderProductsBySearch(searchText) {
  const filtered = productsList.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
  filteredProducts = filtered;
  currentPage = 1;
  displayProducts(1);
  renderPagination(Math.ceil(filteredProducts.length / itemsPerPage), 1);
}


categoryFilter.addEventListener('change', () => displayProducts(1));

// Initialize
populateCategories();
displayProducts(1);

// Boton de busqueda
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    displayProducts(1);
    }
});

searchButton.addEventListener('click', function () {
    displayProducts(1);
});

// Leer el parámetro de búsqueda desde la URL
if (searchParam) {
  document.getElementById('searchInput').value = searchParam;
  filterAndRenderProductsBySearch(searchParam);
}

