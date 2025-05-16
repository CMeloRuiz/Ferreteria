const productsContainer = document.getElementById("products-container");
const filterProduct = document.getElementById("filter-product");
const pagination = document.querySelector(".pagination");
const paginationBtns = pagination.childNodes;
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


function crearBotonesPaginacion(list) {
	pagination.innerHTML = "";
	let totalItems = list.length;
	let numberOfBtns = Math.ceil(totalItems / 12) + 2; 
	for (let i = 0; i < numberOfBtns; i++) {
		let htmlContent = i;
		if (i === 0 || i === numberOfBtns - 1) {
			htmlContent = i === 0 ? "<" : ">";
		};
		const paginationBtn = document.createElement("a");
		paginationBtn.setAttribute('href', '#');
		paginationBtn.innerHTML = htmlContent;
		pagination.appendChild(paginationBtn);
	};
}


function paginacion(list, event=1) {
	lastEvent = event;
	let lastBtn = paginationBtns.length - 1;
	paginationBtns.forEach(paginationButton => {
		paginationButton.classList.remove("active");
		paginationButton.setAttribute("href", "#")
	});
	if (event < 1 || event >= lastBtn) {
		lastEvent = event < 1 ? 1 : lastBtn - 1;
		paginationBtns[event].setAttribute("href", "javascript:void(0)")
	};
	productsContainer.innerHTML = "";
	paginationBtns[lastEvent].classList.add("active");
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


function listenerPaginationButtons() {
	paginationBtns.forEach(pagBtn => {
		pagBtn.addEventListener("click", e => {
			let evento = e.target.textContent;
			if (evento === ">" || evento === "<") {
				evento === ">" ? lastEvent++ : lastEvent--; 
			} else {
				lastEvent = evento;
			};
			crearTarjetaProductos(paginacion(seleccionarCategoria(productsList, categoria), lastEvent));
		});
	});
}


crearBotonesPaginacion(productsList);
crearTarjetaProductos(paginacion(productsList));

filterProduct.addEventListener("change", (e) => {
	categoria = e.target.value;
	let categoriaSeleccionada = seleccionarCategoria(productsList, categoria);
	crearBotonesPaginacion(categoriaSeleccionada);
	crearTarjetaProductos(paginacion(categoriaSeleccionada));
	listenerPaginationButtons();
});

listenerPaginationButtons()