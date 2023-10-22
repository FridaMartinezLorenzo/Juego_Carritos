// Aquí puedes agregar JavaScript para interactuar con el canvas
var canvas = document.getElementById("area_juego");
var ctx = canvas.getContext("2d");

// Dibujamos la pista
var ancho_pista = 210; // Ancho de la pista, se añaden los 10 por la linea divisoria que vamos a dibujar
var y_pista = 100;

var img = new Image();
img.src = "yellow_car.png";

var x = 0; //Aqui es donde va a empezar
var y = y_pista+110;

var dx = 2;
var dy = 2;

//Variables para el carrito
car_ancho = 150;
car_altura = 100;
margen_desaparicion_carrito = 140;
//var nivel = 1;
//Trabajamos en la animación de la pistas


//for ( nivel = 1; nivel<=2 ;nivel++){
//    dibujar_pista();
//    ancho_pista += 60;
//}


img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
    setInterval(draw,10);
}

function draw(){
    dibujar_pista();
    dibujar_carrito();
    x += dx;
    if (x > canvas.width-margen_desaparicion_carrito || x < 0)
        dx = (-1)*dx;
}

function dibujar_carrito(){
    ctx.drawImage(img, x, y, car_ancho, car_altura);
}

function dibujar_pista(){
    ctx.fillStyle = "#BBB5B1";
    ctx.fillRect(0,y_pista, canvas.width, ancho_pista );
    
    dibujar_divisiones();
}

function dibujar_divisiones(){
    ctx.fillStyle = "#FFFFFF";

    for (i=0; i< Math.floor(ancho_pista/50); i++){
        y_divisiones = y_pista + (i*100);
        ctx.fillRect(0,y_divisiones, canvas.width, 10 );
    }
}