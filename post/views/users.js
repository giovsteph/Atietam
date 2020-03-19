import { signUpBtn, requestForm, userList } from '../main.js'


/**TEMPLATE**/
const setUpUsers = (data) => {
    let html = '';
    data.forEach(doc => {
        const user = doc.data();
        const li = `
      <div id="username">${user.username}</div><span>
      <div>${user.email}</div><br> 
      `;
        html += li;
    });
    userList.innerHTML = html;
}

signUpBtn.addEventListener('click', () => {
    initPage.setAttribute("style", "display:none;");
    requestForm.setAttribute("style", "display:none;")
});

export {
    setUpUsers
}