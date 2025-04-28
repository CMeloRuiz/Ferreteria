const filterProduct = document.getElementById("filter-product");
const productsContainer = document.getElementById("products-container");


function crearTarjetaDeProductos(list) {
    for (let i = 0; i < list.length; i++) {
        const productItem = document.createElement("div");
        const productImage = document.createElement("div");
        const image = document.createElement("img");
        const title = document.createElement("h3");
        const price = document.createElement("p");
        const button = document.createElement("button");
    
        //agregar clases a algunos elementos creados
        productItem.classList.add("product-item");
        productImage.classList.add("product-image");
        button.classList.add("adding-btn");
    
        // Crear contenedor de imagen
        productImage.appendChild(image);
    
        // Agregar contenido a cada elemento
        image.src = list[i].img;
        title.innerText = list[i].name;
        price.innerText = `$${list[i].price}`;
        button.innerText = "Añadir al carrito";
    
        // Crear contenedor
        productItem.appendChild(productImage);
        productItem.appendChild(title);
        productItem.appendChild(price);
        productItem.appendChild(button);
    
        // Agregar contenedor "productItem" al contenedor principal "productsContainer"
        productsContainer.appendChild(productItem);
    };
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


// Categorias:
// todo
// herramientas
// pinturas
// adhesivos
// electricos
// cerrajeria


crearTarjetaDeProductos(productsList);

filterProduct.addEventListener("change", (e) => {
    productsContainer.innerHTML = "";
    let valorCategoria = e.target.value;
    let categoriaSeleccionada = seleccionarCategoria(productsList, valorCategoria);
    crearTarjetaDeProductos(categoriaSeleccionada);
});
