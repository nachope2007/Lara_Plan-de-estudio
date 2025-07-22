const materias = [
  { id: 1, nombre: "Trabajo y Sociedad", aprobadas: [], regulares: [] },
  { id: 2, nombre: "Química", aprobadas: [], regulares: [] },
  { id: 3, nombre: "Física e Introducción a la Biofísica", aprobadas: [], regulares: [] },
  { id: 4, nombre: "Historia de la Cosmetología", aprobadas: [1, 2, 3], regulares: [] },
  { id: 5, nombre: "Anatomía", aprobadas: [1, 2, 3], regulares: [] },
  { id: 6, nombre: "Biología, Histología y Genética", aprobadas: [1, 2, 3], regulares: [] },
  { id: 7, nombre: "Fisiología", aprobadas: [1, 2, 3], regulares: [] },
  { id: 8, nombre: "Cosmética Facial y Anexos", aprobadas: [1, 2, 3], regulares: [] },
  { id: 9, nombre: "Práctica Profesional 2° Año", aprobadas: [1, 2, 3], regulares: [5, 6, 7, 8] },
  { id: 10, nombre: "Maquillaje Básico", aprobadas: [1, 2, 3], regulares: [4, 5, 6, 7, 8] },
  { id: 11, nombre: "Psicología General y Aplicada", aprobadas: [1, 2, 3], regulares: [8] },
  { id: 12, nombre: "Dermatología Básica", aprobadas: [1, 2, 3], regulares: [5, 6, 7, 8] },
  { id: 13, nombre: "Inglés Básico", aprobadas: [1, 2, 3], regulares: [] },
  { id: 14, nombre: "Cosmetología Corporal", aprobadas: [1, 2, 3], regulares: [5, 6, 7, 8] },
  { id: 15, nombre: "Microbiología", aprobadas: [1, 2, 3, 5, 6, 7, 8], regulares: [12, 13, 14] },
  { id: 16, nombre: "Bioestadística y Epidemiología", aprobadas: [1, 2, 3, 5, 6, 7, 8], regulares: [12, 14] },
  { id: 17, nombre: "Química Cosmética", aprobadas: [1, 2, 3, 5, 6, 7, 8], regulares: [10, 12, 14] },
  { id: 18, nombre: "Introducción a la Nutrición", aprobadas: [1, 2, 3, 5, 6, 7, 8], regulares: [] },
  { id: 19, nombre: "Práctica Profesional 3° Año", aprobadas: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17], regulares: [] },
  { id: 20, nombre: "Dermatología y Semiología Cosmetológica", aprobadas: [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14], regulares: [15, 16, 17, 18] },
  { id: 21, nombre: "Marketing Cosmetológico", aprobadas: [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14], regulares: [15, 16, 17, 18] },
  { id: 22, nombre: "Maquillaje terapéutico", aprobadas: [1, 2, 3, 8, 10], regulares: [] },
  { id: 23, nombre: "Salud Pública", aprobadas: [1, 2, 3, 4, 5, 6, 7, 8,], regulares: [9, 10, 12, 14, 15, 17] },
  { id: 24, nombre: "Bioética y Deontología Cosmetológica", aprobadas: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], regulares: [20, 21, 22, 23] },
  { id: 25, nombre: "Tecnología Cosmetológica", aprobadas: [15, 16, 17, 18], regulares: [20, 21, 22, 23] },
  { id: 26, nombre: "Inglés Técnico", aprobadas: [1, 2, 3, 13], regulares: [] },
  { id: 27, nombre: "Informática", aprobadas: [1, 2, 3, 13], regulares: [] },
  { id: 28, nombre: "Asignatura Electiva I", aprobadas: [1, 2, 3, 4, 5, 6, 7, 8], regulares: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { id: 29, nombre: "Asignatura Electiva II", aprobadas: [1, 2, 3, 4, 5, 6, 7, 8], regulares: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] },
];

const materiasAprobadas = new Set();
const materiasRegulares = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  materias.forEach((materia) => {
    let puedeMostrar = false;
    if (materia.aprobadas.length === 0 && materia.regulares.length === 0) {
      puedeMostrar = true;
    } else if (materia.aprobadas.length > 0 && materia.regulares.length === 0) {
      puedeMostrar = materia.aprobadas.every((req) => materiasAprobadas.has(req));
    } else if (materia.aprobadas.length === 0 && materia.regulares.length > 0) {
      // Aquí el cambio: cuenta como regular si está en regulares o aprobadas
      puedeMostrar = materia.regulares.every((req) => materiasRegulares.has(req) || materiasAprobadas.has(req));
    } else {
      // Ambas
      puedeMostrar =
        materia.aprobadas.every((req) => materiasAprobadas.has(req)) &&
        materia.regulares.every((req) => materiasRegulares.has(req) || materiasAprobadas.has(req));
    }

    if (puedeMostrar) {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = `materia-${materia.id}`;
      const titulo = document.createElement("h3");
      titulo.innerText = materia.nombre;

      const botonAprobada = document.createElement("button");
      botonAprobada.innerText = materiasAprobadas.has(materia.id) ? "Desmarcar Aprobada" : "Marcar como Aprobada";
      botonAprobada.classList.toggle("aprobado", materiasAprobadas.has(materia.id));
      botonAprobada.style.backgroundColor = materiasAprobadas.has(materia.id) ? "#d63384" : "#ff99cc";
      botonAprobada.onclick = () => toggleMateria(materia.id, "aprobada");

      const botonRegular = document.createElement("button");
      botonRegular.innerText = materiasRegulares.has(materia.id) ? "Desmarcar Regular" : "Marcar como Regular";
      botonRegular.classList.toggle("regular", materiasRegulares.has(materia.id));
      botonRegular.style.backgroundColor = materiasRegulares.has(materia.id) ? "#ffb3d9" : "#ffe6f0";
      botonRegular.style.color = "#880044";
      botonRegular.style.marginTop = "8px";
      botonRegular.onclick = () => toggleMateria(materia.id, "regular");

      div.appendChild(titulo);
      div.appendChild(botonAprobada);
      div.appendChild(botonRegular);
      contenedor.appendChild(div);
    }
  });
}

function toggleMateria(id, tipo) {
  if (tipo === "aprobada") {
    if (materiasAprobadas.has(id)) {
      materiasAprobadas.delete(id);
    } else {
      materiasAprobadas.add(id);
      materiasRegulares.delete(id); // No puede ser ambas
    }
  } else if (tipo === "regular") {
    if (materiasRegulares.has(id)) {
      materiasRegulares.delete(id);
    } else {
      materiasRegulares.add(id);
      materiasAprobadas.delete(id); // No puede ser ambas
    }
  }
  crearMalla();
}

document.addEventListener("DOMContentLoaded", crearMalla);
