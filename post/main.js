//QUERY SELECTORS

/*PAGES QUERYS*/
let submitBtn = document.querySelector("#submit");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let initPage = document.querySelector("#initPage");
let requestsPage = document.querySelector('#requestsPage');
let newUsersPage = document.querySelector('#newUsersPage');
let asociatesPage = document.querySelector('#asociatesPage');

/*BUTTONS*/
let loginBtn = document.querySelector("#loginBtn");
let confirmBtn = document.querySelector('#saveData');
let goBackBtn = document.querySelector('#goBack');
let seeUsersBtn = document.querySelector('#seeUsers');
let seeAsociatesBtn = document.querySelector('#seeAsociates');
let fillRequestBtn = document.querySelector('#requests');
let showRequestsBtn = document.querySelector('#seePosts');
let signUpBtn = document.querySelector('#signUpBtn');
let createAsBtn = document.querySelector('#createAsociateBtn');


/*CONTAINERS*/
let container = document.querySelector('#container');
let userList = document.querySelector('#userList');

/*OTHER*/
let requestForm = document.querySelector("#requestForm");
let loginForm = document.querySelector('#login-form');
let signUpForm = document.querySelector('#signup-form');
let createAsociateform = document.querySelector('#createAsociateform');
let adminForm = document.querySelector('.admin-actions');
let navBar = document.querySelector('#navBar');
let userLogged = document.querySelector('#userLogged');
let adminEmail = document.querySelector('#admin-email');


$('#navbarToggleExternalContent').click(function() {
    $('.panel-collapse.in')
        .collapse('hide');
});


//submit request form
requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    confirmPage.setAttribute("style", "display:block;");
    showInfo();
});

//show form info
const showInfo = () => {
        document.querySelector('#display').innerHTML = '<br><br>' +
            'Servicio solicitado:   ' + requestForm.service.value + '<br>' +
            'Nombre del Solicitante:   ' + requestForm.name.value + '<br>' +
            'Telefono:   ' + requestForm.phone.value + '<br>' +
            'Dirección:   ' + requestForm.address.value + '<br>' +
            'Link de Mapa: ' + requestForm.maps.value + '<br>' +
            'Referencias:   ' + requestForm.ref.value + '<br>' +
            'Tipo de Vehículo:   ' + requestForm.vehicleType.value + '<br>' +
            'Puede rodar:   ' + requestForm.exampleRadios.value + '<br>' +
            'Placas:   ' + requestForm.plate.value + '<br>' +
            'Color:   ' + requestForm.color.value + '<br>' +
            'Autoridad que solicita:   ' + requestForm.requester.value;
    }
    //volver button
    //it's going to reload page, not ideal but works
goBackBtn.addEventListener('click', () => {
    setTimeout("location.reload(true);", 500)
})






//mostrar asociados
seeAsociatesBtn.addEventListener('click', () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:none;");
    requestsPage.setAttribute("style", "display:none;");
    asociatesPage.setAttribute("style", "display:block;");
})

//regresar a llenar formato
fillRequestBtn.addEventListener('click', () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:block;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:none;");
    requestsPage.setAttribute("style", "display:none;");
    asociatesPage.setAttribute("style", "display:none;");
});

//mostrar requests button
showRequestsBtn.addEventListener('click', () => {
    console.log('dieron click');

    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:none;");
    requestsPage.setAttribute("style", "display:block;");
    asociatesPage.setAttribute("style", "display:none;");
})

//mostrar usuarios botón
seeUsersBtn.addEventListener('click', () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:block;");
    requestsPage.setAttribute("style", "display:none;");
    asociatesPage.setAttribute("style", "display:none;");
});



export {
    confirmPage,
    requestForm,
    loginForm,
    loginBtn,
    signUpForm,
    confirmBtn,
    signUpBtn,
    container,
    initPage,
    navBar,
    newUsersPage,
    requestsPage,
    showRequestsBtn,
    asociatesPage,
    userList,
    userLogged,
    createAsBtn,
    createAsociateform,
    adminForm,
    adminEmail
}