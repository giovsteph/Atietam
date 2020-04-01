import {
    confirmPage,
    asociatesPage,
    requestForm,
    loginForm,
    loginBtn,
    adminEmail,
    adminForm,
    signUpBtn,
    createAsociateform,
    createAsBtn,
    signUpForm,
    confirmBtn,
    container,
    initPage,
    navBar,
    newUsersPage,
    requestsPage,
    showRequestsBtn,
    seeAsociatesBtn,
    asociatesContainer
} from './main.js'
import { setupRequests, renderData } from './views/requests.js';
import { setupAsociates } from './views/asociates.js'
import { setUpUsers } from './views/users.js';
import { setUpUI } from './views/userUI.js';
import { db, auth, functions, secondaryApp } from './config.js';


/**************************ADD ADMIN CLOUD FUNCTION*******************/

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let adminEm = adminEmail.value;
    alert(adminEm + 'Has been made an admin')
    adminForm.reset();
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEm }).then(result => {
        console.log(result);
    });
});


/**************************************DATABASE****************************/

//getting requests data
showRequestsBtn.addEventListener('click', () => {
    db.collection('requests').onSnapshot(snapshot => {
        //clear container
        container.innerHTML = '';
        //fill container
        setupRequests(snapshot.docs);
    });
});


//saving requests data
confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let user = auth.currentUser;
    const chars = '0123456789'
    let autoId = ''
    for (let i = 0; i < 6; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
    };
    db.collection("requests").add({
        key: autoId,
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
        maps: requestForm.maps.value,
        asociate: requestForm.asociate.value,
        inventory: requestForm.inventory.value,
        time: requestForm.time.value,
        comments: requestForm.comments.value,
        destination: requestForm.destination.value

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
    requestForm.asociate.value = '';
    requestForm.inventory.value = '';
    requestForm.time.value = '';
    requestForm.comments.value = '';
    requestForm.destination.value = '';
    alert('Los datos han sido guardados en la base de datos. Folio: ' + autoId);
    //after this alert it should show all the data of the last saved request in a table format or so, but right now reloads the page
    setTimeout("location.reload(true);", 500);
});



//getting asociates data
seeAsociatesBtn.addEventListener('click', () => {
    db.collection('asociates').onSnapshot(snapshot => {
        //clear container
        asociatesContainer.innerHTML = '';
        //fill container
        setupAsociates(snapshot.docs);
    });
});


/******************SAVE NEW ASOCIATE*********/

createAsBtn.addEventListener('click', () => {

    const idAs = createAsociateform['newAsociateId'].value;
    const nameAs = createAsociateform['newAsociateName'].value;
    const addressAs = createAsociateform['newAsociateAddress'].value;
    const phoneAs = createAsociateform['newAsociatePhone'].value;
    const rfcAs = createAsociateform['newAsociateRFC'].value;
    const curpAs = createAsociateform['newAsociateCURP'].value;
    const enterpriseAs = createAsociateform['newAsociateEnterprise'].value;
    const unitsAs = createAsociateform['newAsociateUnits'].value;


    return db.collection('asociates').add({
        id: idAs,
        asociateName: nameAs,
        asociateAddress: addressAs,
        phone: phoneAs,
        RFC: rfcAs,
        CURP: curpAs,
        nombreEmpresa: enterpriseAs,
        numeroUnidades: unitsAs
    }).then(() => {
        console.log('asociate created');
        $('#modalCreateAsociate').modal('hide');
        createAsociateform.reset();
    });
});












/*****************************AUTHENTICATION*****************************/

//session listener
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setUpUI(user)
        });
        //updating state according to changes on database
        db.collection('users').onSnapshot(snapshot => {
            setUpUsers(snapshot.docs)
        });
    } else {
        setUpUsers([])
        setUpUI()
    }
});

/*************************sign up - create new user******************/

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = signUpForm['newName'].value;
    const email = signUpForm['newEmail'].value;
    const pwd = signUpForm['newPwd'].value;

    secondaryApp.auth().createUserWithEmailAndPassword(email, pwd).then(cred => {

        console.log("User " + cred.uid + " created successfully!");
        //I don't know if the next statement is necessary 
        secondaryApp.auth().signOut();


        $('#modalCreateUser').modal('hide');
        signUpForm.reset();

        //save info to database
        const createUser = (_cred) => {
            console.log('se registró el usuario en la base de datos');
            db.collection('users').add({
                uid: _cred.user.uid,
                username: userName,
                email: email,
                password: pwd
            });
        };
        createUser(cred)
    });
})


/***************************************login****************************/

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value != "" && pwd.value != "") {
        const email = loginForm['email'].value;
        const pwd = loginForm['pwd'].value;

        //falta agregar la parte del login
        auth.signInWithEmailAndPassword(email, pwd).then((cred) => {
            loginPage.setAttribute("style", "display:none;");
            initPage.setAttribute("style", "display:block;");
            navBar.setAttribute("style", "display:block;");
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
            initPage.setAttribute('style', 'display:none;');
            confirmPage.setAttribute('style', 'display:none;');
            newUsersPage.setAttribute('style', 'display:none;');
            navBar.setAttribute('style', 'display:none;');
            requestsPage.setAttribute('style', 'display:none;');
        });
    } else {
        console.log('no se deslogeó');
        //stay on page
    };
});