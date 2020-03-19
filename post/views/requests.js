/**RENDER REQUESTS DATA*/
const renderData = (doc) => {
    let div = document.createElement('div');
    let paragraph = document.createElement('p');
    let name = document.createElement('p');
    let phone = document.createElement('p');
    let serviceType = document.createElement('p');

    name.setAttribute("id", "name");
    phone.setAttribute("id", "phone");
    serviceType.setAttribute('id', 'serviceType')
    paragraph.setAttribute('id', 'p');

    //add id
    div.setAttribute('data-id', doc.id);
    paragraph.textContent = ''
    name.textContent = doc.name;
    phone.textContent = doc.phone;
    serviceType.textContent = doc.service;

    div.appendChild(paragraph);
    div.appendChild(name);
    div.appendChild(phone);
    div.appendChild(serviceType)
    container.appendChild(div);
};

/***TEMPLATE REQUESTS***/
const setupRequests = (data) => {
    //show requests if they exist
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const request = doc.data();
            const li = `
          <div> 
      <div style="color:red; text-align:center; text-transform:capitalize;"> ${request.name} </div>
      <div> ${request.phone}</div>
          </div>
      `;
            html += li;
        });
        container.innerHTML = html
    } else {
        container.innerHTML = '<h5 class="center-align">Sin solicitudes</h5>';
    }
};


export {
    renderData,
    setupRequests
}