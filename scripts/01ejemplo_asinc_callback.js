const arrayAlumnos = [
    { id: 1, nombre: 'Pepe' },
    { id: 2, nombre: 'Ana' },
    { id: 3, nombre: 'Juan' },
    { id: 4, nombre: 'Pepi' },
    { id: 5, nombre: 'bea' }
];

const arrayNotas = [
    { id: 1, nota: 8 },
    { id: 2, nota: 7 },
    { id: 5, nota: 9 },
];

const arrayBeca = [
    {id:2, beca:true},
    {id:4, beca:false},
]

const id = 2;//Aqui introducimos el id del alumno del que queramos verificar nota y beca
//funcion que compruebba si existe un alumno con este id, primero se resuelve el 
const getAlumno = (id, cb) => {
    const alumno = arrayAlumnos.find((item) => item.id === id)?.nombre//comprueba que el id y por lo tanto el alumno existe
    //? quiere decir que si lo anterior existe , entonces devolverá el nombre del alumno. Si no existe, deja de buscar, da error
    if (!alumno) {//si no existe
        cb(`El alumno con id ${id} no existe`, null);
    } else {
        cb(null, alumno);//
    }
}

//funcion que combrueba si existe una nota asignada al id del alumno introducido
const getNota = (id, cb) => {//damos de argumentos el id y un callback 
    let nota = arrayNotas.find((item) => item.id === id)?.nota;
    if (!nota) {
        cb(`El alumno  no tiene nota`, null);
    } else {
        cb(null, nota);
    }
}

//funcion que comprueba si existe una beca asignada al id del alumno introducido
const getBeca = (id,cb) => {//damos de argumentos el id y el callback 
    let beca = arrayBeca.find((item)=> item.id === id)?.beca;
    if(!beca){
        cb(`El alumno no ha pedido la beca`,null);//mandara a error el alumno no ha pedido beca y alumno como null
    } else {
            cb(null,beca);//manda como null error y beca como true
    }

}


//pasamos el id y la funcion callback encargada de recibir el error o el alumno si esto se ha cargado bien
getAlumno(id, (error, alumno) => {//el id es igual para get alumno, get nota y get beca
    if (error) {
        console.log(error)//para de buscar
    } else {
        console.log(`El alumno es ${alumno}`)
        getNota(id, (error, nota) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`${alumno} tiene una nota de ${nota}`)
                getBeca(id,(error,beca)=>{
                    if (error) {
                        console.log(error);
                    }else{
                        if(beca==true){
                            console.log(`${alumno} es aptx para la beca`)
                        }else{
                            console.log(`${alumno} no es aptx para la beca`)
                        }
                    }
                })
            }
        })
    }
})
