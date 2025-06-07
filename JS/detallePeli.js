console.log(window.location);

const parametroURL = new URLSearchParams(window.location.search);
const idPelicula = parametroURL.get("id");

const cartelera = JSON.parse(localStorage.getItem("carteleraKey"))

const peliculaBuscada = cartelera.find((pelicula) => pelicula.id === idPelicula)

const card = document.querySelector(".card")

card.innerHTML = `<div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${peliculaBuscada.imagen}"
                  class="img-fluid rounded-start"
                  alt="${peliculaBuscada.titulo}"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Pelicula: ${peliculaBuscada.titulo}
                  </h5>
                  <ul>
                    <li>Genero: ${peliculaBuscada.genero}</li>
                    <li>Duracion: ${peliculaBuscada.duracion}</li>
                    <li>Año<b>:</b> <b>${peliculaBuscada.anio}</b>.</li>
                    <li>Año<b>:</b> <b>${peliculaBuscada.director}</b>.</li>
                  </ul>
                </div>
              </div>
            </div>
`;

