function sliderJatrex(){

	/*
	* SliderJatrex(c)
	* Author: JamesTovar
	* E-mail: jamestovar09@hotmail.com
	* Septiembre 2018

	********************************************
	Usa JQUERY
	HTML Y CSS AL FINAL DEL CODIGO
	********************************************
	*/

	//  Configuración de Slider-----------------------

	/*   Imagens   */
	//Se recomienda un minimo de 3 imagenes y maximo 9
	var imagenes = new Array(
		"images/image.jpg",
		"images/image2.jpg",
		"images/image3.jpg",
		"images/image4.jpg",
		"images/image5.jpg",
		"images/image6.jpg",
		"images/image7.jpg",
		"images/image8.jpg",
		"images/image9.jpg"
	);

	/*   Tamaño   */
	//Alto respecto al tamaño de la pantalla
	var alto= 70; //ALTO DE SLIDER
	var tipoAltura = true; //TRUE(Alto en porcentaje)-FALSE(Alto en pixeles)

	/*   Tiempo   */
	var tiempo = 6000; //Tiempo para cambio en milisegundos
	var tiempo2 = 2000; //Duración de transicion en milisegundos

	/*   Direccion   */
	var direccion = true; //TRUE(Derecha)-FALSE(Izquierda)

	/*   Autoplay  */
	var autoplay = true;

	/*   Empieza en */
	var ubicacion = 1; //De 1 a numero de imagens

	/*   Objeto Slider del html  */
	var contenedorPrincipal = $("#contenedorSlider");
	var contenedorImagens = $("#contImages");

	/*   Secciones  */
	var secciones = $('.seccion');

	//Aplicando Configuración----------------------
	//Ajustar a pantalla
	$(window).resize(function(){ajustar()});
	function ajustar(){
		altura = (tipoAltura)? Math.ceil(((alto*window.innerHeight)/100)): alto;
		contenedorPrincipal.css("height",altura+"px");
	};
	ajustar();
	
	//CrearImagenes y ajustar html
	for (var i = 0; i <= imagenes.length - 1; i++) {
		$("<div class='imgSlider' style='background-image: url("+imagenes[i]+");'></div>").appendTo(contenedorImagens);
		$("<li><button id='selecNum"+(i+1)+"' class='selecsNum' value='"+(i+1)+"'></button></li>").appendTo("#numOptions");
		$("#selecNum"+ubicacion).addClass("selecNum");
	}
	var divImages = $(".imgSlider");
	contenedorImagens.css("width",(imagenes.length*100)+"%");
	$(".imgSlider:last").insertBefore(".imgSlider:first");
	contenedorImagens.css("margin-left","-"+100+"%" );
	//Mostrar Primera Seccion
	if(secciones.length > 1){
		$("#seccion-con-imagen-"+ubicacion).css("display","block");
		$("#seccionesAlinear").fadeIn(tiempo/4);
	}else{
		secciones.css("display","block");
		$("#seccionesAlinear").fadeIn(tiempo/4);
	}

	correr = function(estado){
		if(estado){
			bucle = setInterval(function(){
				(direccion)? derecha(tiempo2) : izquierda(tiempo2);
	    	}, tiempo);
		}else{
			clearInterval(bucle);
		}
	}

	cambiaUbicacion = function(num){
		correr(false);
		while(num!=ubicacion){
			(direccion)? derecha(0) : izquierda(0);
		}
		correr(true);
	}

	derecha = function(timeSL){
		(ubicacion==imagenes.length) ? ubicacion=1 : ubicacion++;
		contenedorImagens.animate({
			marginLeft:"-"+200+"%"
		}, timeSL , function(){
			$(".imgSlider:first").insertAfter(".imgSlider:last");
				     contenedorImagens.css("margin-left", "-"+100+"%");
		});

		// Cambiar seccion y control
		cambiaSeccion();
	}

	izquierda = function(timeSL){
		(ubicacion==1) ? ubicacion=imagenes.length : ubicacion--;
		contenedorImagens.animate({
		    marginLeft:0
		} ,timeSL, function(){
		    $(".imgSlider:last").insertBefore(".imgSlider:first");
		    contenedorImagens.css("margin-left","-"+100+"%");
		});

		// Cambiar seccion y control
		cambiaSeccion();
	}

	cambiaSeccion = function(){
		// Cambiar seccion
		if(secciones.length > 1){
			var secc = $("#seccion-con-imagen-"+ubicacion);
			if(secc.length > 0){
				$("#seccionesAlinear").fadeOut((tiempo2/2), function(){
					secciones.css("display","none");
					$("#seccion-con-imagen-"+ubicacion).css("display","block");
					$("#seccionesAlinear").fadeIn(tiempo/4);
				});
			}
		}

		// Controles
		$(".selecsNum").removeClass("selecNum");;
		$("#selecNum"+ubicacion).addClass("selecNum");
	}

	this.play = function(){
		correr(true);
		return "Corriendo";
	};

	this.pausa = function(){
		correr(false);
		return "Pausa";
	};

	//Controles-----------
	$("#butDeSL").click(function(){
		correr(false);
		derecha();
		correr(true);
	});
	$("#butIzSL").click(function(){
		correr(false);
		izquierda();
		correr(true);
	});
	$(".selecsNum").click(function(){
		cambiaUbicacion(this.value);
		this.blur();
	});

	if(autoplay){
		correr(true);
	}

}

