function toggleCarrito() {
    document.querySelector(".asideWrapper").classList.toggle("active");
    document.querySelector("#btnCarrito").classList.toggle("inactive");
    document.querySelector("main").classList.toggle("pointer__events");
    document.querySelector("header").classList.toggle("pointer__events");
}

// VARIABLES



const catalog = document.querySelector("#catalog")

const cartItems = [];

const articulosCarrito = document.querySelector("#articulosCarrito")

const containerBuyCart = document.querySelector("#asideTop")

const subtotal = document.querySelector("#subtotal");

const impuestos = document.querySelector("#impuestos");

const total = document.querySelector("#total");

const itemsTienda = [];




let valorSubtotal = 0;
let valorImpuestos = 0;
let valorTotal = 0;

// FUNCIONES










fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        for (i of data) {
            itemsTienda.push(i)
        }
    })
    .then(renderItems)



function renderItems() {

    for (let i of itemsTienda) {

        const divI = document.createElement("div");
        divI.classList.add("item__div");
        catalog.append(divI);

        const imgn = document.createElement("img");
        imgn.src = `${i.imagen}`;

        const divP = document.createElement("div");
        divP.classList.add("item__picture");
        divP.append(imgn);

        const spanN = document.createElement("span");
        spanN.innerText = `${i.nombre}`;
        const spanP = document.createElement("span");
        spanP.classList.add("precio");
        spanP.innerText = `$${i.precio}`;

        const divD = document.createElement("div");
        divD.classList.add("item__description");
        divD.append(spanN, spanP);

        const btna = document.createElement("a");
        btna.classList.add("btnCompra");
        btna.innerText = "AGREGAR CARRITO";
        btna.setAttribute("id", `${i.id}`);
        btna.setAttribute("onclick", `agregarCarrito(${i.id})`);

        divI.append(divP, divD, btna);

    }

}




function agregarCarrito(id) {
    for (let i of itemsTienda) {
        if (id === i.id) {
            if (cartItems.includes(i)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${i.nombre} YA ESTA EN EL CARRITO`,
                    footer: 'Agrega más desde el carrito!'
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${i.nombre} AGREGADO`,
                    showConfirmButton: false,
                    timer: 2000
                })
                valorSubtotal += i.precio;
                subtotal.innerText = `Subtotal: $${valorSubtotal.toFixed(2)} `;
                valorImpuestos = Number(valorSubtotal * 0.22).toFixed(2);
                impuestos.innerText = `Impuestos: $${valorImpuestos}`;
                valorTotal = (Number(valorImpuestos) + Number(valorSubtotal)).toFixed(2);
                total.innerText = `Total: $${valorTotal}`;
                cartItems.push(i);
                renderCart(i);
                break;

            }
        }
    }
}




function valoresRender() {
    subtotal.innerText = `Subtotal: $${valorSubtotal.toFixed(2)} `;
    valorImpuestos = Number(valorSubtotal * 0.22).toFixed(2);
    impuestos.innerText = `Impuestos: $${valorImpuestos}`;
    valorTotal = (Number(valorImpuestos) + Number(valorSubtotal)).toFixed(2);
    total.innerText = `Total: $${valorTotal}`;
}



