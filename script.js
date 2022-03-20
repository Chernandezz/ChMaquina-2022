//Comandos Para Manejar el Modal
document.getElementById("button").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

// Carga de archivos

let input = document.getElementById("upload");
let textarea = document.getElementById("memoria");
let mem = document.getElementById("mem");

input.addEventListener("change", () => {
  let files = input.files;
  // console.log(files);

  if (files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    console.log(lines);
    for (let index = 0; index < lines.length; index++) {
      let contemem = document.createElement("div");
      let tag = document.createElement("div");
      let text = document.createTextNode(index);
      tag.appendChild(text);
      contemem.appendChild(tag);

      let tag2 = document.createElement("div");
      let text2 = document.createTextNode(lines[index]);
      tag2.appendChild(text2);
      contemem.appendChild(tag2);
      contemem.classList.add("contemem");

      mem.appendChild(contemem);
    }
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});
