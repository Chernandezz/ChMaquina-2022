// ------------------------------- FRONT -------------------------------

//Comandos Para Manejar el Modal
document.getElementById("config").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

// Creacion del vector de memoria principal
arreglo = new Array(7100);

// Variables Usadas
let input = document.getElementById("upload");
let textarea = document.getElementById("memoria");
let linea = document.getElementById("linea");
let codigo = document.getElementById("codigo");
let iconoLinea = document.getElementById("iconoLinea");
let cont = 0;
let memoriaDefinida = false;

// Valores Kernel y Memoria
let tamkernel = document.getElementById("tamkernel").value;
let tammemoria = document.getElementById("tammemoria").value;

// EvenListener del boton de carga de archivos
input.addEventListener("change", () => {
  document.getElementById("config").disabled = true;
  document.getElementById("config").classList.add("desactivado");

  let files = input.files;

  if (files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    for (let index = 0; index < lines.length + 2; index++) {
      if (lines[index] == "") {
        lines.splice(index, 1);
      }
    }
    console.log(lines);
    cont += lines.length;
    if (cont > tammemoria - tamkernel) {
      alert("ERROR, Memoria Insuficiente");
      return;
    }
    if (!memoriaDefinida) {
      for (let index = 1; index <= tammemoria; index++) {
        let tag = document.createElement("div");
        let text = document.createTextNode(index);
        tag.appendChild(text);
        linea.appendChild(tag);
        memoriaDefinida = true;
      }
      for (let index = 0; index < tamkernel; index++) {
        let tag = document.createElement("div");
        let tagi = document.createElement("i");
        tagi.classList.add("fa-brands");
        tagi.classList.add("fa-bitbucket");
        tag.appendChild(tagi);
        iconoLinea.appendChild(tag);
      }
      for (let index = 0; index < tammemoria - tamkernel; index++) {
        let tag = document.createElement("div");
        let tagi = document.createElement("i");
        tagi.classList.add("fa-solid");
        tagi.classList.add("fa-align-justify");
        tag.appendChild(tagi);
        iconoLinea.appendChild(tag);
      }
    }

    for (let index = 0; index < tamkernel; index++) {
      let tag = document.createElement("div");
      let text = document.createTextNode("--- KERNEL ---");
      tag.appendChild(text);
      codigo.appendChild(tag);
    }

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
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

function actualizarValorKernel() {
  tamkernel = document.getElementById("tamkernel").value;
}

function actualizarValorMemoria() {
  tammemoria = document.getElementById("tammemoria").value;
}

// Funcion para recargar la pagina
function recargar() {
  document.location.reload();
}

// ------------------------------- BACK -------------------------------
