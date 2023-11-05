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

var img_optimizado = new Image();
img_optimizado.src = "assets/red_car.png";

var img_respaldo = new Image();
img_respaldo.src = "assets/yellow_car.png";
var img_car_enemigo = new Image();
img_car_enemigo.src = "assets/purple_car.png";
var img_car_enemigo2 = new Image();
img_car_enemigo2.src = "assets/pink_car.png";
var img_car_enemigo3 = new Image();
img_car_enemigo3.src = "assets/blue_car.png";
var img_meta = new Image();
img_meta.src = "assets/meta.jpg";

//Añadimos las variables de la moneda que será el multiplicador del score
var img_moneda = new Image();
img_moneda.src = "assets/estrellas.png";
var pelotaRadio = 20;
var indice = 0;
let M = 
    [
        [5,5,40,38,40,38], 
        [44,5,40,38,40,38],
        [80,5,33,38,33,38],
        [5,50,40,38,33,38],
        [34,50,40,38,40,38],
        [73,50,40,38,40,38],
    ]


var x = 0; //Aqui es donde va a empezar
var y = y_pista+110;

var dx = 2;
var dy = 2;

var pasos = 10;

//Variables para el tiempo
var tiempo1 = 0;
var tiempo2 = 0;
var tiempo_resultante = 0;
var tiempo_esperado= 50; //Segundos

//Variables para el carrito
car_ancho = 150;
car_altura = 100;
margen_desaparicion_carrito = 140;
intervalo_carrito = 30;
contador_carrito_optimizado = 0;
limite_contador_carrito_optimizado = 1600;

var bandera_cambio_color = 0; //La bandera nos ayudará a determinar cuando apagar/encender el cambio de color
var bandera_fallo_nivel = 0;

var contador = 0;
var puntaje = 0;

//Variables para carrito enemigo
var dx_carrito_enemigo = 2;
var car_ancho_enemigo = 120;
var car_altura_enemigo = 80;

