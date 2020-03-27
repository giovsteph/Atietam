/***TEMPLATE REQUESTS***/
const setupRequests = (data) => {
    //show requests if they exist
    if (data.length) {

        let div = '';

        data.forEach(doc => {
            //definir que request será la data de cada solicitud
            const request = doc.data();
            //Crear la plantilla por cada documento que se encuentre en database
            const template = `
                    <div class = 'containerReq' id = 'requestContainer'> 
                    <div class = 'title'>Numero de Solicitud:</div>
                    <div class = 'requestItem'>${request.key}</div>
                    <div class = 'title'>Tipo de Servicio:</div>
                    <div class = 'requestItem'>${request.service}</div>
                    <div class = 'title' >Nombre del Solicitante:</div>
                    <div class = 'requestItem'>${request.name}</div>
                    <div class = 'title' >Telefono:</div>
                    <div class = 'requestItem'>${request.phone}</div>
                    <div class = 'title'>Dirección:</div>
                    <div class = 'requestItem'>${request.address}</div>
                    <div class = 'title'>Link de Google Maps:</div>
                    <div class = 'requestItem'>${request.maps}</div>
                    <div class = 'title'>Referencia:</div>
                    <div class = 'requestItem'>${request.reference}</div>
                    <div class = 'title'>Tipo de Vehiculo:</div>
                    <div class = 'requestItem'>${request.vehicleType}</div>
                    <div class = 'title'>¿Rueda?:</div>
                    <div class = 'requestItem'>${request.roll}</div>
                    <div class = 'title'>Placas:</div>
                    <div class = 'requestItem'>${request.plate}</div>
                    <div class = 'title'>Marca:</div>
                    <div class = 'requestItem'>${request.brand}</div>
                    <div class = 'title'>Modelo:</div>
                    <div class = 'requestItem'>${request.model}</div>
                    <div class = 'title'>Color:</div>
                    <div class = 'requestItem'>${request.color}</div>
                    <div class = 'title'>Autoridad que Solicita:</div>
                    <div class = 'requestItem'>${request.requester}</div>
                    <div class = 'title'>Asociado Asignado:</div>
                    <div class = 'requestItem'>${request.asociate}</div>
                    


                    <p id="editRequestBtn" class= 'btnEditAndDlt' style="color:green; cursor:pointer;"> Editar Solicitud</p>
                    <p id="deleteRequestBtn" class= 'btnEditAndDlt admin' style="color:green; cursor:pointer;"> Eliminar Solicitud</p>
                    </div>
                    `;
            //agregar plantilla al string vacío
            div += template;
        });

        //cambiar el innerHTML para agregar el div
        container.innerHTML = div
    } else {
        container.innerHTML = '<h5 class="center-align">No existen solicitudes registradas</h5>';
    }
};


export {
    setupRequests
}



/**RENDER REQUESTS DATA*/
// const renderData = (doc) => {

// let div = document.createElement('div');
// div.setAttribute('data-id', doc.id);


// let paragraph = document.createElement('p');
// let name = document.createElement('p');
// let phone = document.createElement('p');
// let serviceType = document.createElement('p');

// name.setAttribute("id", "name");
// phone.setAttribute("id", "phone");
// serviceType.setAttribute('id', 'serviceType')
// paragraph.setAttribute('id', 'p');


// paragraph.textContent = ''
// name.textContent = doc.name;
// phone.textContent = doc.phone;
// serviceType.textContent = doc.service;

// div.appendChild(paragraph);
// div.appendChild(name);
// div.appendChild(phone);
// div.appendChild(serviceType)
// container.appendChild(div);
// };