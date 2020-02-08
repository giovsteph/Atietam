import { confirmPage, requestForm, loginForm, loginBtn, setUpUsers, signUpForm, confirmBtn, container, initPage } from './main.js'

//Cloud FIRESTORE
const db = firebase.firestore();
const auth = firebase.auth();


/**************************************DATABASE****************************/
const renderData = (doc) => {
    let div = document.createElement('div');
    let paragraph = document.createElement('p');
    let name = document.createElement('p');
    let address = document.createElement('p');

    name.setAttribute("id", "name");
    address.setAttribute("id", "address");
    paragraph.setAttribute('id', 'display');

    //add id
    div.setAttribute('data-id', doc.id);
    paragraph.textContent = ''
    name.textContent = doc.data().name;
    address.textContent = doc.data().address;

    div.append(paragraph);
    container.appendChild(div);
};

//getting data
db.collection('requests').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderData(doc);
        console.log(doc.data());
    })
});


//saving data
confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let user = auth.currentUser;
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
        requester: requestForm.requester.value,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
        creator: user.email,
        model: requestForm.model.value,
        brand: requestForm.brand.value,
        maps: requestForm.maps.value
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
    requestForm.model.value = '';
    requestForm.brand.value = '';
    requestForm.maps.value = '';
    alert('Los datos han sido guardados en la base de datos.')
    setTimeout("location.reload(true);", 500)
});


/*****************************AUTHENTICATION*****************************/

//session listener
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('mail signed in', user.email);
        loginPage.setAttribute("style", "display:none;");
        initPage.setAttribute("style", "display:block;");
        //getting users data
        //this function may be helpful to see all the users in admin mode, right now, users can only be seen when logged in
        db.collection('users').get().then((snapshot) => {
            setUpUsers(snapshot.docs)
        });
    } else {
        loginPage.setAttribute("style", "display:block;");
        console.log('user is signed out');
    }
});

//sign up - create new user
let signUpBtn = document.querySelector('#signUpBtn');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //get user info
    const userName = signUpForm['newName'].value;
    const email = signUpForm['newEmail'].value;
    const pwd = signUpForm['newPwd'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, pwd).then(cred => {
        //close modal
        $('#modalCreateUser').modal('hide');
        signUpForm.reset();
        //save data on database
        //createUser(cred);
        const createUser = (_cred) => {
            db.collection('users').add({
                username: userName,
                email: email,
                password: pwd
            });
        };

    });
});

//creates fields in database, but they are empty!!





//login
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value != "" && pwd.value != "") {
        const email = loginForm['email'].value;
        const pwd = loginForm['pwd'].value;

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
                alert('el correo indicado no existe en la base de datos')
            } else if (errorCode == 'auth/user-not-found') {
                alert('el usuario no está registrado en la base de datos')
            } else if (errorCode == 'auth/wrong-password') {
                alert('La contraseña introducida es incorrecta')
            } else {
                alert("Ocurrio un error en la autenticación [Contacte a su administrador].");
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
            //hide everything
            initPage.setAttribute('style', 'display:none;')
            confirmPage.setAttribute('style', 'display:none;')
                //reload the page
            setTimeout("location.reload(true);", 500)
        });
    } else {
        console.log('no se deslogeó');
        //stay on page
    };
});