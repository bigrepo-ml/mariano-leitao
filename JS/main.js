// Obtiene el elemento para abrir el modal
const abrirModal = document.getElementById('abrirModal');
const modal = document.getElementById("modal");

// Obtiene del span el elemento para cerrar
const span = document.getElementsByClassName("cerrarModal")[0];

const botonAgregar = document.getElementById('botonAgregar');
let dinosauriosSeleccionados = [];

//Funciones
// Cuando el usuario clickea, se abre el Modal
abrirModal.onclick = () => {
  modal.style.display = "block";
}

// Cuando el usuario clickea el span X, el modal se cierra
span.onclick = () => {
  modal.style.display = "none";
}

//Checkea que el value que se ingresa sea solo numero, pero cuando se llama para checkear el valor de nombre,
// se niega (!) para que checkear que sea solo texto
let valorValido = (value) => {
	let regex = new RegExp(/^[0-9]*$/gm);
	if(value == null || value == "" || value.length < 1 || regex.test(value)) {
		return false;
	} else {
		return true;
	}
}

//Funcion que crea la fila, checkeando los valores que ingreso el usuario en el modal y lo crea.
let crearFila = () => {
	let dinosaurioExistente = localStorage.getItem("dinosaurio");
	let id = 0;
	if (dinosaurioValido(dinosaurioExistente)) {
		let dinosaurioRecuperados = JSON.parse(dinosaurioExistente)
		for (let i = 0; i < dinosaurioRecuperados.length; i++){
			id++;
		}
	}
	let nombre = document.getElementById("input-nombre").value;
	let alimentacion = document.getElementById("input-alimentacion").value;
	let tamaño = document.getElementById("input-tamaño").value;
	let peso = document.getElementById("input-peso").value;
	let era = document.getElementById("input-era").value;

	if(!valorValido(nombre) || valorValido(tamaño) || valorValido(peso)
		|| alimentacion == "" || era == "") {
		mostrarErrorFila();
		resetModal();
		return;
	}

	limpiarError();

	let dinosaurio = {"id": id, "nombre": nombre, "alimentacion": alimentacion,
						"tamaño": tamaño, "peso": peso, "era": era };

	comprobarDinosaurio(dinosaurio);
	resetModal();
	location.reload();
}

//Funcion que resetea el modal y lo cierra.
let resetModal = () => {
	document.getElementById("input-nombre").value = '';
	document.getElementById("input-alimentacion").value = this.defaultSelected;
	document.getElementById("input-tamaño").value = '';
	document.getElementById("input-peso").value = '';
	document.getElementById("input-era").value = this.defaultSelected;
	modal.style.display = "none";
}

//Comprueba que los valores ingresados existan, si no existen se crea, sino se agrega, luego lo muestra
let comprobarDinosaurio = (dinosaurio) => {
	let dinosaurioExistente = localStorage.getItem("dinosaurio");
	if (!dinosaurioValido(dinosaurioExistente)) {
		let dinosaurios = [];
		dinosaurios.push(dinosaurio);

		guardarDinosaurio(dinosaurios);
	} else {
		let dinosaurioRecuperados = JSON.parse(dinosaurioExistente);
		dinosaurioRecuperados.push(dinosaurio);

		guardarDinosaurio(dinosaurioRecuperados);
	}

	mostrarDinosaurios();
}

//Guarda el dinosaurio ingresado en el modal en el localstorage
let guardarDinosaurio = (dinosaurio) => {
	let dinosaurioJSON = JSON.stringify(dinosaurio);

	localStorage.setItem("dinosaurio", dinosaurioJSON);
}

//Muestra los dinosaurios que estan almacenados y los formatea para mostrarlos en la tabla.
let mostrarDinosaurios = () => {
	let html = "";
	let dinosauriosExistentes = localStorage.getItem("dinosaurio");
	if(!dinosaurioValido(dinosauriosExistentes)) {
		mostrarError();
	} else {
		let dinosauriosRecuperados = JSON.parse(dinosauriosExistentes);
		for (let i = 0; i < dinosauriosRecuperados.length; i++) {
			html += formatearDinosaurio(dinosauriosRecuperados[i], i);
		}

		document.getElementById("gridTabla").innerHTML = html;
		document.addEventListener('DOMContentLoaded', () => { resetModal(); });
	}
}

