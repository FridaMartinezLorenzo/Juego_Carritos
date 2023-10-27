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
img_car_enemigo.src = "assets/purple_car.png";
var img_car_enemigo2 = new Image();
img_car_enemigo2.src = "assets/pink_car.png";
var img_car_enemigo3 = new Image();
img_car_enemigo3.src = "assets/blue_car.png";
var img_meta = new Image();
img_meta.src = "assets/meta.jpg";

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
var puntaje = 0;

//Variables para carrito enemigo
var dx_carrito_enemigo = 2;
var car_ancho_enemigo = 120;
var car_altura_enemigo = 80;
var cars = [img_car_enemigo,img_car_enemigo2,img_car_enemigo3];

//A lo mas saldrán tres carritos enemigos al mismo tiempo
//Coordenadas iniciales del carrito enemigo
var x_enemigo = 0;
var y_enemigo = 0;
//Coordenadas iniciales del carrito enemigo1 
var x_enemigo1 = 0;
var y_enemigo1 = 0;
//Coordenadas iniciales del carrito enemigo2 
var x_enemigo2 = 0;
var y_enemigo2 = 0;


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
        [{car:1, appear:100,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {car:2, appear:400,  x:canvas.width, y:y_pista+110, bandera_rebaso:0},
         {car:2, appear:700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {car:3, appear:1000, x:canvas.width, y:y_pista+110, bandera_rebaso:0}],
    ],
    [   //segundo nivel (1)
       [{car:2, appear:100,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
        {car:3, appear:400,  x:canvas.width, y:y_pista+110, bandera_rebaso:0},
        {car:1, appear:700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
        {car:3, appear:1000, x:canvas.width, y:y_pista+110, bandera_rebaso:0}],

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
    
var nivel = 0;

//Variable para la aparicion de los carritos
contador  = 0;
contador_carritos = 0;



img.onload = function (){ 
}
img_car_enemigo.onload = function (){ 
}
img_car_enemigo2.onload = function (){
}
img_car_enemigo3.onload = function (){
}
img_meta.onload = function (){
}

img_start.onload = function (){ //carga la imagen y despues ejecuta la funcion 
        cuadro_inicial();
}
document.addEventListener("keydown",detectarTecla);
canvas.addEventListener("click", detectarClick);


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

function detectarClick(event){
    console.log("click");
    var rect = canvas.getBoundingClientRect();
    var x_click = event.clientX - rect.left;
    var y_click = event.clientY - rect.top;

    console.log("x: " + x_click + " y: " + y_click);
    console.log("inicio_x_boton: " + inicio_x_boton + " inicio_y_boton: " + inicio_y_boton);
    console.log("ancho_boton: " + ancho_boton + " alto_boton: " + alto_boton);

    // Verifica si el clic está dentro del botón, INICIA EL JUEGOOOOOO
    if (x_click >= inicio_x_boton &&  x_click <= inicio_x_boton+ancho_boton && y_click >= inicio_y_boton  && y_click <= inicio_y_boton+alto_boton ) {
        var IntervaloJuego = setInterval(draw,intervalo_carrito);
        //setInterval(dibujar_carrito_enemigo,intervalo_carrito_enemigo);
    }
}

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

function draw(){
    draw_escenario();
    dibujar_carrito();
    detectar_rebaso();
    detectar_colision_carrito_enemigo();


    ctx.font="24px Arial"
    ctx.fillStyle="black"
    ctx.fillText("Score:"+puntaje,canvas.width-200,20);

    x += dx;
    dibujar_carritos_enemigos();
    if (x > canvas.width-margen_desaparicion_carrito || x < 0)
    dx = -dx;

    if (y < y_pista || y>y_pista+ancho_pista){ 
        dy = -dy;
    }
    contador += 1;

    if (contador ==1){
        contador_carritos = 0;

        //Contamos el numero de carritos que apareceran en el nivel
        for (j = 0; j < L[nivel].length; j++ ){
            for (i = 0; i < L[nivel][j].length; i++)
            {
               contador_carritos += 1;
            }
        }
        //console.log("contador_carritos: " + contador_carritos);

    }

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

function dibujar_carritos_enemigos(){
    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            c = L[nivel][j][i];
            if(c.car != 0){
                //Evluamos si es el momento en el que debe de aparecer el carrito
                //console.log("contador: " + contador + " appear: " + c.appear);
                if (contador >= c.appear){
                    dibujar_carrito_enemigo(j,i);
                }
            }
        }
    }

}

function dibujar_carrito_enemigo(j,i){
    enemigo = L[nivel][j][i];

    ctx.drawImage(cars[enemigo.car - 1], enemigo.x, enemigo.y, car_ancho_enemigo, car_altura_enemigo);
    // Actualiza la posición del carrito enemigo
    enemigo.x -= dx_carrito_enemigo;
}

function detectar_colision_carrito_enemigo(){
    var direccionColision = "";
    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            var c = L[nivel][j][i];
            if (c.x + car_ancho_enemigo > 0){ //Se encuentra en pantalla
                if(x < c.x + car_ancho && x + car_ancho > c.x &&
                    y < c.y + car_altura && y + car_altura > c.y){

                         // Determina la dirección de la colisión
                            if (y < c.y+car_altura && x < c.x+car_ancho) {
                                direccionColision = "abajo";
                            }
                            if (y+car_altura > c.y && x+car_ancho < c.x) {
                                direccionColision = "arriba";
                            }
                       
                        // Realiza el ajuste de coordenadas para el rebote
                        if (direccionColision == "arriba") {
                            if (c.y >= y_pista + (ancho_pista/2) ) {
                                //Si se encuentra por debajo de la mitad de la pista
                                 y = c.y - car_altura;
                            }
                            else {
                                y = c.y + car_altura;
                            }
                            x = c.x - car_ancho;
                        } else if (direccionColision == "abajo") {
                            if (c.y >= y_pista + (ancho_pista/2) ){
                                //Si se encuentra por debajo de la mitad de la pista
                                y = c.y - car_altura;
                            } 
                            else{
                                y = c.y + car_altura;
                            } 
                            x = c.x - car_ancho;
                        } 
                           
                }
            }

        }
    }

}

function detectar_rebaso(){
    var total = 1;
    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            var c = L[nivel][j][i];
            total *=c.bandera_rebaso;
            if (x > c.x +car_ancho && c.bandera_rebaso == 0){ //Se encuentra en una posicion adelante del carro enemigo
                puntaje  += c.car * 10;
                c.bandera_rebaso = 1;
                console.log("puntaje: " + puntaje);
            }

        }
    }


    

    if (total == 1){  //Se hace el cambio de nivel
         dibujar_meta();
     }          

}

function dibujar_meta(){
            if (x > canvas.width-300){
                ctx.drawImage(img_meta,canvas.width-200, y_pista,100,210);
                dibujar_carrito();

                ctx.font="30px Times new roman"
                ctx.fillStyle="dark blue"
                ctx.fillText("Felicidades, \n pasaste el nivel: "+(nivel+1),canvas.width/2-100,150);

                //clearInterval(IntervaloJuego);
                nivel+=1;
                intervalo_carrito -= 2;
                contador = 0;
            }

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


