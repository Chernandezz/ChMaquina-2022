//Comandos Para Manejar el Modal
document.getElementById("config").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

// Carga de archivos

let input = document.getElementById("upload");
let textarea = document.getElementById("memoria");
let linea = document.getElementById("linea");
let codigo = document.getElementById("codigo");
let contaaa = document.querySelectorAll(".lineacode");
let cont = 0;
let memoriaDefinida = false;

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
    cont += lines.length;
    console.log(cont);
    console.log(tammemoria);
    if (cont > tammemoria) {
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
    }

    for (let index = 0; index < lines.length; index++) {
      contaaa = document.querySelectorAll(".lineacode");
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

// Valores Kernel y Memoria
let tamkernel = document.getElementById("tamkernel").value;
let tammemoria = document.getElementById("tammemoria").value;

function actualizarValorKernel() {
  tamkernel = document.getElementById("tamkernel").value;
}

function actualizarValorMemoria() {
  tammemoria = document.getElementById("tammemoria").value;
}

function recargar() {
  document.location.reload();
}
