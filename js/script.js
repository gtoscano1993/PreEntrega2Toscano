// Definir un Array de Productos
const productos = [
    {id:1, nombre:"Café Colombia", intensidad: 10 , precio: 12990, imagen: "https://cooperativa.cl/noticias/site/artic/20160928/imag/foto_0000000120160928214733.jpg"},
    {id:2, nombre:"Café Brasil", intensidad: 10, precio: 12490, imagen:"https://movidasana.com/wp-content/uploads/2015/11/cafe-768x384.jpg"},
    {id:3, nombre:"Café México", intensidad: 9, precio: 12099, imagen:"https://medicoplus.com/_next/image?url=https%3A%2F%2Fplustatic.com%2F3985%2Fconversions%2Ftipos-cafe-large.jpg&w=1280&q=75"},
    {id:4, nombre:"Café Puerto Rico", intensidad: 9, precio: 11990, imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMocpbm9VtiBLO9Xt4EUcP_ZCp3V7ZJK8Wj5vdjMVzpXYFSgfpad1Pv1MIugmBRBb75E4&usqp=CAU"},
    {id:5, nombre:"Café Honduras", intensidad: 9, precio: 11499, imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yNMdv0NnKsLLAwm0BQJWptBz7G-YhobriZQCnyvVbLNnZpRKpmAfcEjYW-ib7SxAtUs&usqp=CAU"},
    {id:6, nombre:"Café Perú", intensidad: 8, precio: 11099, imagen:"https://www.nestleprofessional.es/sites/default/files/styles/np_article_small/public/2023-09/conoce-los-atributos-y-caracteri.png?itok=EDp9b6C6"},
    {id:7, nombre:"Café Argentina", intensidad: 7, precio: 10990, imagen:"https://cdnx.jumpseller.com/onedrop/image/20195986/vence.jpg.jpg?1635498073"},
    {id:8, nombre:"Café Uruguay", intensidad: 7, precio: 10490, imagen:"https://www.bloomberglinea.com/resizer/R90l7VDBA4FncR2v_k93l_SmdkM=/600x0/filters:format(webp):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/QMA63E5VYRE73GKYMOGAX5UBXU.jpg"},
    {id:9, nombre:"Café Chile", intensidad: 6, precio: 10099, imagen:"https://sumerlabs.com/sumer-app-90b8f.appspot.com/product_photos%2F4722335dd186698672586a6d59206df1%2F108fd610-4ff0-11ec-95e3-5b95b21a0336?alt=media&token=b5a5e32f-72b5-4e1a-b2c4-41adf2f26149"},
    {id:10, nombre:"Café Paraguay", intensidad: 6, precio: 9900, imagen:"https://uploads.metropoles.com/wp-content/uploads/2023/08/27200234/1-1209.jpg"},
]

let contenidoProductos = document.getElementById("contenidoProductos");
for (const produ of productos){
    let elemento = document.createElement("div");
    elemento.className = "col-md-2 my-2";
    elemento.innerHTML = `<div class="card border-0">
    <img src="${produ.imagen}" class="card-img-top" alt="${produ.nombre}">
    <div class="card-body text-center">
      <p class="card-text"><b>${produ.nombre}</b></p>
      <p class="card-text">Intensidad: ${produ.intensidad}</p>
      <p class="card-text"><b>$ ${produ.precio}</b></p>
    </div>
    </div>`;
    contenidoProductos.appendChild(elemento); 
}

class Carrito {
    constructor(){
        this.productos = [];
        this.descuento = 15;
        this.maxProductosParaDescuento = 3;
        this.maxProductosParaEnvioGratis = 5;
        this.totalPagar = 0;
    }
    agregarProducto(id){
        let producto = productos.find(prod => prod.id === id);
        console.log(producto);

        if (producto){
            this.productos.push(producto);
            console.log("Agregaste el Producto #" + id + " al Carrito!")
        } else {
            console.log("No se encontró el Producto #" + id + "!")
        }
    }

    listarCarrito(){
        let salida = "";
    
        this.productos.forEach(item => {
            salida += item.id + " - " + item.nombre + " - $" + item.precio + "\n";
        })
        return salida;
    }
    

    calcularTotalProductos(){
        return this.productos.length;
    }

    aplicarDescuento(){
        
        if (this.calcularTotalProductos() >= this.maxProductosParaDescuento) {
            return Math.round((this.calcularTotalPagar() * this.descuento) / 100);
        } else {
            return 0;
        }
    }

    aplicarEnvioGratis() {
        const envioGratis = "\n" + "Su compra cuenta con Envío Gratis.";
        const costoEnvio = "\n" + "El costo de su envío es de $1500 en CABA" + "\n" + "$2500 para el resto del país." + "\n" + "Comprando 5 productos o más su envío será Gratis.";

        if (this.calcularTotalProductos() >= this.maxProductosParaEnvioGratis) {
            return envioGratis;
        } else {
            return costoEnvio;
        }
    }

    calcularTotalPagar() {
        let total = 0;

        this.productos.forEach(item => {
            total += item.precio;
        });
        return total;
    }
}

function listarProductos(){
    let salida = "";

    productos.forEach(item => {
        salida += item.id + " - " + item.nombre + " - $" + item.precio + "\n";
    })
    return salida;
}

const carrito = new Carrito();
let opcionSeleccionada = 10;

while (opcionSeleccionada != 0) {
    opcionSeleccionada = parseInt(prompt("Seleccione el producto a agregar al Carrito: (0 para Salir)\n\n" + listarProductos()));

    if (opcionSeleccionada == 0){
        break;
    }
    carrito.agregarProducto(opcionSeleccionada);
}

let productosCarrito = "Detalle: \n" + carrito.listarCarrito();
let salidaSubtotal = "Subtotal: $" + carrito.calcularTotalPagar();
let salidaDescuento = "Descuento: $" + carrito.aplicarDescuento();
let montoFinal = "Total: $" + Math.round(carrito.calcularTotalPagar() - carrito.aplicarDescuento());
let envioCarrito = carrito.aplicarEnvioGratis();
alert(productosCarrito + "\n" + salidaSubtotal + "\n" + salidaDescuento + "\n" + montoFinal+ "\n" + envioCarrito);

