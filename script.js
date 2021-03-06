// ------------------------------- FRONT -------------------------------
({
  plugins: ["jsdom-quokka-plugin"],
});

//Comandos Para Manejar el Modal
document.getElementById("config").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

// Modal Errores
let popuperrores = document.getElementById("modalErrores");
let cerrarModalErrores = document.getElementById("cerrarModalErrores");

cerrarModalErrores.addEventListener("click", function () {
  popuperrores.style.display = "none";
});

// Creacion del vector de memoria principal
arreglo = new Array(7100);

// Variables Usadas
let input = document.getElementById("upload");
let ejecutar = document.getElementById("ejecutar");
let textarea = document.getElementById("memoria");

// Salidas Memorias
let linea = document.getElementById("linea");
let codigo = document.getElementById("codigo");
let lineaProgCargado = document.getElementById("lineaProgCargado");
let programasMemoria = document.getElementById("programasMemoria");
let pantalla = document.getElementById("pantalla");
let impresora = document.getElementById("impresora");
let iconoLinea = document.getElementById("iconoLinea");

// Salidas Variables
let varnombre = document.getElementById("varnombre");
let vartipo = document.getElementById("vartipo");
let varvalor = document.getElementById("varvalor");

// Salida Etiquetas
let lineaEtiqueta = document.getElementById("lineaEtiqueta");
let nombreEtiqueta = document.getElementById("nombreEtiqueta");

let cont = 0;
let memoriaDefinida = false;
let lines = [];
let memoriaprincipal = [];
let errores = 0;
let listavariables = [];
let listaEtiquetas = [];
let valacu = 0;
let progCargados = 0;

// Valores Kernel y Memoria
let tamkernel = document.getElementById("tamkernel").value;
let tammemoria = document.getElementById("tammemoria").value;

input.addEventListener("change", () => {
  var files = input.files;
  if (files.length == 0) return;
  var reader = new FileReader();
  progCargados++;
  let tag = document.createElement("div");
  let text = document.createTextNode(progCargados);
  tag.appendChild(text);
  lineaProgCargado.appendChild(tag);

  for (let index = 0; index < files.length; index++) {
    let tag = document.createElement("div");
    tag.classList.add("lineacode");
    let text = document.createTextNode(files[index]["name"]);
    tag.appendChild(text);
    programasMemoria.appendChild(tag);
  }
});

