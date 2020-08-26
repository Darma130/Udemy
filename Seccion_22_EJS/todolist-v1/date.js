//jshint esversion:6

//NO OLVIDAR QUE MODULE ES UN OBJETO Y EN ESTE CASO ES DATE ES UN OBEJTO CON DOS METODOS QUE SE EXPORTAN CON EXPORTS

exports.getDate = function() { //con esto indicamos que de este archivo vamos a exportar la funcion getDate()

    const today = new Date(); //obtenemos la fecha actual
    
    const options = { //se recomienda siempre usar el tipo de variable let y en consola usar el tipo de variable var
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options); //convertimos la fecha legible;
}

exports.getDay = function() {

    const today = new Date(); //obtenemos la fecha actual
    
    const options = { //se recomienda siempre usar el tipo de variable let y en consola usar el tipo de variable var
        weekday: "long",
    };

    return today.toLocaleDateString("en-US", options); //convertimos la fecha legible;
}
