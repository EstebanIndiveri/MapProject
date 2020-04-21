const interfaz=new UI();

const apis=new API();

// apis.obtenerDatos().then(datos=>{console.log(datos)});

document.addEventListener('DOMContentLoaded',()=>{
    interfaz.mostrarEstablecimientos();
})

//busqueda input
const buscador=document.querySelector('#buscar input');
buscador.addEventListener('input',()=>{
    if(buscador.value.length>5){
        //search:
        interfaz.obtenerSugerencias(buscador.value);
    }else{
        interfaz.mostrarEstablecimientos();
    }
})