//Valida que el dinosaurio existente sea valido
let dinosaurioValido = (dinosauriosExistentes) => {
	if (dinosauriosExistentes == null || dinosauriosExistentes == "" ||
	 typeof dinosauriosExistentes == "undefined" ||
	 dinosauriosExistentes == "undefined") {
	 	return false;
	} else {
		return true;
	}
}

//Le da formato a cada uno de los elementos en dinosaurio, para que se visualizen en la tabla
let formatearDinosaurio = (dinosaurio, i) => {
	let html = "";
	html += '<tr class="color-text-table dinosaurioRow" id="'+dinosaurio.id+'">';
	html += '<td>' +i+ '</td>';
	html += '<td id="nombre-fila'+i+'">' + dinosaurio.nombre + '</td>';
	html += '<td id="alimentacion-fila'+i+'">' + dinosaurio.alimentacion + '</td>';
	html += '<td id="tamaño-fila'+i+'">' + dinosaurio.tamaño + ' metros</td>';
	html += '<td id="peso-fila'+i+'">' + dinosaurio.peso + ' toneladas</td>';
	html += '<td id="era-fila'+i+'">' + dinosaurio.era + '</td>';
	html += '<td><button id="editarFila'+i+'" type="button" class="btn">'; // <div class="container"><div class="row"><div class="col-md-6">  editarFila'+dinosaurio.id+'
	html += '<img class="GED-ico" src="../Imagenes/Ico/lapiz.png" alt="plus icono" alt="editar"/></button>'; //</div>
	html += '<button id="borrarFila'+i+'" type="button" class="btn">'; // <div class="col-md-6"> borrarFila'+dinosaurio.id+'
	html += '<img class="GED-ico" src="../Imagenes/Ico/delete.png" alt="plus icono" alt="borrar"/></button>'; // </div></div></div></td>
	html += '</td></tr>';

	return html;
}

//Funcion para borrar la fila
let borrarFila = () => {
	let dinosauriosExistentes = JSON.parse(localStorage.getItem('dinosaurio'));
		if(dinosauriosExistentes != null || dinosauriosExistentes != "") {
			for (let i = 0; i < dinosauriosExistentes.length; i++ ) {
			document.getElementById("borrarFila"+i).onclick = () => {
				if (AceptarCancelar("Desea eliminar la fila?") == true){
					borrarFilaPorId(dinosauriosExistentes, i);
				}
			}
		}
	}
}

let borrarFilaPorId = (dinosauriosRecuperados, i) => {
		dinosauriosRecuperados[i].id = -1;
		let dinosauriosTemporales = [];
		for (let i = 0; i < dinosauriosRecuperados.length; i++) {
			if (dinosauriosRecuperados[i].id != -1) {
				dinosauriosTemporales.push(dinosauriosRecuperados[i]);
			}
		}

		if(dinosauriosTemporales.length == 0) {
			localStorage.setItem("dinosaurio", "");
		} else {
			guardarDinosaurio(dinosauriosTemporales);
		}

		alert(`Fila ${dinosauriosRecuperados[i].nombre} Eliminada`);
		location.reload();
}

//Funcion para Aceptar o cancelar una confirmación
let AceptarCancelar = (mensaje) => {
    var opcion = confirm(mensaje);
    if (opcion == true) {
        return true;
	} else {
		return false;
	}
}

//Funcion para editar la fila
let editarFila = () => {
	let dinosauriosExistentes = JSON.parse(localStorage.getItem('dinosaurio'));
		if(dinosauriosExistentes != null || dinosauriosExistentes != "") {
			for (let i = 0; i < dinosauriosExistentes.length; i++ ) {
			document.getElementById("editarFila"+i).onclick = () => {
				editarPorId(dinosauriosExistentes, i);
			}
		}
	}
};

