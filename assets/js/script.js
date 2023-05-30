// Descripcion del programa:


// A partir de la funcion constructora llamada Gasto, se crean objetos que contienen
// la informacion de cada gasto (descripcion del gasto y monto en $$).

// Cada instancia de gasto se va guardando en un arrayGastos[] mediante la funcion agregarGastoenArray().

// Los calculos matematicos los hace la funcion calcularPresupuesto(). Esta funcion
// va a buscar los datos de gastos al arrayGastos[] y suma todos los gastos con un foreach.
// luego va a buscar el presupuesto al input del html, y finalmentye calcula el saldo.
// Cada vez que se llama a calcularPresupuesto(), de forma anidada se llama a las funciones de pintado de HTML
// para que actualicen la informacion mostrada en pantalla.

// Las operaciones de pintado de html las realizan las siguientes funciones:
// -rellenarTablaGastos()
// -rellenarTablaSaldo()

// Finalmente, la funcion Borrar() permite eliminar una instancia de Gasto del arrayGastos
// con una operacion splice. Cuando se llama a Borrar(), luego de eliminar el registro de
// arrayGastos[], se llama a calcularPresupuesto() y de forma anidada a las funciones de pintado
// html para que se actualice la informacion mostrada en pantalla.


////////////////      codigo del programa        /////////////////////////

// captura de los inputs y de las tablas desde el index.html

let capturaPres = document.getElementById("inputPres"); //captura input donde se ingresa el presupuesto
let capturaGasto = document.getElementById("inputGasto"); //captura input donde se ingresa cada gasto
let capturaDescrip = document.getElementById("inputDescrip"); //captura input donde se ingresa la descripcion de cada gasto
let capturaBtnGasto = document.getElementById("btnGasto"); //captura el boton para agregar un gasto
let capturaBtnPres = document.getElementById("btnPres"); //captura el boton para agregar y calcular un presupuesto
let capturaTablaGastos = document.getElementById("cuerpoTablaGastos"); //captura el tbody de la tabla donde se lista cada gasto
let capturaTablaSaldo = document.getElementById("cuerpoTablaSaldo"); //captura el tbody de la tabla donde se lista el resultado de presupuestom gasto total y saldo
let arrayGastos = []; //define el arrayGastos[], donde se guarda cada gasto en forma de objeto Gasto{Descipcion, monto}

capturaBtnPres.addEventListener("click", () => calcularPresupuesto(capturaPres, capturaTablaSaldo)); //se agrega el addeventlistener al boton para agregar y calcular el presupuesto

capturaBtnGasto.addEventListener("click", () => AgregarGastoEnArray(capturaDescrip, capturaGasto, capturaTablaGastos,capturaPres, capturaTablaSaldo)); // se agrega el addeventlistener al boton que permite agregar un gasto

function Gasto(descripcion, monto){ //funcion constructora de objetos gasto{}
    this.descripcion = descripcion;
    this.monto = monto;
}

function AgregarGastoEnArray(x, y, z, a, b){ //funcion para agregar un gasto{} dentro del arrayGastos[]
    let descripcion = x.value;
    let monto = parseInt(y.value);
    let objGasto = new Gasto(descripcion, monto);
    arrayGastos.push(objGasto);
    console.log(arrayGastos);
    calcularPresupuesto(a, b); //recalcula el presupuesto, gasto total y saldo considerando el nuevo gasto agregado recien
    rellenarTablaGastos(z); //actualiza informacion en pantalla

}

function rellenarTablaGastos(z){ //pintado del html 
  z.innerHTML = "";
  let i = 0;
  for(i = 0; i <= arrayGastos.length; i++){
    let a = "";
    let b = 0;
    a = arrayGastos[i].descripcion;
    b = arrayGastos[i].monto;
    z.innerHTML += `
    <tr>
    <td scope="row">${a}</td>
    <td>$${b}</td>
    <td><button type="button" class="btn btn-danger" onclick="Borrar(${i}, capturaTablaGastos, capturaPres, capturaTablaSaldo)">Borrar</button></td>
    </tr> `

  }   
}

function calcularPresupuesto(x, y){ //funcion principal del programa que permite calcular presupuesto, gasto total y saldo
        let gastoTotal = 0;
        let saldo = 0;
        let presupuesto = parseInt(x.value);
        arrayGastos.forEach(element => {
            let gastoUnitario = parseInt(element.monto);
            gastoTotal += gastoUnitario;            
          });
        console.log(gastoTotal);    
    saldo = presupuesto - gastoTotal;
    rellenarTablaSaldo(presupuesto, gastoTotal, saldo, y) //se llama a esta funcion para que se actualicen los datos mostrados en pantalla
    }

function rellenarTablaSaldo(a, b, c, d){ //pintado del html
  d.innerHTML = "";
  d.innerHTML +=
   `
   <tr>
   <td scope="row">$${a}</td>
   <td>$${b}</td>
   <td>$${c}</td>
   </tr> 
   `         
 }

 function Borrar(x, z, a, b){ // permite eliminar un objeto Gasto{} desde el arrayGastos[] y luego recalcular presupuesto y repintar el html
  console.log(arrayGastos);
  arrayGastos.splice(x,1);
  console.log(arrayGastos);
  calcularPresupuesto(a, b); //permite recalcular el presupuesto, gasto total y saldo considerando que se eliminó un gasto
  rellenarTablaGastos(z); //actualiza la informacion mostrada en pantalla
 }



   

    