function renderCart(i) {



    const divItemCarrito = document.createElement("div");
    divItemCarrito.classList.add("displayItemCarrito");
    divItemCarrito.setAttribute("id", `i${i.id}`);

    const divImagenCarrito = document.createElement("div");
    divImagenCarrito.classList.add("imagen__carrito");
    const imagenCarrito = document.createElement("img");
    divImagenCarrito.append(imagenCarrito);
    imagenCarrito.src = `${i.imagen}`;

    const divItemCarritoNombre = document.createElement("div");
    divItemCarritoNombre.classList.add("nombre__carrito");
    const itemCarritoNombre = document.createElement("p");
    itemCarritoNombre.innerText = `${i.nombre}`;
    divItemCarritoNombre.append(itemCarritoNombre);

    const divCantidadCarrito = document.createElement("div");
    const cantidadItemCarrito = document.createElement("p");
    cantidadItemCarrito.classList.add("cantidadItemCarrito");
    cantidadItemCarrito.setAttribute("id", `c${i.id}`);
    cantidadItemCarrito.innerText = 1;
    divCantidadCarrito.append(cantidadItemCarrito);


    const agregarQuitarBtns = document.createElement("div");
    agregarQuitarBtns.classList.add("agregarQuitarBtns");

    const agregarBtn = document.createElement("a");
    agregarBtn.classList.add("agregarBtn");
    agregarBtn.setAttribute("href", `#`);
    agregarBtn.addEventListener("click", (e) => {
        const parent = e.currentTarget.parentElement;
        const parentSibling = parent.previousSibling;
        const valorP = parentSibling.firstChild;
        valorP.innerText = Number(valorP.innerText) + 1;
        console.log(i.precio);
        valorSubtotal += Number(i.precio);
        valorImpuestos = Number(valorSubtotal * 0.22).toFixed(2);
        valorTotal = (Number(valorImpuestos) + Number(valorSubtotal)).toFixed(2);
        valoresRender();
        console.log(valorP);
    })
    const iconAgregarBtn = document.createElement("img");
    iconAgregarBtn.setAttribute("src", "./icons/plus.png");
    agregarBtn.append(iconAgregarBtn);

    const quitarBtn = document.createElement("a");
    quitarBtn.classList.add("quitarBtn");
    quitarBtn.setAttribute("href", "#");
    quitarBtn.addEventListener("click", (e) => {
        const parent = e.currentTarget.parentElement;
        const parentSibling = parent.previousSibling;
        const valorP = parentSibling.firstChild;
        if (Number(valorP.innerText) == 1) {
            valorP.innerText = Number(valorP.innerText) + 0;
            console.log(valorP);
        } else {
            valorP.innerText = Number(valorP.innerText) - 1;
            let valorS = Number(i.precio);
            console.log(valorS);
            valorSubtotal -= Number(valorS);
            valorImpuestos = Number(valorSubtotal * 0.22).toFixed(2);
            valorTotal = (Number(valorImpuestos) + Number(valorSubtotal)).toFixed(2);
            valoresRender();
            console.log(valorP);
        }
    })
    const iconQuitarBtn = document.createElement("img");
    iconQuitarBtn.setAttribute("src", "./icons/minus.png");
    quitarBtn.append(iconQuitarBtn);

    agregarQuitarBtns.append(agregarBtn, quitarBtn);


    const divRemove = document.createElement("div");
    const removeBtn = document.createElement("a");
    removeBtn.setAttribute("href", "#");
    removeBtn.setAttribute("id", `${i.id}`);
    removeBtn.setAttribute("onclick", `quitarCarrito(${i.id})`);
    const removeBtnImg = document.createElement("img");
    removeBtnImg.src = "./icons/remove.png";
    removeBtn.append(removeBtnImg);
    divRemove.append(removeBtn);


    divItemCarrito.append(divImagenCarrito, divItemCarritoNombre, divCantidadCarrito, agregarQuitarBtns, divRemove);

    articulosCarrito.append(divItemCarrito);


}



function quitarCarrito(id) {
    for (let i of cartItems) {
        if (id === i.id) {
            const ind = cartItems.indexOf(i);
            const cantidadToRemove = document.querySelector(`#c${i.id}`);
            const subtotalRemove = Number(cantidadToRemove.textContent) * Number(i.precio);
            console.log(subtotalRemove);
            valorSubtotal -= Number(subtotalRemove);
            valoresRender();

            console.log(i.nombre);
            cartItems.splice(ind, 1);
            const element = document.querySelector(`#i${i.id}`);
            element.parentElement.removeChild(element);
            break;
        }
    }
}
