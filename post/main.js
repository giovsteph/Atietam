//QUERY SELECTORS
let submitBtn = document.querySelector("#submit");
let loginBtn = document.querySelector("#loginBtn");
let loginPage = document.querySelector("#loginPage");
let confirmPage = document.querySelector("#confirmPage");
let initPage = document.querySelector("#initPage");
let requestForm = document.querySelector("#requestForm");



loginBtn.addEventListener("click", () => {
    loginPage.setAttribute("style", "display:none;");
    initPage.setAttribute("style", "display:block;");
});

requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    initPage.setAttribute("style", "display:none;");
    loginPage.setAttribute("style", "display:none;")
    confirmPage.setAttribute("style", "display:block;");
});


export {
    confirmPage,
    requestForm
}