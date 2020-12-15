//Muestra mensaje de Error cuando no hay ninguna fila en la tabla
let mostrarError = () => {
	let html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += '¡Todavia no hay filas agregadas!';
	html += '</div>';

	document.getElementById("error").innerHTML = html;
};

//Muestra Error cuando se ingreso mal algun valor en los campos del modal
let mostrarErrorFila = () => {
	let html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += '¡Los datos del formulario son incorrectos!';
	html += '</div>';

	document.getElementById("error").innerHTML = html;
};

let mostrarErrorBorrar = () => {
	let html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += '¡No hay filas seleccionadas para borrar!';
	html += '</div>';

	document.getElementById("error").innerHTML = html;
};

let mostrarErrorFiltrar = () => {
	let html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += '¡Ingrese un valor en los campos para filtrar!';
	html += '</div>';

	document.getElementById("error").innerHTML = html;
};

//Funcion que limpia el mensaje de error
let limpiarError = () => {
	document.getElementById("error").innerHTML = "";
}