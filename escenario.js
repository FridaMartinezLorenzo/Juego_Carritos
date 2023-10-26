// Aquí puedes agregar JavaScript para interactuar con el canvas
var canvas = document.getElementById("area_juego");
var ctx = canvas.getContext("2d");

// Dibujamos la pista
var ancho_pista = 210; // Ancho de la pista, se añaden los 10 por la linea divisoria que vamos a dibujar
var y_pista = 100;

var img = new Image();
img.src = "assets/yellow_car.png";
var img_start = new Image();
img_start.src = "assets/frente_yellow_car.png";

var img_car_enemigo = new Image();
img_car_enemigo.src = "assets/pink_car.png";

var x = 0; //Aqui es donde va a empezar
var y = y_pista+110;

var dx = 2;
var dy = 2;

var pasos = 10;

//Variables para el carrito
car_ancho = 150;
car_altura = 100;
margen_desaparicion_carrito = 140;
intervalo_carrito = 30;

var contador = 0;

//Variables para carrito enemigo
var x_enemigo = canvas.width;
var y_enemigo = y_pista + 10;
var intervalo_carrito_enemigo = 40;
var dx_carrito_enemigo = 2;
car_ancho_enemigo = 120;
car_altura_enemigo = 80;

//Variables del boton
inicio_x_boton = canvas.width/2-100;
inicio_y_boton = canvas.height/2;
ancho_boton = 200;
alto_boton = 50;


//Creamos una matriz donde almacenaremos la información de los niveles
//Cada nivel es una matriz, cada elemento de la matriz es un objeto que contiene:
//El carrito o premio que se va a dibujar, en que punto se va a dibujar (con respecto al contador) y su ubicacion x, y
let L = [
    [   //primer nivel (0)
        [{e:0},{e:0},{e:0},{e:0},{e:0},{e:2},{e:0},{e:0},{e:0}],
    ],
    [   //segundo nivel (1)
        [{e:2},{e:3},{e:0},{e:1},{e:1},{e:3},{e:2},{e:0},{e:2}], 
        [{e:3},{e:1},{e:2},{e:0},{e:3},{e:0},{e:1},{e:2},{e:3}],
        [{e:2},{e:0},{e:1},{e:1},{e:2},{e:2},{e:0},{e:3},{e:3}],
    ],
    [   //tercer nivel (2)
        [{e:2},{e:3},{e:0},{e:1},{e:1},{e:3},{e:2},{e:0},{e:2}], 
        [{e:3},{e:1},{e:2},{e:0},{e:3},{e:0},{e:1},{e:2},{e:3}],
        [{e:2},{e:0},{e:1},{e:1},{e:2},{e:2},{e:0},{e:3},{e:3}],
        [{e:3},{e:0},{e:0},{e:3},{e:2},{e:2},{e:0},{e:2},{e:3}],
    ]
    ]
    


//var nivel = 1;
//Trabajamos en la animación de la pistas


//for ( nivel = 1; nivel<=2 ;nivel++){
//    dibujar_pista();
//    ancho_pista += 60;
//}


img.onload = function (){ 

}

img_start.onload = function (){ //carga la imagen y despues ejecuta la funcion 
        cuadro_inicial();
    // setInterval(draw,50);
}
document.addEventListener("keydown",detectarTecla);
canvas.addEventListener("click", function(event) {
    console.log("click");
    var rect = canvas.getBoundingClientRect();
    var x_click = event.clientX - rect.left;
    var y_click = event.clientY - rect.top;

    console.log("x: " + x_click + " y: " + y_click);
    console.log("inicio_x_boton: " + inicio_x_boton + " inicio_y_boton: " + inicio_y_boton);
    console.log("ancho_boton: " + ancho_boton + " alto_boton: " + alto_boton);

    // Verifica si el clic está dentro del botón, INICIA EL JUEGOOOOOO
    if (x_click >= inicio_x_boton &&  x_click <= inicio_x_boton+ancho_boton && y_click >= inicio_y_boton  && y_click <= inicio_y_boton+alto_boton ) {
        setInterval(draw,intervalo_carrito);
        //setInterval(dibujar_carrito_enemigo,intervalo_carrito_enemigo);
    }
});

function detectarTecla(e){
    if (e.keyCode == 39){
        //console.log("Avanzando a derecha")
        x +=  pasos;
    }

    if (e.keyCode == 37){
        //console.log("Avanzando a izquierda")
        x -= pasos;
    }

    if (e.keyCode == 40){
        //console.log("Avanzando hacia abajo")
        y += pasos;
    }
    
    if (e.keyCode == 38){
        //console.log("Avanzando hacia arriba")
        y -= pasos;
    }

    if (y <= y_pista)
        y = y_pista;
    if (y >= ancho_pista)
        y = ancho_pista;

    if (x <= 0)
        x = 0;

    if (x >= canvas.width-margen_desaparicion_carrito)
        x = canvas.width-margen_desaparicion_carrito;
}

function cuadro_inicial(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#FF69B4";
    ctx.fillRect(canvas.width/2-200,canvas.height/2-100,400,200);
    
    ctx.fillStyle = "#FF97D9";
    ctx.fillRect(canvas.width/2-210,canvas.height/2-106,400,200);

    ctx.drawImage(img_start, canvas.width/2-150,10, 300, 200);

    //Dibujamos el boton
    ctx.fillStyle = "#FF69B4";
    ctx.fillRect(inicio_x_boton,inicio_y_boton,200,50);

    // Configura el estilo del texto
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "white";

    // Centra el texto en el botón
    var buttonText = "START";
    var textWidth = ctx.measureText(buttonText).width;
    var xText = (canvas.width / 2) - (textWidth / 2);
    var yText = (canvas.height / 2 + 20) + 10;

    // Dibuja el texto en el botón
    ctx.fillText(buttonText, xText, yText);

}

function draw(){
    draw_escenario();
    dibujar_carrito();
    x += dx;
    if (x > canvas.width-margen_desaparicion_carrito || x < 0)
        dx = (-1)*dx;

    contador += 1;
    if (contador > 20)
        dibujar_carrito_enemigo();
}


function draw_escenario(){
     //Rosa y morado #EE97E5
     ctx.fillStyle = "#FF97D9";
     ctx.fillRect(0,0,canvas.width,canvas.height);
     dibujar_pista();
}

function dibujar_carrito(){
    ctx.drawImage(img, x, y, car_ancho, car_altura);
}

function dibujar_carrito_enemigo(){
    ctx.drawImage(img_car_enemigo, x_enemigo, y_enemigo, car_ancho_enemigo, car_altura_enemigo);
    x_enemigo -= dx_carrito_enemigo;
    //if (x_enemigo < canvas.width/2)
    //    dx_carrito_enemigo = (-1)*dx_carrito_enemigo;
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