// EvenListener del boton de carga de archivos
ejecutar.addEventListener("click", () => {
  // Se desabilita el poder cambiar memoria y kernel
  document.getElementById("config").disabled = true;
  document.getElementById("config").classList.add("desactivado");

  var files = input.files;

  // Validacion para Ver si el usuario cargo algo
  if (files.length == 0) return;

  const file = files[0];

  var reader = new FileReader();

  reader.onload = (e) => {
    // Entrada del archivo cargado
    const file = e.target.result;
    lines = file.split(/\r\n|\n/);
    // Eliminacion de lineas vacias
    for (let index = 0; index < lines.length + 2; index++) {
      if (lines[index] == "") {
        lines.splice(index, 1);
      }
    }
    // Funcion que se encarga de revisar que no hayan errores en el codigo
    errores = 0;
    revisorSintaxis(lines);
    if (errores != 0) {
      document.getElementById("cantErrores").innerHTML = errores;
      popuperrores.style.display = "flex";
      return;
    }

    cont += lines.length;
    if (cont > tammemoria - tamkernel) {
      alert("ERROR, Memoria Insuficiente");
      return;
    }

    // Cuando ya no hay problemas de tam de memoria se carga en memoria principal
    memoriaprincipal.push(lines);
    if (!memoriaDefinida) {
      // Salida de numero de lineas
      for (let index = 1; index <= tammemoria; index++) {
        let tag = document.createElement("div");
        let text = document.createTextNode(index);
        tag.appendChild(text);
        linea.appendChild(tag);
      }

      // Icono de Kernel
      for (let index = 0; index < tamkernel; index++) {
        let tag = document.createElement("div");
        let tagi = document.createElement("i");
        tagi.classList.add("fa-brands");
        tagi.classList.add("fa-bitbucket");
        tag.appendChild(tagi);
        iconoLinea.appendChild(tag);
      }

      // Icono de lineas de codigo
      for (let index = 0; index < tammemoria - tamkernel; index++) {
        let tag = document.createElement("div");
        let tagi = document.createElement("i");
        tagi.classList.add("fa-solid");
        tagi.classList.add("fa-align-justify");
        tag.appendChild(tagi);
        iconoLinea.appendChild(tag);
      }
      // Salida de la linea --kernel--
      for (let index = 0; index < tamkernel; index++) {
        let tag = document.createElement("div");
        let text = document.createTextNode("--- KERNEL ---");
        tag.appendChild(text);
        codigo.appendChild(tag);
      }

      // Confirmacion de que ya se mostraron los numeros de linea con los iconos
      memoriaDefinida = true;
    }

    // Salida de cada linea de codigo en el array lines
    for (let index = 0; index < lines.length; index++) {
      if (lines[index] == "") {
        continue;
      }

      let tag = document.createElement("div");
      tag.classList.add("lineacode");
      let text = document.createTextNode(lines[index]);
      tag.appendChild(text);
      codigo.appendChild(tag);
    }

    // Salida Variables
    varnombre.innerHTML = "";
    vartipo.innerHTML = "";
    varvalor.innerHTML = "";
    for (let index = 0; index < listavariables.length; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode(listavariables[index][0]);
      tag.appendChild(text);
      varnombre.appendChild(tag);
    }
    for (let index = 0; index < listavariables.length; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode(listavariables[index][1]);
      tag.appendChild(text);
      vartipo.appendChild(tag);
    }
    for (let index = 0; index < listavariables.length; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode(listavariables[index][2]);
      tag.appendChild(text);
      varvalor.appendChild(tag);
    }

    // Salida Etiquetas
    lineaEtiqueta.innerHTML = "";
    nombreEtiqueta.innerHTML = "";
    for (let index = 0; index < listaEtiquetas.length; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode(listaEtiquetas[index][0]);
      tag.appendChild(text);
      lineaEtiqueta.appendChild(tag);
    }
    for (let index = 0; index < listaEtiquetas.length; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode(listaEtiquetas[index][1]);
      tag.appendChild(text);
      nombreEtiqueta.appendChild(tag);
    }
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

ejecutar.addEventListener("click", () => {
  lines.forEach((element) => {
    // console.log(element);
  });
});

// Evento que recive cuando se cambia el tam de Kernel
function actualizarValorKernel() {
  tamkernel = document.getElementById("tamkernel").value;
}

// Evento que recive cuando se cambia el tam de memoria
function actualizarValorMemoria() {
  tammemoria = document.getElementById("tammemoria").value;
}

// Funcion para recargar la pagina
function recargar() {
  document.location.reload();
}

// ------------------------------- BACK -------------------------------

// Funcion encargada de revisar sintaxis
function revisorSintaxis(lines) {
  cargavariables(lines);
  cargarEtiquetas(lines);
  lines.forEach((element) => {
    let comando = element.split(" ");
    // Comando Para eliminar espacios vacios
    comando = comando.filter((e) => String(e).trim());
    switch (comando[0]) {
      case "cargue":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            document.getElementById("valorAcumulador").innerHTML = element[2];
          }
        });
        break;

      case "almacene":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            element[2] = document.getElementById("valorAcumulador").innerHTML;
            console.log(element);
          }
        });
        break;

      case "sume":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            valacu += parseInt(element[2]);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "reste":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            valacu -= parseInt(element[2]);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "multiplique":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            valacu *= parseInt(element[2]);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "divida":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            valacu /= parseInt(element[2]);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "potencia":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            console.log(valacu);
            valacu = Math.pow(valacu, parseInt(element[2]));
            console.log(valacu);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "modulo":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            valacu = parseInt(
              document.getElementById("valorAcumulador").innerHTML
            );
            valacu = valacu % parseInt(element[2]);
            document.getElementById("valorAcumulador").innerHTML = valacu;
          }
        });
        break;

      case "muestre":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            let tag = document.createElement("div");
            let text = document.createTextNode(element[2]);
            tag.appendChild(text);
            pantalla.appendChild(tag);
          }
        });
        break;

      case "imprima":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            let tag = document.createElement("div");
            let text = document.createTextNode(element[2]);
            tag.appendChild(text);
            impresora.appendChild(tag);
          }
        });
        break;

      case "promedio":
        verificarTamInstruccion(comando.length, 2, 2);
        if (errores > 0) {
          return;
        }
        listavariables.forEach((element) => {
          if (element[0] == comando[1]) {
            let tag = document.createElement("div");
            let text = document.createTextNode(
              (parseInt(element[2]) + parseInt(valacu)) / 2
            );
            tag.appendChild(text);
            pantalla.appendChild(tag);
          }
        });
        break;
    }
  });
}

