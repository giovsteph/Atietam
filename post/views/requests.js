import { db } from '../config.js'

/***TEMPLATE REQUESTS***/
const setupRequests = (data) => {
    if (data.length) {
        console.log(data)
        data.forEach(doc => {
            renderData(doc)
        });
    } else {
        container.innerHTML = '<h5 class="center-align">No existen solicitudes registradas</h5>';
    }
};


/**RENDER REQUESTS DATA*/
const renderData = (doc) => {

    let div = document.createElement('div');
    div.setAttribute('data-id', doc.id);

    let paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'p');
    let button = document.createElement('button');
    button.setAttribute('id', 'deleteBtn');
    button.innerHTML = 'Eliminar';

    let buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('id', 'editBtn');
    buttonEdit.innerHTML = 'Agregar Asociado';

    const request = doc.data();
    const template =
        paragraph.textContent = `
                Folio:
                ${request.key}
                Tipo de Servicio:
                ${request.service}
                Nombre del Solicitante:
                ${request.name}
                Telefono:
                ${request.phone}
                Dirección:
                ${request.address}
                Link de Google Maps:
                ${request.maps}
                Referencia:
                ${request.reference}
                Tipo de Vehiculo:
                ${request.vehicleType}
                ¿Rueda?:
                ${request.roll}
                Placas:
                ${request.plate}
                Marca:
                ${request.brand}
                Modelo:
                ${request.model}
                Color:
                ${request.color}
                Autoridad que Solicita:
                ${request.requester}
                Asociado Asignado:
                ${request.asociate}
                `

    div.appendChild(paragraph);
    div.appendChild(button);
    div.appendChild(buttonEdit);
    container.appendChild(div);

    //Delete requests

    button.addEventListener('click', (e) => {
        console.log('the delete button was clicked');
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        let okToDelete = confirm('¿Deseas eliminar la solicitud ' + request.key + '? ' + ' Esta acción no se puede deshacer.');


        if (okToDelete) {
            db.collection('requests').doc(id).delete().then(() => {
                console.log('the document ' + id + 'was succesfully deleted');
            }).catch((err) => {
                console.log('there was an error deleting the document ' + err);
            });
        } else {
            console.log('no se eliminó el elemento');
            //stay on page
        };

    });

    //Add Asociate
    buttonEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('dieron click en el botón de agregar asociado');

        let newAs = prompt('Asignar Asociado:');
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('requests').doc(id).update({
            asociate: newAs
        });
    })

};

export {
    setupRequests,
    renderData
}