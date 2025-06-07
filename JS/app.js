import crearPelicula from "./classeCine.js";

//funciones
const abrirModal = () => {
  //aqui abro la ventana modal
  modalContacto.show();
  creandoPelicula = true;
};

const crearPeli = () => {
  if(validaciones()){
    const nuevaPelicula = new crearPelicula(
    inputTitulo.value,
    inputDirector.value,
    inputAnio.value,
    inputGenero.value,
    inputDuracion.value,
    inputImagen.value
  );

  console.log(nuevaPelicula);
  limpiarForm();
  cartelera.push(nuevaPelicula);
  guardarlocalStorage();
  dibujarFila(nuevaPelicula, cartelera.length);
  Swal.fire({
    title: "Pelicula agregada!",
    text: `La pelicula  ${nuevaPelicula.titulo} fue agregada correctamente`,
    icon: "success",
  });
};
  }
  

const limpiarForm = () => {
  formularioPelicula.reset();
  const inputs = formularioPelicula.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
  });
};

const guardarlocalStorage = () => {
  localStorage.setItem("carteleraKey", JSON.stringify(cartelera));
};

const cargarPelicula = () => {
  if (cartelera.length !== 0) {
    cartelera.map((pelicula, indice) => dibujarFila(pelicula, indice + 1));
  }
};

const dibujarFila = (pelicula, indice) => {
  tablaPeli.innerHTML += `<tr>
              <th scope="row">${indice}</th>
              <td>${pelicula.titulo}</td>
              <td>${pelicula.genero}</td>
              <td>${pelicula.duracion}</td>
              <td>${pelicula.anio}</td>
              <td>${pelicula.director}</td>
              <td>
                <button class="btn btn-warning" onclick='prepararPelicula("${pelicula.id}")'>Editar</button>
                <button class="btn btn-danger" onclick='eliminarPeli("${pelicula.id}")' >Borrar</button>
                <button class="btn btn-info" onclick='verPeli("${pelicula.id}")'>Ver</button>
              </td>
            </tr>`;
};

window.eliminarPeli = (id) => {
  Swal.fire({
    title: `Estas seguro que desea borrar la pelicula?`,
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar!",
    cancelButtonText: "No, cancelar!",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionPeliculaBuscado = cartelera.findIndex(
        (pelicula) => pelicula.id === id
      );
      cartelera.splice(posicionPeliculaBuscado, 1);
      guardarlocalStorage();
      tablaPeli.children[posicionPeliculaBuscado].remove();
      //actualizar los índices de las filas restantes
      const filasRestantes = tablaPeli.children;
      for (let i = 0; i < filasRestantes.length; i++) {
        const celdaIndice = filasRestantes[i].querySelector("th");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1; // Actualiza el texto con el nuevo índice
        }
      }
    }
  });
};

window.prepararPelicula = (id) => {
  const posicionPeliculaBuscado = cartelera.find(
    (pelicula) => pelicula.id === id
  );
  inputTitulo.value = posicionPeliculaBuscado.titulo;
  inputGenero.value = posicionPeliculaBuscado.genero;
  inputDuracion.value = posicionPeliculaBuscado.duracion;
  inputAnio.value = posicionPeliculaBuscado.anio;
  inputDirector.value = posicionPeliculaBuscado.director;
  inputImagen.value = posicionPeliculaBuscado.imagen;
  abrirModal();
  idPeliculaEditar = id;
  creandoPelicula = false;
};

const editarPelicula = () => {
  const posicionPeliculaBuscado = cartelera.findIndex(
    (pelicula) => pelicula.id === idPeliculaEditar
  );
  cartelera[posicionPeliculaBuscado].titulo = inputTitulo.value;
  cartelera[posicionPeliculaBuscado].genero = inputGenero.value;
  cartelera[posicionPeliculaBuscado].duracion = inputDuracion.value;
  cartelera[posicionPeliculaBuscado].anio = inputAnio.value;
  cartelera[posicionPeliculaBuscado].director = inputDirector.value;
  cartelera[posicionPeliculaBuscado].imagen = inputImagen.value;
  //actualizar el localStorage
  guardarlocalStorage();
  //limpiar el formulario
  limpiarForm();
  //cerrar el modal
  modalContacto.hide();

  //mensaje de actualizado
  const filaEditada = tablaPeli.children[posicionPeliculaBuscado];
  if (filaEditada) {
    filaEditada.children[1].textContent =
      cartelera[posicionPeliculaBuscado].titulo;
    filaEditada.children[2].textContent =
      cartelera[posicionPeliculaBuscado].genero;
    filaEditada.children[3].textContent =
      cartelera[posicionPeliculaBuscado].duracion;
    filaEditada.children[4].textContent =
      cartelera[posicionPeliculaBuscado].anio;
    filaEditada.children[5].textContent =
      cartelera[posicionPeliculaBuscado].director;
  }

  //agregar un mensaje al usuario
  Swal.fire({
    title: "Pelicula modificada",
    text: `La pelicula ${cartelera[posicionPeliculaBuscado].titulo} fue modificado correctamente`,
    icon: "success",
  });
};

function validarCantidadCaracteres(input, min, max) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
     input.classList.remove("is-valid");
    return false;
  }
}
function validarLink() {
  const regExp = /^[a-zA-Z]+:\/\/.+/i;
  if (regExp.test(inputImagen.value)) {
    inputImagen.classList.add("is-valid");
    inputImagen.classList.remove("is-invalid");
    return true;
  } else {
    inputImagen.classList.add("is-invalid");
     inputImagen.classList.remove("is-valid");
    return false;
  }
}
function validaciones(){
  let datosValidos =true;
  if(!validarCantidadCaracteres(inputTitulo, 2, 50)){
    datosValidos= false
  }
  
  if(!validarCantidadCaracteres(inputGenero,2,50)){
    datosValidos= false
  }
  if(!validarCantidadCaracteres(inputDuracion, 1, 10)){
    datosValidos= false
  }
  if(!validarCantidadCaracteres(inputAnio, 4, 4)){
    datosValidos= false
  }
  if(!validarCantidadCaracteres(inputDirector, 2, 50)){
    datosValidos= false
  }

  if(!validarLink()){
    datosValidos= false
  }

  return datosValidos;
}


window.verPeli = (id) => {
  window.location.href = "./pages/detallePeli.html?id=" + id;
};
const modalContacto = new bootstrap.Modal(
  document.getElementById("modalContacto")
);
const btnAgregar = document.getElementById("btnAgregar");
const formularioPelicula = document.querySelector("form");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("Genero");
const inputDuracion = document.getElementById("duracion");
const inputAnio = document.getElementById("año");
const inputDirector = document.getElementById("director");
const inputImagen = document.getElementById("imagen");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];
const tablaPeli = document.querySelector("tbody");
let idPeliculaEditar = null;
let creandoPelicula = true;

btnAgregar.addEventListener("click", () => {
  limpiarForm();
  idPeliculaEditar = null;
  creandoPelicula = true;
  abrirModal();
});
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoPelicula) {
    //si estoy creando un contacto
    //Aqui creare un contacto
    crearPeli();
  } else {
    editarPelicula();
  }
});

cargarPelicula();