//Arreglo de las imagenes que saldrán en el juego
var objetos = [img_car_enemigo,img_car_enemigo2,img_car_enemigo3,img_moneda];

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
        [{objetos:1, appear:100,  x:canvas.width, y:y_pista+10   , bandera_rebaso:0},
         {objetos:4, appear:400,  x:canvas.width, y:y_pista+110+30  , bandera_rebaso:0},
         {objetos:2, appear:700,  x:canvas.width, y:y_pista+10   , bandera_rebaso:0},
         {objetos:3, appear:1000, x:canvas.width, y:y_pista+110  , bandera_rebaso:0}],
    ],
    [   //segundo nivel (1)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+10   , bandera_rebaso:0},
         {objetos:3, appear:350,  x:canvas.width, y:y_pista+110  , bandera_rebaso:0},
         {objetos:1, appear:750,  x:canvas.width, y:y_pista+10   , bandera_rebaso:0},
         {objetos:3, appear:950,  x:canvas.width, y:y_pista+110  , bandera_rebaso:0}],

        [{objetos:1, appear:1250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:1775,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:2000,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:2350,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //tercer nivel (2)
        [{objetos:3, appear: 50,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:2, appear:350,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:550,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0}],

        [{objetos:2, appear:750,   x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:2, appear:950,   x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:3, appear:1200,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:1, appear:1400,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:2, appear:1650,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:2, appear:1800,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:3, appear:2000,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:1, appear:2200,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
        ],
    [   //cuarto nivel (3)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:3, appear:550,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:950,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0}],

        [{objetos:3, appear:1250,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1605,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:1800,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:2000,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:2, appear:2200,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:1, appear:2400,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:2600,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:3, appear:2900,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0}],
    ],
    [   //quinto nivel (4)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:4, appear:350,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:550,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0}],

        [{objetos:3, appear:850,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:4, appear:1000,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1150,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:1300,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:2, appear:1500,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1700,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1900,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //sexto nivel (5)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:4, appear:350,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:550,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0}],

        [{objetos:3, appear:850,   x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1000,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:1150,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:1300,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:2, appear:1500,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1700,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1900,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //septimo nivel (6)
        [{objetos:1, appear: 50,  x:canvas.width, y:y_pista+210  , bandera_rebaso:0},
         {objetos:3, appear:250,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:4, appear:450,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:2, appear:450,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0}],

        [{objetos:2, appear:450,   x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:800,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0},
         {objetos:1, appear:900,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:2, appear:950,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],

        [{objetos:1, appear:1200,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1200,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:3, appear:1500,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1700,  x:canvas.width, y:y_pista+310 , bandera_rebaso:0}],

        [{objetos:2, appear:1700,  x:canvas.width, y:y_pista+310 , bandera_rebaso:0},
         {objetos:3, appear:1700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1900,  x:canvas.width, y:y_pista+310+30 , bandera_rebaso:0},
         {objetos:3, appear:1900,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:2, appear:1900,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:2100,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:3, appear:2100,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:3, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //octavo nivel (7)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:1, appear:250,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:450,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:3, appear:450,  x:canvas.width, y:y_pista+210  , bandera_rebaso:0}],

        [{objetos:1, appear:450,   x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:800,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:3, appear:900,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:950,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],

        [{objetos:3, appear:1200,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:1200,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1500,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1700,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],

        [{objetos:2, appear:1700,  x:canvas.width, y:y_pista+310 , bandera_rebaso:0},
         {objetos:3, appear:1700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1900,  x:canvas.width, y:y_pista+310+30 , bandera_rebaso:0},
         {objetos:3, appear:1900,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:3, appear:1900,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:2100,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:2, appear:2100,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:1, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //noveno nivel (7)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:1, appear:250,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:450,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:3, appear:450,  x:canvas.width, y:y_pista+210  , bandera_rebaso:0}],
        
        [{objetos:1, appear:450,   x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:800,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:3, appear:900,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:950,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],
        
        [{objetos:3, appear:1200,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:1200,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1500,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1700,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],
        
        [{objetos:2, appear:1700,  x:canvas.width, y:y_pista+310 , bandera_rebaso:0},
         {objetos:3, appear:1700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1900,  x:canvas.width, y:y_pista+310+30 , bandera_rebaso:0},
         {objetos:3, appear:1900,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
        
        [{objetos:3, appear:1900,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:2100,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:2, appear:2100,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:1, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ],
    [   //decimo nivel (7)
        [{objetos:2, appear: 50,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:1, appear:250,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:450,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:3, appear:450,  x:canvas.width, y:y_pista+210  , bandera_rebaso:0}],

        [{objetos:1, appear:450,   x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:800,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:3, appear:900,  x:canvas.width, y:y_pista+310  , bandera_rebaso:0},
         {objetos:3, appear:950,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],

        [{objetos:3, appear:1200,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0},
         {objetos:4, appear:1200,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:1, appear:1500,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:2, appear:1700,  x:canvas.width, y:y_pista+210 , bandera_rebaso:0}],

        [{objetos:2, appear:1700,  x:canvas.width, y:y_pista+310 , bandera_rebaso:0},
         {objetos:3, appear:1700,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:1900,  x:canvas.width, y:y_pista+310+30 , bandera_rebaso:0},
         {objetos:3, appear:1900,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],

        [{objetos:3, appear:1900,  x:canvas.width, y:y_pista+10 , bandera_rebaso:0},
         {objetos:4, appear:2100,  x:canvas.width, y:y_pista+110+30 , bandera_rebaso:0},
         {objetos:2, appear:2100,  x:canvas.width, y:y_pista+10  , bandera_rebaso:0},
         {objetos:1, appear:2100,  x:canvas.width, y:y_pista+110 , bandera_rebaso:0}],
    ]
    
]
    
var nivel = 8;

//Variable para la aparicion de los carritos
contador  = 0;


img.onload = function (){ 
}
img_optimizado.onload = function(){
}
img_respaldo.onload = function(){
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

function cuadro_cambio_nivel(){
    x=0;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#FF69B4";
    ctx.fillRect(canvas.width/2-200,canvas.height/2-100,400,200);
    
    ctx.fillStyle = "#FF97D9";
    ctx.fillRect(canvas.width/2-210,canvas.height/2-106,400,200);

    ctx.font="50px Times new roman"
    ctx.fillStyle="#BF398C"
    ctx.fillText("NIVEL: "+(nivel+1),canvas.width/2-100,150);
    ctx.fillText("________",canvas.width/2-100,150);

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
    //console.log("click");
    var rect = canvas.getBoundingClientRect();
    var x_click = event.clientX - rect.left;
    var y_click = event.clientY - rect.top;

    // Verifica si el clic está dentro del botón, INICIA EL JUEGOOOOOO
    if (x_click >= inicio_x_boton &&  x_click <= inicio_x_boton+ancho_boton && y_click >= inicio_y_boton  && y_click <= inicio_y_boton+alto_boton ) {
            contador = 0;
            IntervaloJuego = setInterval(draw,intervalo_carrito);
        //setInterval(dibujar_objetos,intervalo_carrito_enemigo);
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

    if (e.keyCode == 32){
       if (bandera_fallo_nivel == 1){
           nivel-=1;
           intervalo_carrito += 2;
           limite_contador_carrito_optimizado -=200;
       }
       else{
           nivel+=1;
           intervalo_carrito -= 2;
           limite_contador_carrito_optimizado +=200;
       }
       cuadro_cambio_nivel();
       canvas.addEventListener("click", detectarClick);
    }

    if (y <= y_pista)
        y = y_pista;

    if (nivel  >=6 ){
        if (y >= ancho_pista-100)
            y = ancho_pista-100;
    }else{
        if (y >= ancho_pista)
            y = ancho_pista;
    }


    if (x <= 0)
        x = 0;

    if (x >= canvas.width-margen_desaparicion_carrito)
        x = canvas.width-margen_desaparicion_carrito;
}

function draw(){
    draw_escenario();
    dibujar_carrito();
    detectar_rebaso();
    detectar_colision_objeto();


    ctx.font="24px Arial"
    ctx.fillStyle="black"
    ctx.fillText("Nivel:"+(nivel+1)+"     Score:"+puntaje,canvas.width-400,20);

    //ctx.fillText("Nivel:"+(nivel+1),canvas.width-300,20);

    x -= dx; //Siempre hacia atrás para que se simule el movimiento de que la pista se mueve
    dibujar_carritos_enemigos();

    if (x < 0)
        x = 0;

    if (y < y_pista || y>y_pista+ancho_pista){ //Evaluamos que no se salga de Y
        dy = -dy;
    }
    contador += 1; //Contador de apariciones (Nos ayuda a saber en que numero de repeticion se mostrará el carrito)

    if ( (nivel == 8 | nivel == 9) && contador == 1){
        tiempo1 = Date.now();
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
            if(c.objetos != 0){
                //Evluamos si es el momento en el que debe de aparecer el carrito
                if (contador >= c.appear){
                    dibujar_objetos(j,i);
                }
            }
        }
    }

}

function dibujar_objetos(j,i){
    obj = L[nivel][j][i];

    if (bandera_cambio_color == 1){//Contador de la duración el cambio de color
        contador_carrito_optimizado+=1; //  Sumamos el conta
    } 
    
    //Cuando volver al carrito normal del juego (el amarilllo)
    if (contador_carrito_optimizado == limite_contador_carrito_optimizado){
        console.log("Detecto el limite");
        img = img_respaldo;
        car_ancho = 150;
        car_altura = 100;
        bandera_cambio_color = 0;
        contador_carrito_optimizado = 0;
    }

    if (obj.objetos == -2) //Se tomó el -2 porque el -1 nos ayuda en el proceso de verificacion de que se han superado los carrito
        return;
    if(obj.objetos == 4) //La moneda aún no ha sido tomada por el jugador
        dibujaMoneda(obj);
    else
        ctx.drawImage(objetos[obj.objetos - 1], obj.x, obj.y, car_ancho_enemigo, car_altura_enemigo);

    obj.x -= dx_carrito_enemigo;// Actualiza la posición del objeto
}

function detectar_colision_objeto(){
    var direccionColision = "";
    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            var c = L[nivel][j][i];
            
            
            if (c.x + (pelotaRadio*2) > 0 && c.x < canvas.width && c.objetos == 4){ //Evaluamos que la moneda este en pantalla
                
                //console.log(L[nivel]);
                if( x < c.x+(pelotaRadio*2) && x+car_ancho > c.x && y < c.y+(pelotaRadio*2) && y+car_altura>c.y){
                    console.log("colisiono la moneda");
                    puntaje*=3; //Triplica puntaje
                    c.objetos = -2;
                    img = img_optimizado;
                    car_ancho = car_ancho_enemigo; //Se cambian las medidas 
                    car_altura = car_altura_enemigo;
                    bandera_cambio_color = 1
                }
            }

            if (c.x + car_ancho_enemigo > 0 && c.objetos != 4 && c.objetos != -2){ //Se encuentra en pantalla
                if(x < c.x + car_ancho_enemigo && x + car_ancho > c.x &&
                    y < c.y + car_altura_enemigo-10 && y + car_altura-10 > c.y){

                         // Determina la dirección de la colisión
                            if (y < c.y+car_altura_enemigo-10 && x < c.x+car_ancho_enemigo) {
                                direccionColision = "abajo";
                            }
                            if (y+car_altura-10 > c.y && x+car_ancho < c.x) {
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
                            if(puntaje > 0){
                                puntaje -= 5;
                            }
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
            if (c.objetos != 4 && c.objetos != -2) //Permite que no se cuenten las monedas
                total *=c.bandera_rebaso;
                if (x > c.x +car_ancho && c.bandera_rebaso == 0){ //Se encuentra en una posicion adelante del carro enemigo
                    puntaje  += c.objetos * 10;
                    c.bandera_rebaso = 1;
                }

        }
    }


    

    if (total == 1){  //Se hace el cambio de nivel
        //console.log("Cambio de nivel");
         dibujar_meta();
     }          

}

function dibujar_meta(){
    ctx.drawImage(img_meta,canvas.width-100, y_pista,100,ancho_pista);
    if (x > canvas.width-200){
                dibujar_carrito();

                clearInterval(IntervaloJuego);
                
                if (nivel == 8 | nivel == 9){
                    tiempo2 = Date.now();
                    tiempo_resultante = tiempo2 - tiempo1;
                    tiempo_resultante = Math.floor(tiempo_resultante/1000);
                    console.log(tiempo_resultante);
                }
                
                ctx.font="30px Times new roman"


                if ((nivel == 8 | nivel == 9) && (tiempo_resultante > tiempo_esperado)){
                    bandera_fallo_nivel = 1;
                    ctx.fillText("Perdiste el nivel "+(nivel+1),canvas.width/2-100,80);
                }else
                    ctx.fillText("Felicidades, \n pasaste el nivel: "+(nivel+1),canvas.width/2-100,80);
                
                document.addEventListener("keydown",detectarTecla);
            }

}


function dibujar_pista(){
    ctx.fillStyle = "#BBB5B1";
    
    if (nivel == 5 && contador == 1)
        ancho_pista +=100
    
    if (nivel == 8 && contador == 1){
        ancho_pista +=200;
        console.log(ancho_pista);
        y_pista = 0;
    }

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

function dibujaMoneda(c){
    //dibuja la estrella con efecto
    ctx.drawImage(img_moneda,M[indice][0],M[indice][1],M[indice][2],M[indice][3],c.x,c.y, M[indice][4]/2,M[indice][5]/2);
    indice = (indice+1) % 6;

}
