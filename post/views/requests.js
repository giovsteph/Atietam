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
    button.setAttribute('class', 'admin btn btn-warning reqBtn')
    button.innerHTML = 'Eliminar';

    let buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('id', 'editBtn');
    buttonEdit.setAttribute('class', 'btn btn-warning reqBtn');
    buttonEdit.innerHTML = 'Agregar Asociado';

    let buttonInventory = document.createElement('button');
    buttonInventory.setAttribute('id', 'inventoryBtn');
    buttonInventory.setAttribute('class', 'btn btn-warning reqBtn');
    buttonInventory.innerHTML = 'Agregar Inventario';

    let buttonTime = document.createElement('button');
    buttonTime.setAttribute('id', 'timeBtn');
    buttonTime.setAttribute('class', 'btn btn-warning reqBtn');
    buttonTime.innerHTML = 'Agregar Hora de Finalización';

    let buttonComments = document.createElement('button');
    buttonComments.setAttribute('id', 'commentsBtn');
    buttonComments.setAttribute('class', 'btn btn-warning reqBtn');
    buttonComments.innerHTML = 'Agregar Comentarios';


    const request = doc.data();
    const template =
        paragraph.innerHTML = `
        <div id = containerReq>
                <h5>Folio:</h5>
                <p class = 'requestInfo'>${request.key}</p>
                <h5>Tipo de Servicio:</h5>
                <p class = 'requestInfo'>${request.service}</p>
                <h5>Nombre del Solicitante:</h5>
                <p class = 'requestInfo'>${request.name}</p>
                <h5>Telefono:</h5>
                <p class = 'requestInfo'>${request.phone}</p>
                <h5>Dirección:</h5>
                <p class = 'requestInfo'>${request.address}</p>
                <h5>Link de Google Maps:</h5>
                <p class = 'requestInfo'>${request.maps}</p>
                <h5>Referencia:</h5>
                <p class = 'requestInfo'>${request.reference}</p>
                <h5>Tipo de Vehiculo:</h5>
                <p class = 'requestInfo'>${request.vehicleType}</p>
                <h5>¿Rueda?:</h5>
                <p class = 'requestInfo'>${request.roll}</p>
                <h5>Placas:</h5>
                <p class = 'requestInfo'>${request.plate}</p>
                <h5>Marca:</h5>
                <p class = 'requestInfo'>${request.brand}</p>
                <h5>Modelo:</h5>
                <p class = 'requestInfo'>${request.model}</p>
                <h5>Color:</h5>
                <p class = 'requestInfo'>${request.color}</p>
                <h5>Autoridad que Solicita:</h5>
                <p class = 'requestInfo'>${request.requester}</p>
                <h5>Asociado Asignado:</h5>
                <p class = 'requestInfo'>${request.asociate}</p>
                <h5>Inventario:</h5>
                <p class = 'requestInfo'>${request.inventory}</p>
                <h5>Hora de Finalización:</h5>
                <p class = 'requestInfo'>${request.time}</p>
                <h5>Destino:</h5>
                <p class = 'requestInfo'>${request.destination}</p>
                <h5>Comentarios:</h5>
                <p class = 'requestInfo'>${request.comments}</p>
                </div>
                
                `

    div.appendChild(paragraph);
    div.appendChild(button);
    div.appendChild(buttonEdit);
    div.appendChild(buttonInventory);
    div.appendChild(buttonTime);
    div.appendChild(buttonComments);
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


    //Add Inventory
    buttonInventory.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('dieron click en el botón de agregar inventario');

        let newInv = prompt('Asignar Inventario:');
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('requests').doc(id).update({
            inventory: newInv
        });
    });

    //add time
    buttonTime.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('dieron click en el botón de agregar hora');

        let newTime = prompt('Asignar Hora de Finalización:');
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('requests').doc(id).update({
            time: newTime
        });
    });

    //add comments
    buttonComments.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('dieron click en el botón de agregar comentario');

        let newComments = prompt('Asignar Comentario:');
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('requests').doc(id).update({
            comments: newComments
        });
    });
};

export {
    setupRequests,
    renderData
}