slider = new sliderJatrex;

/*
****************************************
HTML
	<div id="contenedorSlider">
		<div id="imageSlider">
			<div id="contImages">
				<!-- Para agregar images al carrusel hagalo desde la variable imagenes en el js -->
			</div>
		</div>
		<div id="contenidoSlider">
			<div id="seccionesAlinear">
				<!------ INICIO SECCION ----->
				<div class="seccion" id="seccion-con-imagen-1">
				<!-- en el id="seccion-con-imagen-(n)" n es el numero de 
				imagen del slider en el que mostrará la seccion  -->
					<!-- CONTENIDO SECCION -->
					<h1>This is a example Text</h1>
					<br>
					<hr>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</div>
				<!------ FIN SECCION ------>
			</div>
		</div>
		<div id="controlSlider">
			<span id="butIzSL"><</span>
			<ul id="numOptions">
			</ul>
			<span id="butDeSL">></span>
		</div>
	</div>

*****************************************
CSS

*{
	margin: 0px;
	padding: 0px;
}

#contenedorSlider{
	background-color: gray;
	width: 100%;
	margin: auto;
	position: absolute;
}

#imageSlider{
	height: 100%;
	width: 100%;
	position: inherit;
	background-color: lightgray;
	overflow: hidden;
}

#contImages{
	display: -webkit-flex;
	height: 100%;
	width: 300%;
}

.imgSlider{
	display: block;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	top: 0px;
}

#controlSlider{
	width: 100%;
	display: block;
	position: relative;
	text-align: center;
	top: 90%;
}

#numOptions{
	display: inline-block;
	list-style: none;
	vertical-align: middle;
}

#numOptions>li{
	display: inline-block;
}

.selecsNum{
	cursor: pointer;
	width: 25px;
	height: 7px;
	background-color: transparent;
	border: 1px solid #afafaf;
	border-radius: 1px;
	margin: auto 3px;
	transition: 0.5s;
}

.selecsNum:hover{
	background-color: #ffffff33;
}

.selecNum{
	background-color: #ffffff;
	border: 1px solid white;
}

#butIzSL,#butDeSL{
	cursor: pointer;
	font-family: cursive,Verdana;
	font-size: 17pt;
	background-color: transparent;
	color: white;
	border: 0px;
	font-weight: bold;
	vertical-align: middle;
	margin: 2px 10px;
}

#contenidoSlider{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	display: flex;
	align-items: center;
}

#seccionesAlinear{
	padding: 1% 10%;
	width: 100%;
	display: none;
}

.seccion{
	padding: 20px;
	background-color: rgba(0,0,0,0.4);
	color: white;
	font-size: 16px;
	display: none;
}

*/