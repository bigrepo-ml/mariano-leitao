let ocultar = () => {
    document.getElementById('inputs-filtro-nombre').style.display = 'none';
    document.getElementById('inputs-filtro-tamaño').style.display = 'none';
    document.getElementById('inputs-filtro-peso').style.display = 'none';
    document.getElementById('aceptarFiltro').style.display = 'none';
    document.getElementById('limpiarFiltro').style.display = 'none';
}

let mostrar = () => {
    document.getElementById('inputs-filtro-nombre').style.display = 'inline-block';
    document.getElementById('inputs-filtro-tamaño').style.display = 'block';
    document.getElementById('inputs-filtro-peso').style.display = 'block';
    document.getElementById('aceptarFiltro').style.display = 'inline-block';
    document.getElementById('limpiarFiltro').style.display = 'inline-block';
}

let filtroTabla = () => {
    let valor = document.getElementById("filtro-valor").checked;
    if(valor == true) {
        mostrar();
    } else {
        ocultar();
    }
}

//Funcion 
let filtrar = () => {
    let html = "";
    let inputNombre = document.getElementById('inputs-filtro-nombre').value.toLowerCase();
    let inputTamaño = document.getElementById('inputs-filtro-tamaño').value;
    let inputPeso = document.getElementById('inputs-filtro-peso').value;
    let dinosauriosExistentes = JSON.parse(localStorage.getItem('dinosaurio'));

    if (inputNombre == "" && inputTamaño == "" && inputPeso == "") {
        mostrarErrorFiltrar();
        if(dinosauriosExistentes != null || dinosauriosExistentes != "") {
            for (let i = 0; i < dinosauriosExistentes.length; i++) {
                html += formatearDinosaurioFiltrado(dinosauriosExistentes[i], i);
            }
            document.getElementById("gridTabla").innerHTML = html;
        }
    } else {
        if(dinosauriosExistentes != null || dinosauriosExistentes != "") {
                let filtroNombre = dinosauriosExistentes.filter(x => contieneString(x.nombre.toLowerCase(), inputNombre) || x.tamaño == inputTamaño || x.peso == inputPeso);
                for (let i = 0; i < filtroNombre.length; i++) {
                    html += formatearDinosaurioFiltrado(filtroNombre[i], i);
                }
        
                document.getElementById("gridTabla").innerHTML = html;
                limpiarError();
        }
    }
}

let contieneString = (dinosaurio, inputDinosaurio) => {
        if (inputDinosaurio == "") {
            return false;
        }
        if (dinosaurio.includes(inputDinosaurio)) {
            return true;
        } else {
            return false;
        }
}

let formatearDinosaurioFiltrado = (dinosaurio, i) => {
	let html = "";
	html += '<tr class="color-text-table dinosaurioFiltroRow" id="'+dinosaurio.id+'">';
	html += '<td>' +dinosaurio.id+ '</td>';
	html += '<td id="nombre-fila'+i+'">' + dinosaurio.nombre + '</td>';
	html += '<td id="alimentacion-fila'+i+'">' + dinosaurio.alimentacion + '</td>';
	html += '<td id="tamaño-fila'+i+'">' + dinosaurio.tamaño + ' metros</td>';
	html += '<td id="peso-fila'+i+'">' + dinosaurio.peso + ' toneladas</td>';
	html += '<td id="era-fila'+i+'">' + dinosaurio.era + '</td>';
	html += '<td><img class="GED-ico" src="../Imagenes/Ico/filter.png" alt="filtro icono"/></td>';
	html += '</tr>';

	return html;
}

let limpiarFiltro = () => {
    document.getElementById('inputs-filtro-nombre').value = "";
    document.getElementById('inputs-filtro-tamaño').value = "";
    document.getElementById('inputs-filtro-peso').value = "";
    location.reload();
}
