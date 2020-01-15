//valores del juego
let min = 1,
	max = 10,
	numeroGanador = generarAleatorio(min, max),
	numeroIntentos = 3;

//UI
const juego = document.querySelector('#juego'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	adivinarBtn = document.querySelector('#adivinar-btn'),
	adivinarInput = document.querySelector('#adivinar-input'),
	mensaje = document.querySelector('.mensaje');

//Asignar minimo y maximo

minNum.textContent = min;
maxNum.textContent = max;

//event listener volver a jugar

juego.addEventListener('mousedown', function(e) {
	if (e.target.className === 'volverJugar') {
		window.location.reload();
	}
});

adivinarBtn.addEventListener('click', function() {
	let tuNumero = parseInt(adivinarInput.value);

	if (isNaN(tuNumero) || tuNumero < min || tuNumero > max) {
		setMensaje(`Por favor ingrese un número entre ${min} and ${max}`, 'red');
	}

	//chequear si gano

	if (tuNumero === numeroGanador) {
		//   //desahbilitar input
		//   adivinarInput.disabled =true;
		//   //cambiar color borde
		//   adivinarInput.style.borderColor ='green';
		//   setMensaje(`${numeroGanador} es correcto, GANASTE!`, 'green');
		GameOver(true, `${numeroGanador} es correcto, GANASTE!`);
	} else {
		//NUMERO EQUIVOCADO
		numeroIntentos -= 1;
		if (numeroIntentos === 0) {
			GameOver(false, ` el juego terminó,perdiste. El número correcto era ${numeroGanador}`);
		} else {
			//juego continua respusta equivocada

			//
			adivinarInput.style.borderColor = 'red';
			adivinarInput.value = '';

			setMensaje(`${tuNumero} no es el correcto, quedan ${numeroIntentos} intentos`, 'red');
		}
	}
});

function GameOver(won, msg) {
	let color;

	won === true ? (color = 'green') : (color = 'red');
	//desahbilitar input

	adivinarInput.disabled = true;
	//cambiar color borde
	adivinarInput.style.borderColor = color;
	mensaje.style.color = color;

	setMensaje(msg);

	adivinarBtn.value = 'Volver a jugar';
	adivinarBtn.className += 'volverJugar';
}

function generarAleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMensaje(msg, color) {
	mensaje.style.color = color;
	mensaje.textContent = msg;
}
