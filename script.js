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


function displayProducts(page) {
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  filteredProducts = productsList.filter(product => {
    const matchesCategory = category === 'all' || product.cat === category;
    const matchesSearch = product.name.toLowerCase().includes(query);
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
  productsToShow.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <button>
        <i class="fa-brands fa-whatsapp"></i>
        COTIZAR
      </button>
    `;
    productGrid.appendChild(card);
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