// En la listaEtiquetas el primer valor es el nombre, segundo la linea realitiva
// Contando el kernel y el tercer es la linea real
function cargarEtiquetas(lines) {
  lines.forEach((element) => {
    let comando = element.split(" ");
    // Comando Para eliminar espacios vacios
    comando = comando.filter((e) => String(e).trim());
    let laEtiqueta = [];
    let etExiste = false;
    if (comando[0] == "etiqueta") {
      // Error de Tama??o
      verificarTamInstruccion(comando.length, 3, 3);
      // Verificacion de no repetir nombres de variables
      etExiste = verificarNombreEt(comando);
      // Error de tipo de Variable
      if (!etExiste) {
        // Asignacion de valores por defecto
        // Guardarlo en forma de M-triz
        laEtiqueta.push(comando[1]);
        laEtiqueta.push(parseInt(comando[2]) + parseInt(tamkernel));
        laEtiqueta.push(comando[2]);
        listaEtiquetas.push(laEtiqueta);
      }
    }
  });
}

function cargavariables(lines) {
  lines.forEach((element) => {
    let comando = element.split(" ");
    // Comando Para eliminar espacios vacios
    comando = comando.filter((e) => String(e).trim());
    let lavariable = [];
    let varExiste = false;
    if (comando[0] == "nueva") {
      // Error de Tama??o
      verificarTamInstruccion(comando.length, 4, 3);
      // Verificacion de no repetir nombres de variables
      varExiste = verificarNombreVar(comando);
      // Error de tipo de Variable
      if (!varExiste) {
        if (
          comando[2] != "C" &&
          comando[2] != "I" &&
          comando[2] != "R" &&
          comando[2] != "L"
        ) {
          error();
        }
        // Asignacion de valores por defecto
        if (comando.length == 3) {
          if (comando[2] == "C") {
            comando.push(" ");
          }
          if (comando[2] == "I" || comando[2] == "R") {
            comando.push("1");
          }
          if (comando[2] == "L") {
            comando.push("0");
          }
        }
        // Guardarlo en forma de M-triz
        lavariable.push(comando[1]);
        lavariable.push(comando[2]);
        lavariable.push(comando[3]);
        listavariables.push(lavariable);
      }
      // Guardarlo en forma de vector
      // listavariables.push(comando[1]);
      // listavariables.push(comando[2]);
      // listavariables.push(comando[3]);
    }
    if (comando[0] == "lea") {
      // Error de Tama??o
      verificarTamInstruccion(comando.length, 4, 3);
      // Verificacion de no repetir nombres de variables
      varExiste = verificarNombreVar(comando);
      if (!varExiste) {
        if (
          comando[2] != "C" &&
          comando[2] != "I" &&
          comando[2] != "R" &&
          comando[2] != "L"
        ) {
          error();
        }

        // Guardarlo en forma de M-triz
        $varInput = window.prompt(
          "Ingrese el valor de la variable " + comando[1] + ": "
        );
        lavariable.push(comando[1]);
        lavariable.push(comando[2]);
        if ($varInput == "") {
          // Asignacion de valores por defecto
          if (comando.length == 3) {
            if (comando[2] == "C") {
              lavariable.push(" ");
            }
            if (comando[2] == "I" || comando[2] == "R") {
              lavariable.push("1");
            }
            if (comando[2] == "L") {
              lavariable.push("0");
            }
          }
        } else {
          lavariable.push($varInput);
        }
        listavariables.push(lavariable);
      }
    }
  });
}

// Funciones Para Errores

// Verificar que no hayan nombres de varibales repetidas
function verificarNombreVar(comando) {
  for (let i = 0; i < listavariables.length; i++) {
    if (listavariables[i].includes(comando[1])) {
      error();
      return true;
    }
  }
}

// Verificar que no hayan nombres de etiquetas repetidas
function verificarNombreEt(comando) {
  for (let i = 0; i < listaEtiquetas.length; i++) {
    if (listaEtiquetas[i].includes(comando[1])) {
      error();
      return true;
    }
  }
}

// Verificar tam instruccion
function verificarTamInstruccion(tam, max, min) {
  if (tam > max || tam < min) {
    error();
  }
}
// Ingresar linea del error en arreglo
function error() {
  errores += 1;
}
