//QUERY SELECTORS
let submitBtn = document.querySelector("#submit");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let container = document.querySelector('#container');
let initPage = document.querySelector("#initPage");
let requestForm = document.querySelector("#requestForm");
let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector("#loginBtn");
let signUpForm = document.querySelector('#signup-form');
let confirmBtn = document.querySelector('#saveData');
let goBackBtn = document.querySelector('#goBack');
let seeUsersBtn = document.querySelector('#seeUsers');
let newUsersPage = document.querySelector('#newUsersPage');
let fillRequestBtn = document.querySelector('#requests');
let navBar = document.querySelector('#navBar');
let showRequestsBtn = document.querySelector('#seePosts');
let requestsPage = document.querySelector('#requestsPage');

// //session handler
// const authHandler = () => {
//     if (user is logged in ) {
//         //show screen for logged users
//         //hide login page?
//     } else {
//         //usuario no está loggeado
//         // mostrar pagina de login
//     };
// };

const userList = document.querySelector('#userList')
    //show users
const setUpUsers = (data) => {
    let html = '';
    data.forEach(doc => {
        const user = doc.data();
        const li = `
       
        <div>${user.mail}</div><br>
        `;
        html += li;
    });
    userList.innerHTML = html;
}



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

//mostrar usuarios botón
seeUsersBtn.addEventListener('click', () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:block;");
    requestsPage.setAttribute("style", "display:none;");
});

//regresar a llenar formato
fillRequestBtn.addEventListener('click', () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:block;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:none;");
    requestsPage.setAttribute("style", "display:none;");
});


//mostrar requests button

showRequestsBtn.addEventListener('click', () => {
    console.log('dieron click');

    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    navBar.setAttribute("style", "display:block;");
    newUsersPage.setAttribute("style", "display:none;");
    requestsPage.setAttribute("style", "display:block;");
})




export {
    confirmPage,
    requestForm,
    loginForm,
    loginBtn,
    setUpUsers,
    signUpForm,
    confirmBtn,
    container,
    initPage,
    navBar,
    newUsersPage,
    requestsPage,
    showRequestsBtn
}