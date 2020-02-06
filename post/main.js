//QUERY SELECTORS
let submitBtn = document.querySelector("#submit");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let initPage = document.querySelector("#initPage");
let requestForm = document.querySelector("#requestForm");
let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector("#loginBtn");


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



//submit request form
requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:none;");
    confirmPage.setAttribute("style", "display:block;");
});


export {
    confirmPage,
    requestForm,
    loginForm,
    loginBtn
}