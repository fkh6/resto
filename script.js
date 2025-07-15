function nuevoMenu(){
    
}
//function get recetas tomadas from https://www.themealdb.com/api.php



let comidas=[{tipo: "Pizza",
    ingredientes: "masa(base), queso, salsa de tomate, huevo",
    tiempo: 30, //con la masa lista
    precio: 7},{
        tipo: "Burger",
        ingredientes: "pan(base), carne, queso, mayonesa",
        tiempo: 25,
        precio:6}]

function comida(tipo,ingredientes,tiempo,precio){
    this.tipo = tipo
    this.ingredientes= ingredientes
    this.tiempo= tiempo
    this.precio=precio
    this.mostrar= function(){
        console.log(
            "felpudo"

        )
    }
}

comidas.push(new comida("panqueque", "harina,huevo,ddl",35,5));


let menu= document.querySelector(".menu");
comidas.forEach((comida,index)=>{ 
        menu.innerHTML += `<article class="${comida.tipo}"><h3>${comida.tipo}</h3>
        <p>${comida.ingredientes}</p>
        <p>Tiempo estimado: ${comida.tiempo} min</p>
        <p><b>$${comida.precio} dolares</b></p>
        <form action="">
            <input type="number" name="" id="${index}" class="cantidad" placeholder="0">
            <button type="button" id="boton">Agregar</button>
        </form></article>`; })
        //<button type="button" id="boton" class="borrar">Borrar</button>

let clientes=[{nombre: "Chiqui Tapia",
                dni:20111999,
            genero: "masculino",
            fechaDeNacimiento: new Date(1956,5,19)}]
let ordenFija= document.querySelector(".ordenFija");
let miOrden= document.querySelector(".miOrden");
let total= document.querySelector(".total");
let ordenes= [], itemComida=0, nroOrden=0, precioTotal, coincidente;
const botones= document.querySelectorAll("#boton");
//const borrar= document.querySelector("#borrar");

//llenar array ordenes y reemaplazar ahi cu, cantidad, precio, reemplazar la orden en pantalla recorriendo orden nro
function nuevoItemComida(ordenes,itemComida,comidas,index,cantidad) {
    ordenes[itemComida]=new Object();
    ordenes[itemComida].orden   = nroOrden;
    ordenes[itemComida].comida  = comidas[index].tipo;
    ordenes[itemComida].cantidad= cantidad;
    ordenes[itemComida].precio  = comidas[index].precio *cantidad;
    ordenes[itemComida].hsRetiro= comidas[index].tiempo;
    console.log(ordenes[itemComida]);
}
function calcularPrecioTotalyFinalizar(ordenes){
    precioTotal=0;
    ordenes.forEach(item => precioTotal+=item.precio);
    total.innerHTML= `<p><strong>Total de ${precioTotal} dolares</strong></p>
            <button type="button" id="finalizar">Finalizar</button>`;
}
/* let =            { orden: 1
                    comida: X,
                    ingredientes:...,
                    cantidad:,
                    precio:},
                    { orden: 1
                    comida: Y,
                    ingredientes:,
                    cantidad:,
                    precio:}, */
