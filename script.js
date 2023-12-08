const $tiempo=document.querySelector('.tiempo'),
$fecha= document.querySelector('.fecha'),
lista = document.querySelector('#lista'),
input = document.querySelector('#agregar-ejercicio'),
botonEnter = document.querySelector('#botonEnter'),
check = "fa-check-circle",
uncheck = "fa-circle",
lineThrough = "line-through";

let id
let LIST


/*reloj*/

function relojDigital(){
    let f=new Date(),
    dia= f.getDate(),
    mes= f.getMonth()+1,
    anio= f.getFullYear(),
    diaSemana=f.getDay();

    dia= ('0'+dia).slice(-2);
    mes=('0'+mes).slice(-2)

    let timeString= f.toLocaleTimeString();
    $tiempo.innerHTML=timeString;

    let semana=['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
    let showSemana= (semana[diaSemana])
    $fecha.innerHTML = `${showSemana} ${dia}-${mes}-${anio}`
}


/**agregar tareas */

function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado){return}
    
    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ""

    const elemento =`<li id= "elemento" >
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea} </p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value=''
        id++
    }
    
})

document.addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        const tarea= input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value=''
        id++
    }
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === "realizado"){
        tareaRealizada(element)
        localStorage.setItem('TODO', JSON.stringify(LIST))
    }else if (elementData === "eliminado"){
        tareaEliminada(element)
        localStorage.setItem('TODO', JSON.stringify(LIST))
    }

})


setInterval(() =>{
    relojDigital()
},1000);

//obener datos del local storage

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}