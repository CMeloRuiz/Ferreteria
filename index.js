const productsContainer = document.getElementById("products-container");
const filterProduct = document.getElementById("filter-product");
const paginationButtons = document.querySelectorAll(".pagination a");
let categoria = "todo";
let lastEvent = 1;


function crearTarjetaProductos (products) {
	products.forEach(product => {
		const newProduct = document.createElement("div");
		newProduct.classList = "product-item";
		newProduct.innerHTML = `
			<img src="${product.img}">
			<h3>${product.name}</h3>
			<a href="#" class="product-btn">
				<i class="fa-brands fa-whatsapp"></i>
				<p>COTIZAR</p>
			</a>
		`
		productsContainer.appendChild(newProduct);
	});
}


function paginacion(list, event=1) {
	lastEvent = event;
	let lastBtn = paginationButtons.length - 1;
	paginationButtons.forEach(paginationButton => {
		paginationButton.classList.remove("active");
	});
	if (event < 1 || event >= lastBtn) {
		lastEvent = event < 1 ? 1 : lastBtn - 1;
	};
	productsContainer.innerHTML = "";
	paginationButtons[lastEvent].classList.add("active");
	return list.slice((12 * (lastEvent - 1)), (12 * lastEvent));
}


function seleccionarCategoria(list, categoria) {
	if (categoria !== "todo") {
			const newList = [];
			for (let i = 0; i < list.length; i++) {
					if (list[i].cat === categoria) {
							newList.push(list[i]);
					};
			};
			return newList;
	};
	return list;
}


crearTarjetaProductos(paginacion(productsList));

// Seleccionar categoria

filterProduct.addEventListener("change", (e) => {
	categoria = e.target.value;
	let categoriaSeleccionada = seleccionarCategoria(productsList, categoria);
	crearTarjetaProductos(paginacion(categoriaSeleccionada));
});

// Paginacion

paginationButtons.forEach(paginationButton => {
	paginationButton.addEventListener("click", e => {
		let evento = e.target.text;
		if (evento === ">" || evento === "<") {
			evento === ">" ? lastEvent++ : lastEvent--; 
		} else {
			lastEvent = evento;
		};
		crearTarjetaProductos(paginacion(seleccionarCategoria(productsList, categoria), lastEvent));
	});
});
