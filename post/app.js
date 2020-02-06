import { confirmPage, requestForm } from './main.js'

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
const loginForm = document.querySelector('#login-form');
const btnLogin = document.querySelector('#loginBtn');
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['email'].value;
    const pwd = loginForm['pwd'].value;
    console.log(email, pwd);
    //falta agregar la parte del login
    auth.signInWithEmailAndPassword(email, pwd).then((cred) => {
        console.log(cred.user);
    });
    loginForm.reset();
});



//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user is signed out');
    });
});