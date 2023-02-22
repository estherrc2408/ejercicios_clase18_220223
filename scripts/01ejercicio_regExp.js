/*
Sobre el ejercicio del forms de validacion de peliculas aniadir:
1. Hacer las validaciones que cambian las propiedades del objValidar con expresiones regulares (titulo, director)
2. Utilizar el metodo date para la validacion del anio
3. Aniadir las peliculas validas al LocalStorage (hacer lo ultimo)
*/
document.addEventListener('DOMContentLoaded', () => {
    const fragment = document.createDocumentFragment();
    const fragment2 = document.createDocumentFragment();
    const select = document.querySelector('#genero');

    const formulario = document.querySelector('#formulario');
    const tituloPeli = document.querySelector('#titulo');
    const directorPeli = document.querySelector('#director');
    const anioPeli = document.querySelector('#anio');

    const listaErrores = document.querySelector('#erroresList');

    const tabla = document.querySelector('#tabla');

    const dateFirstFilm = new Date (1895,12,28);//la primera pelicula de la historia se estreno el 1895/12/28
    //console.log(typeof dateFirstFilm.getFullYear()); devuelve un numero
    let today = new Date();

    /*VARIABLES*/
    //objValidar objeto con valores iniciales en false que ira siendo validado conforme se rellenan los espacios del forms

    const objValidar = {
        titulo: false,
        director: false,
        anio: false,
        genero: true,
    }

    //array objetos Generos
    const arrayGeneros = [

        { valor: 'terror', texto: 'Terror' },
        { valor: 'accion', texto: 'Accion' },
        { valor: 'comedia', texto: 'Comedia' },
        { valor: 'romantica', texto: 'Romantica' }
    ];

    //pelisAlmacen array donde se almaceran las peliculas que haya pasado el proceso de validacion (todos sus parametros en true)
    const pelisAlmacen = [];

    //array regular expresiones
    const regExps = {
        tituloExp: /[a-zÁ-ÿ0-9\W\_]/i,
        directorExp: /[a-zÁ-ÿ]\s*/i,
    } 

    /*EVENTOS*/
    formulario.addEventListener('submit', (ev) => {
        console.log(ev);
        ev.preventDefault();
        validar()
    });


    //Evento que ocurra al mandar el formulario, tipo submit

    /*FUNCIONES*/
    //Pintar opciones para el select
    const pintarGeneros = () => {
        console.log('pintando generos...')
        arrayGeneros.forEach(({ valor, texto }) => {
            const opcion = document.createElement('option');
            opcion.value = valor;
            opcion.innerHTML = `${texto}`;
            fragment.append(opcion);
        })
        select.append(fragment);
    }
    //Validacion del objeto objValidar 
    const validar = () => {
        listaErrores.innerHTML = '';
        let error = '';
        const titulo = tituloPeli.value; //cada cual tomara el valor introducido por el usuario
        const director = directorPeli.value;
        const anio = parseInt(anioPeli.value);
        const genero = select.value;
        console.log('han introducido: ', titulo, director, anio, )

        if (regExps.tituloExp.test(titulo) && titulo.length < 196) {
            objValidar.titulo = true;
        } else {
            objValidar.titulo = false;
            error += `<li>Debes escribir un titulo valido para poder enviar</li>`;
        }

        if (regExps.directorExp.test(director)) {
            objValidar.director = true;
        } else {
            objValidar.director = false;
            error += `<li>Debes escribir el nombre del director o un nombre director valido para poder enviar</li>`;
        }

        if (anio > dateFirstFilm.getFullYear() && anio < today.getFullYear()) {
            objValidar.anio = true;
        } else {
            objValidar.anio = false;
            error += `<li>Debes escribir un año entre 1896 y la fecha actual</li>`;
        }

        const arrayValidar = Object.values(objValidar);//devuelve un array con los valores del objeto
        console.table(arrayValidar);//para ver por consola la tabla con trues y falses
        //.finIndex devuelve el indice del primer elemento que cumpla con la funcion de prueba proporcionada, si no hay ninguno devolvera un -1
        const valida = arrayValidar.findIndex(item => item == false);
        if (valida === -1) {
            //quiere decir que no hay valores con false
            pelisAlmacen.push({
                titulo,
                director,
                anio,
                genero,
            })
            pintarTabla();
//Aqui deberiamos poner la funcion para subir al localStorage el almacen de pelis
            setLocal(pelisAlmacen);
            pelisAlmacen.pop();
            console.log(pelisAlmacen);
        } else {//si no, apareceran los mensajes de error
            console.log(error);
            listaErrores.innerHTML = error;
        }
    }

    //Funcion meter objetos de en la tabla
    const pintarTabla = () => {
        console.log('pintando tabla');
        pelisAlmacen.forEach(({ titulo, director, anio, genero }) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${titulo}</td><td>${director}</td><td>${anio}</td><td>${genero}</td>`;
            fragment2.append(row)
        })
        tabla.append(fragment2);
    }

    //funcion subir peliculas validas al local
    const setLocal = (peli) =>{//subiremos objetos
        localStorage.setItem('pelicula',JSON.stringify(peli));        
    }

    const init = () => {
        pintarGeneros();
    }
    init();
})