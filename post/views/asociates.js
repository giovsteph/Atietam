import { db } from '../config.js'
import { asociatesContainer } from '../main.js';

/***TEMPLATE REQUESTS***/
const setupAsociates = (data) => {
    if (data.length) {
        console.log(data)
        data.forEach(doc => {
            renderData(doc)
        });
    } else {
        asociatesContainer.innerHTML = '<h5 class="center-align">No existen asociados registradas</h5>';
    }
};


/**RENDER ASOCIATES DATA*/
const renderData = (doc) => {

    let div = document.createElement('div');
    div.setAttribute('data-id', doc.id);

    let paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'p');
    let button = document.createElement('button');
    button.setAttribute('id', 'deleteBtn');
    button.setAttribute('class', 'btn btn-warning admin reqBtn')
    button.innerHTML = 'Eliminar';


    const asociate = doc.data();
    const template =
        paragraph.innerHTML = `
            <div id = containerAsociates>
              <h5>ID:</h5>
              ${asociate.id}
              <h5>Nombre:</h5>
              ${asociate.asociateName}
              <h5>Dirección:</h5>
              ${asociate.asociateAddress}
              <h5>Telefono:</h5>
              ${asociate.phone}
              <h5>RFC:</h5>
              ${asociate.RFC}
              <h5> CURP:</h5>
              ${asociate.CURP}
              <h5>Nombre Empresa:</h5>
              ${asociate.nombreEmpresa}
              <h5>Numero de Unidades</h5>
              ${asociate.numeroUnidades}
            </div>
              `


    div.appendChild(paragraph);
    div.appendChild(button);
    asociatesContainer.appendChild(div);

    //Delete asociates

    button.addEventListener('click', (e) => {
        console.log('the delete button was clicked');
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        let okToDelete = confirm('¿Deseas eliminar el asociado ' + asociate.asociateName + '? ' + ' Esta acción no se puede deshacer.');


        if (okToDelete) {
            db.collection('asociates').doc(id).delete().then(() => {
                console.log('the asociate ' + id + 'was succesfully deleted');
            }).catch((err) => {
                console.log('there was an error deleting the document ' + err);
            });
        } else {
            console.log('no se eliminó el elemento');
            //stay on page
        };

    });
};



export {
    setupAsociates
}