export default class crearPelicula {
  #id;
  #titulo;
  #director;
  #anio;
  #genero;
  #imagen;
  #duracion;
  constructor(titulo, director, anio, genero, duracion, imagen) {
    this.#id = crypto.randomUUID();
    this.#titulo = titulo;
    this.#director = director;
    this.#anio = anio;
    this.#genero = genero;
    this.#duracion = duracion;
    this.#imagen = imagen;
  }
  // get de peliculas
  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get director() {
    return this.#director;
  }

  get anio() {
    return this.#anio;
  }

  get genero() {
    return this.#genero;
  }

  get duracion() {
    return this.#duracion;
  }

  get imagen() {
    return this.#imagen;
  }
  //set de peliculas
  set titulo(nuevoTitulo) {
    this.#titulo = nuevoTitulo;
  }

  set director(nuevoDirector) {
    this.#director = nuevoDirector;
  }

  set anio(nuevoAnio) {
    this.#anio = nuevoAnio;
  }

  set genero(nuevoGenero) {
    this.#genero = nuevoGenero;
  }

  set duracion(nuevaDuracion) {
    this.#duracion = nuevaDuracion;
  }
  set imagen(nuevaImagen) {
    this.#imagen = nuevaImagen;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      director: this.#director,
      anio: this.anio,
      genero: this.genero,
      duracion: this.duracion,
      imagen: this.imagen,
    };
  }
}
