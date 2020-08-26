//SECCION QUE DETECTA EL BOTON DE LA PANTALLA CLICKEADO

var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for(var i=0; i<numberOfDrumButtons; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    
        //this.style.color = "white"; //con "this" accedemos a al elemento que en ese momento nos genero el evento "click"
        //y simplemente con esta palabra podemos hacer cambios al mismo, como en este caso es cambiar el color del texto a 
        //blanco

        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML);
        
    });
}

//SECCION QUE DETECTA LA TECLA DEL TECLADO OPRIMIDA

document.addEventListener("keydown", function(event) {
    
    makeSound(event.key);

    buttonAnimation(event.key);

});

//FUNCION QUE EJECUTA LA ORDEN DE EMITIR EL SONIDO

function makeSound(key) {

    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3"); //Con esta linea de codigo insertamos un sonido, que se emite
            //al dar click, esta es la forma de crear un objeto tipo audio cuyo nombre es "audio"
            tom1.play(); //Esta es la orden para generar el sonido del archivo de audio insertado
            break;
        
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3"); 
            tom2.play();
            break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3"); 
            tom3.play();
            break;

        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3"); 
            tom4.play();
            break;

        case "j":
            var snare = new Audio("sounds/snare.mp3"); 
            snare.play();
            break;
        
        case "k":
            var crash = new Audio("sounds/crash.mp3"); 
            crash.play();
            break;
        
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3"); 
            kick.play();
        break;
    
        default:
            console.log(key);
            break;
    }

}

function buttonAnimation(currentKey) {

    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100); /*La funcion setTimeout se utiliza para ejecutar una accion y que esta se ejecute transcurrido un tiempo
    determinado en milisegundos (en este caso 100 ms)*/

}

/*function handleCLik(){
    alert("I got clicked!");
}*/
