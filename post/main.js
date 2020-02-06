//QUERY SELECTORS
let submitBtn = document.querySelector("#submit");
let loginBtn = document.querySelector("#loginBtn");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let initPage = document.querySelector("#initPage");
let requestForm = document.querySelector("#requestForm");



//session handler
const authHandler = () => {
    if (user is logged in ) {
        //show screen for logged users
        //hide login page?
    } else {
        //usuario no está loggeado
        // mostrar pagina de login
    };
};


//submit login form

loginBtn.addEventListener("click", submitLoginForm() => {
    if (email and password are not empty) {
        // debe hacer la mostración ( o manejar esto con el session handler?)
        loginPage.setAttribute("style", "display:none;");
        initPage.setAttribute("style", "display:block;");
        //then should continue to login with the function on auth.js
        //it should use the session handler
        //it should store the data in local storage?
        //it should have a catch for errors
        .catch(function(error) {
            let errorCode = error.code;
            let errorMsg = error.message;
            console.log('error ' + errorCode + ':' + errorMsg);
            if (errorCode == "auth/email-already-in-use") {
                //it should print an error message in the square
                //code below is from different project
                printErrorMsj("formErrorMsj", "The email address is already in use by another account.", false);
            } else {
                alert("Ocurrio un error en la autenticación [Email account creation].");
            }
        });
    };
});
else {
    //it should print, 'all field are required'
}
});



//submit request form
requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginPage.setAttribute("style", "display:none;")
    initPage.setAttribute("style", "display:none;");
    confirmPage.setAttribute("style", "display:block;");
});


export {
    confirmPage,
    requestForm
}