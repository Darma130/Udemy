//$("h1").text("Bye"); 

//$("button").html("<em>Hey</em>"); cambia texto en html

//$("button").text("Don't click me"); cambia texto plano de elemento a todos los elementos "button"

//console.log($("img").attr("src")); //asi se obtiene un atributo del elemento, en este caso "img" y se obtiene el atributo 
//"src" que se muestra en consola

//$("a").attr("href", "https://www.yahoo.com"); //cambiamos el atributo "href" y le colocamos el link como segundo
//parametro de la funcion .attr

/*$("h1").click(function() {
    $("h1").css("color","purple");
});*/ //cuando ocurra el evento "click" con el mouse sobre el elemento "h1" se cambia el color de dicho elemento a purpura

//version de codigo sin jQuery
/*for(var i=0; i<5; i++) {
    document.querySelectorAll("Button")[i].addEventListener("click", function() {
        document.querySelector("h1").style.color = "purple";
    }) 
}*/ 

//version de codigo con jQuery
/*$("button").click(function() {
    $("h1").css("color", "purple");
});*/

/*$("input").keydown(function(event) {
    console.log(event.key);
}); //este evento imprime en consola la letra o la tecla que se oprima con el teclado cuando esto ocurra

$(document).keydown(function(event) {
    $("h1").text(event.key);

});

$("h1").on("mouseover", function() {
    $("h1").css("color", "purple");
}); //Este evento permite cambiar el color del elemento "h1" a purpura cuando el mouse pase por encima del mismo */

$("button").on("click", function() {
    $("h1").slideToggle();
}); //Este evento hace que el elmento "h1" desaparezca o aparezca con efecto progresivo dependiendo del estado en que
//se encuentre el elemento, si esta invisible, se hace visible y viceversa


