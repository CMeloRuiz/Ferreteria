const productsList = [
    {
        cat: "herramientas",
        img: "./Images/Products/alicates-rbg.png",
        name: "Alicates",
        price: 50000,
    },
    {
        cat: "pinturas",
        img: "./Images/Products/brocha-rbg.png",
        name: "Brocha",
        price: 30000,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/cinta_aislante-rbg.png",
        name: "Cinta Aislante",
        price: 15000,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/cinta_enmascarar-rbg.png",
        name: "Cinta de Enmascarar",
        price: 16000,
    },
    {
        cat: "herramientas",
        img: "./Images/Products/destornillador-rbg.png",
        name: "Destornillador",
        price: 35000,
    },
    {
        cat: "electricos",
        img: "./Images/Products/interruptor-rbg.png",
        name: "Interruptor",
        price: 20000,
    },
    {
        cat: "herramientas",
        img: "./Images/Products/pulidora-rbg.png",
        name: "Pulidora",
        price: 500000,
    },
    {
        cat: "herramientas",
        img: "./Images/Products/taladro-rbg.png",
        name: "Taladro",
        price: 200000,
    },
    {
        cat: "electricos",
        img: "./Images/Products/ducha-rbg.png",
        name: "Ducha",
        price: 70000,
    },
    {
        cat: "electricos",
        img: "./Images/Products/clavija-rbg.png",
        name: "Clavija Trifilar",
        price: 8000,
    },
    {
        cat: "electricos",
        img: "./Images/Products/benjamin-rbg.png",
        name: "Conector Benjamin",
        price: 5000,
    },
    {
        cat: "electricos",
        img: "./Images/Products/bombillo-rbg.png",
        name: "Bombillo Ahorrador LED",
        price: 17500,
    },
    {
        cat: "pinturas",
        img: "./Images/Products/rodillo-rbg.png",
        name: "Rodillo",
        price: 27000,
    },
    {
        cat: "pinturas",
        img: "./Images/Products/galon-pintura-rbg.png",
        name: "Galon Pintura",
        price: 120000,
    },
    {
        cat: "pinturas",
        img: "./Images/Products/estuco-rbg.png",
        name: "Estuco",
        price: 72000,
    },
    {
        cat: "pinturas",
        img: "./Images/Products/resane-rbg.png",
        name: "Resane",
        price: 63000,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/boxer-rbg.png",
        name: "Boxer Pegamento",
        price: 7300,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/silicona_rbg.png",
        name: "Silicona",
        price: 12000,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/pegamento_madera-rbg.png",
        name: "Pegamento Madera",
        price: 21000,
    },
    {
        cat: "adhesivos",
        img: "./Images/Products/super_bonder-rbg.png",
        name: "Super Bonder",
        price: 5200,
    },

    {
        cat: "cerrajeria",
        img: "./Images/Products/candado-rbg.png",
        name: "Candado",
        price: 12500,
    },
    {
        cat: "cerrajeria",
        img: "./Images/Products/cerradura_alcoba-rbg.png",
        name: "Cerradura Alcoba",
        price: 42000,
    },
    {
        cat: "cerrajeria",
        img: "./Images/Products/caja_fuerte-rbg.png",
        name: "Caja Fuerte",
        price: 500000,
    },
    {
        cat: "cerrajeria",
        img: "./Images/Products/cerradura_sobreponer-rbg.png",
        name: "Cerradura Sobreponer",
        price: 123500,
    },
    {
        cat: "cerrajeria",
        img: "./Images/Products/resorte_puerta-rbg.png",
        name: "Resorte Puerta",
        price: 8300,
    },
    {
        cat: "cerrajeria",
        img: "./Images/Products/bisagra-rbg.png",
        name: "Bisagra",
        price: 3100,
    },
];


// Ordenar la lista alfabeticamente

productsList.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
        return -1;
    };

    if (nameA > nameB) {
        return 1;
    };

    return 0;
});
