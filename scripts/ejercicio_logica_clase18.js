/*El juego piedra papel o tijera. Genera una opción aleatoria (piedra, papel o tijera)  que compite contra la que elegiste.
09:16
Extra: Crear un contador que cuente: Partidas totales, ganadas y perdidas y se visualicen por el navegador. */
//SELECTORES
const botones = document.querySelector('#botones');
const fragment = document.createDocumentFragment();

//VARIABLES:
//Array OPCIONES POSIBLES (Iguales para el usuario y para la maquina)
const arrayOpciones = [
    {id:'tj', nombre:'tijeras', funcion:sacarTijeras()},
    {id:'ppl', nombre:'papel', funcion:sacarPapel()},
    {id:'pdr', nombre:'piedra', funcion:sacarPiedra()}
]

//Array de respuestas usuario

//Array de respuestas maquina
let=[]

//FUNCIONES:
//PintarBotones
const pintarBotones = ()=>{
    arrayOpciones.forEach(({id,nombre,funcion})=>{
        const elementoLista = document.createElement('li');
        botones.append(elementoLista);
        elementoLista.innerHTML=`<button onclick='${funcion}' id='${id}'>${nombre}</button>`;
    })
}
//funcion respuesta aleatoria, que guardara sus datos en respuesta maquina y se activara cuando el usuario pulse un boton
const generarRandom = (opciones)=>{
    let random = getRandomInt(opciones.length+1);//nos dará 0,1,2 o 3
    let opcionRandom = opciones[random].nombre;
    return opcionRandom;
}
//funciones piedra, papel y tijera
/*const sacarMaquina = (nombreResultado) =>{
    console.log(nombreResultado);
}*/
const sacarPiedra = ()=>{
    let contra = generarRandom(arrayOpciones);
    if (contra == 'tijeras'){
        console.log('La maquina ha sacado '+contra+', ¡Has ganado!');
    }else{
        if (contra == 'papel'){
            console.log('La maquina ha sacado '+contra+', ¡Has perdido');
        }
        else{
            console.log('La maquina ha sacado '+contra+', ¡Empate!');
        }
    }
}
const sacarPapel = ()=>{
    let contra = generarRandom(arrayOpciones);
    if (contra == 'tijeras'){
        console.log('La maquina ha sacado '+contra+', ¡Has perdido!');
    }else{
        if (contra == 'papel'){
            console.log('La maquina ha sacado '+contra+', ¡Empate!');
        }
        else{
            console.log('La maquina ha sacado '+contra+', ¡Has ganados!');
        }
    }
}

const sacarTijera = ()=>{
    let contra = generarRandom(arrayOpciones);
    if (contra == 'tijeras'){
        console.log('La maquina ha sacado '+contra+', ¡Empate!');
    }else{
        if (contra == 'papel'){
            console.log('La maquina ha sacado '+contra+', ¡Has ganado!');
        }
        else{
            console.log('La maquina ha sacado '+contra+', ¡Has perdido!');
        }
    }
}

const  init = () =>{
    pintarBotones();
}
init();