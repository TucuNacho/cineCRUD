export default class crearPelicula {
    #id
    #titulo
    #director
    #anio
    #genero
    #duracion
    constructor (titulo, director, anio, genero, duracion){
        this.#id = crypto.randomUUID(); 
        this.#titulo = titulo
        this.#director = director
        this.#anio = anio
        this.#genero = genero
        this.#duracion = duracion
    }
    // get de peliculas
    get id() {
        return this.#id;
    }


    get titulo() {
        return this.#titulo
    }

    get director() {
        return this.#director
    }

    get anio() {
        return this.#anio
    }

    get genero() {
        return this.#genero
    }

    get duracion(){
        return this.#duracion
    }
    //set de peliculas
    set titulo(nuevoTitulo){
        this.#titulo = nuevoTitulo
    }

    set director(nuevoDirector) {
        this.#director= nuevoDirector
    }

    set anio(nuevoAnio) {
        this.#anio = nuevoAnio
    }

    set genero(nuevoGenero) {
        this.#genero= nuevoGenero
    }

    set duracion(nuevaDuracion){
        this.#duracion = nuevaDuracion
    }

    toJSON() {
        return{
            id: this.id,
            titulo: this.titulo,
            director: this.#director,
            anio: this.anio,
            genero: this.genero,
            duracion: this.duracion
        }
    }
}