botones.forEach((boton,index) =>
    boton.addEventListener("click",()=>{
        let cantidad= document.getElementById(`${index}`).value;
        //let cantidad= document.querySelector(`html body article form .cantidad#${index}`).value;
        //alert(cantidad);

       if(nroOrden==0){
        nroOrden++;
        alert("no existe orden, imprimir");
        nuevoItemComida(ordenes,itemComida,comidas,index,cantidad);

        ordenFija.innerHTML=`<p>Numero de orden ${ordenes[itemComida].orden} -
        tiempo estimado ${ordenes[itemComida].hsRetiro} min</p>`;

        miOrden.innerHTML = `<p id="${ordenes[itemComida].comida}">${ordenes[itemComida].comida}</p>
            <p id="cantidad" class="${ordenes[itemComida].comida}">${ordenes[itemComida].cantidad} unidades</p>
            <p id="precio" class="${ordenes[itemComida].comida}">${ordenes[itemComida].precio} parcial</p>`;

        /* precioTotal=ordenes[itemComida].precio;
        total.innerHTML= `<p><strong>Total de ${precioTotal} dolares</strong></p>
        <button type="button" id="finalizar">Finalizar</button>`; */
        calcularPrecioTotalyFinalizar(ordenes);
        
    }else if(ordenes.some(item=> item.comida===comidas[index].tipo)){
            alert("orden igual tipo, cambiar cantidad, imprimir reemplazando");
            coincidente=ordenes.findIndex(item=> item.comida===comidas[index].tipo);
            ordenes[coincidente].cantidad= cantidad;
            ordenes[coincidente].precio  = comidas[index].precio *cantidad;
            ordenes[coincidente].hsRetiro*=1.10;
            console.log(ordenes[coincidente]);
            
            //ordenFija.innerHTML.replace(0,ordenes[itemComida].hsRetiro);
            let cambiarCantidad=document.querySelector(`.miOrden p.${ordenes[coincidente].comida}#cantidad`);
            cambiarCantidad.textContent= ordenes[coincidente].cantidad + " unidades";
            let cambiarPrecio=document.querySelector(`.miOrden p.${ordenes[coincidente].comida}#precio`);
            cambiarPrecio.textContent= ordenes[coincidente].precio + " parcial";
        
            calcularPrecioTotalyFinalizar(ordenes);
    }else{
            itemComida++;
            alert("orden distinta, imprimir debajo sin borrar, sumar total recorriendo el nro orden");
           /*  ordenes[itemComida]=new Object();
            ordenes[itemComida].orden   = nroOrden;
            ordenes[itemComida].comida  = comidas[index].tipo;
            ordenes[itemComida].cantidad= cantidad;
            ordenes[itemComida].precio  = comidas[index].precio *cantidad;
            ordenes[itemComida].hsRetiro= comidas[index].tiempo;
            console.log(ordenes[itemComida]); */

            nuevoItemComida(ordenes,itemComida,comidas,index,cantidad);

            miOrden.innerHTML += `<p id="${ordenes[itemComida].comida}">${ordenes[itemComida].comida}</p>
            <p id="cantidad" class="${ordenes[itemComida].comida}">${ordenes[itemComida].cantidad} unidades</p>
            <p id="precio" class="${ordenes[itemComida].comida}">${ordenes[itemComida].precio} parcial</p>`;
            
            calcularPrecioTotalyFinalizar(ordenes);
    }
    let finalizar= document.getElementById("finalizar");
    let cliente= document.querySelector("aside.cliente");
    finalizar.addEventListener('click',function(){
        let retiro= Date.now()+(ordenes[itemComida].hsRetiro*60000);
        let espera=new Date(retiro);
        

        ordenFija.innerHTML=`<p>Numero de orden ${ordenes[itemComida].orden} -
        hora estimada ${espera.getHours()}:${(espera.getMinutes()<10)? ("0"+espera.getMinutes()): espera.getMinutes()}</p>`;

        cliente.innerHTML=`<h2>Lista de Clientes</h2>
        <select name="cliente" id="cliente">
            <option value="">${clientes[0].nombre}</option>
            <option value="">otro</option>
        </select>
        <button type="button" id="elegir">Elegir</button>`;
        //onchange
        //buscador de clientes
        //crear usuario en nueva pagina
        //telefono,mail
        //value es para el id 01 


        let elegir= document.getElementById("elegir");
        elegir.addEventListener('click',function(){
            let hoy= Date.now();
            let zero=Date.parse('01 Jan 1970');
            console.log(hoy);
            console.log(zero);
            console.log(Date.parse(clientes[0].fechaDeNacimiento));
            cliente.innerHTML+=`<p>nombre: ${clientes[0].nombre}</p>
            <p>dni: ${clientes[0].dni}</p>
            <p>genero: ${clientes[0].genero}</p>
            <p>Edad: ${new Date(Date.parse(clientes[0].fechaDeNacimiento)<0 ? -((zero-hoy)+(Date.parse(clientes[0].fechaDeNacimiento))) : hoy-Date.parse(clientes[0].fechaDeNacimiento)).getFullYear()}</p>`;
        })
    })
    
    //boton finalizar aumenta 1 en orden
        //incorporar borrar orden por tipo de comida en el menu y en la orden
        /* if(evento.target==borrar){
            let borrado= ordenes.findIndex(item=> item.comida===comidas[index].tipo);
            ordenes.splice(borrado,1);
        } */
    }))



//function listarOrdenes(){}
//function nuevoCliente(){}
//function pagar(){}
        //medioDePago: "contado, despues tarjeta"}


//conectar a base de datos

//stock y proveedores