let editarPorId = (dinosauriosRecuperados, i) => {
	let editarModal = document.getElementById("editarModal");
	let spanEdit = document.getElementsByClassName("cerrarEditModal")[0];
	editarModal.style.display = "block";

	spanEdit.onclick = function() {
		editarModal.style.display = "none";
	}

	dinosauriosRecuperados[i].id = -1;
	let dinosauriosTemporales = [];

	document.getElementById("botonEditar").onclick = () => {
		let nombre = document.getElementById("input-nombre-edit").value;
		let alimentacion = document.getElementById("input-alimentacion-edit").value;
		let tamaño = document.getElementById("input-tamaño-edit").value;
		let peso = document.getElementById("input-peso-edit").value;
		let era = document.getElementById("input-era-edit").value;

		if(!valorValido(nombre) || valorValido(tamaño) || valorValido(peso)
		|| alimentacion == "" || era == "") {
		mostrarErrorFila();
		resetModal();
		return;
		}

		limpiarError();

		dinosauriosRecuperados[i] = {"id": i, "nombre": nombre, "alimentacion": alimentacion,
							"tamaño": tamaño, "peso": peso, "era": era };
		
		for (let i = 0; i < dinosauriosRecuperados.length; i++) {
			if (dinosauriosRecuperados[i].id != -1) {
				dinosauriosTemporales.push(dinosauriosRecuperados[i]);
			}
		}
		guardarDinosaurio(dinosauriosTemporales);
		location.reload();
	}
}

let llenarTabla = () =>  {
	let dinosaurio = [{"id": 0, "nombre": "Daspletosaurus", "alimentacion": "Carnivoro",
						"tamaño": 12, "peso": 11, "era": "Triásico" },
						{"id": 1, "nombre": "Tiranosaurio Rex", "alimentacion": "Carnivoro",
						"tamaño": 11, "peso": 3, "era": "Jurásico" },
						{"id": 2, "nombre": "Diplodocus", "alimentacion": "Herbivoro",
						"tamaño": 13, "peso": 11, "era": "Jurásico" },
						{"id": 3, "nombre": "Velociraptor", "alimentacion": "Carnivoro",
						"tamaño": 2, "peso": 32, "era": "Triásico" },
						{"id": 4, "nombre": "Ankylosaurio", "alimentacion": "Herbivoro",
						"tamaño": 11, "peso": 1, "era": "Cretácico" },
						{"id": 5, "nombre": "Carnosaurio", "alimentacion": "Carnivoro",
						"tamaño": 4, "peso": 11, "era": "Jurásico" },
						{"id": 6, "nombre": "Chasmosaurio", "alimentacion": "Herbivoro",
						"tamaño": 11, "peso": 5, "era": "Cretácico" },
						{"id": 7, "nombre": "Megalania", "alimentacion": "Carnivoro",
						"tamaño": 5, "peso": 11, "era": "Jurásico" }
					];
	dinosaurio.forEach(e => comprobarDinosaurio(e));
	resetModal();
	location.reload();
}

document.addEventListener('DOMContentLoaded', let = () => {
	document.getElementById("botonAgregar").onclick = crearFila;
	document.getElementById("botonLlenar").onclick = llenarTabla;
	document.getElementById("filtro-valor").onclick = filtroTabla;
	document.getElementById("aceptarFiltro").onclick = filtrar;
	document.getElementById("limpiarFiltro").onclick = limpiarFiltro;
	document.getElementById("spinner").innerHTML = '<div class="loader">Loading...</div>';
	setTimeout(let = () => {
		document.getElementById("spinner").innerHTML = "";
		mostrarDinosaurios();
		if (document.getElementById("editarFila0") != undefined){
			let dinosaurioExistente = JSON.parse(localStorage.getItem('dinosaurio'));
			for (let i = 0; i < dinosaurioExistente.length; i++ ) {
				document.getElementById("borrarFila"+i).onclick = borrarFila;
				document.getElementById("editarFila"+i).onclick = editarFila;
			}
		}
	}, 2000);
});