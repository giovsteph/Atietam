import { confirmPage, requestForm, loginForm, loginBtn } from './main.js'

//Cloud FIRESTORE
const db = firebase.firestore();
const auth = firebase.auth();

const renderData = (doc) => {
    let div = document.createElement('div');
    let name = document.createElement('p');
    let address = document.createElement('p');

    name.setAttribute("id", "name");
    address.setAttribute("id", "address");

    //add id
    div.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    address.textContent = doc.data().phone;

    div.appendChild(name);
    div.appendChild(address);
    confirmPage.appendChild(div);
};



//getting data
db.collection('requests').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderData(doc);
        console.log(doc.data());
    })
});

//saving data
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection("requests").add({
        service: requestForm.service.value,
        name: requestForm.name.value,
        phone: requestForm.phone.value,
        address: requestForm.address.value,
        reference: requestForm.ref.value,
        vehicleType: requestForm.vehicleType.value,
        roll: requestForm.exampleRadios.value,
        plate: requestForm.plate.value,
        color: requestForm.color.value,
        requester: requestForm.requester.value
    });
    requestForm.service.value = '';
    requestForm.name.value = '';
    requestForm.phone.value = '';
    requestForm.address.value = '';
    requestForm.ref.value = '';
    requestForm.vehicleType.value = '';
    requestForm.exampleRadios.value = '';
    requestForm.plate.value = '';
    requestForm.color.value = '';
    requestForm.requester.value = '';
});



// Crear entrada
// const setDataInDB = (snapshot, document, _formInfo) => {
//     return db.collection(snapshot).doc(document).set(_formInfo);
// }


/*****************************AUTHENTICATION*****************************/

//login
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value != "" && pwd.value != "") {
        const email = loginForm['email'].value;
        const pwd = loginForm['pwd'].value;
        console.log(email, pwd);

        //falta agregar la parte del login
        auth.signInWithEmailAndPassword(email, pwd).then((cred) => {
            loginPage.setAttribute("style", "display:none;");
            initPage.setAttribute("style", "display:block;");
            console.log(cred.user);
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMsg = error.message;
            console.log('error ' + errorCode + ':' + errorMsg);
            if (errorCode == "auth/invalid-email") {
                //it should print an error message in the square
                //code below is from different project
                alert('el correo está mal formatedo')
            } else if (errorCode == 'auth/user-not-found') {
                alert('el usuario no está registrado')
            } else {
                alert("Ocurrio un error en la autenticación [Email account creation].");
            }
        });
    } else {
        alert('all fields are required');
    }
    loginForm.reset();
});


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    let okToLogout = confirm('¿Deseas cerrar sesión?');
    if (okToLogout) {
        auth.signOut().then(() => {
            //reload the page
            setTimeout("location.reload(true);", 1500)
            console.log('user is signed out');
        });
    } else {
        console.log('no se deslogeó');
        //stay on page
    };
});