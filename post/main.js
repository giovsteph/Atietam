//QUERY SELECTORS
let submitBtn = document.querySelector("#submit");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let initPage = document.querySelector("#initPage");
let requestForm = document.querySelector("#requestForm");
let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector("#loginBtn");
let signUpForm = document.querySelector('#signup-form');


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
        <p>Registered Users</p>
        <div>${user.mail}</div>

     

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
});


export {
    confirmPage,
    requestForm,
    loginForm,
    loginBtn,
    setUpUsers,
    signUpForm
}