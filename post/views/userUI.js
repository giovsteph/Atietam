import { userLogged, adminItems } from '../main.js'



const setUpUI = (user) => {
    if (user) {
        adminItems.forEach(item => item.style.display = 'none');
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        //account info
        const html = `
            <div>${user.email}</div>
            <div>${user.admin ? 'Administrador': 'Capturista'}</div>
                    `;

        userLogged.innerHTML = html;

        //displays when user exists
        console.log('mail signed in', user.email);
        loginPage.setAttribute("style", "display:none;");
        initPage.setAttribute("style", "display:block;");
        navBar.setAttribute("style", "display:block;");
    } else {
        //hide account info

        userLogged.innerHTML = '';


        //hides when user is logged out
        loginPage.setAttribute("style", "display:block;");
        navBar.setAttribute("style", "display:none;");
        requestsPage.setAttribute("style", "display:none;");
        asociatesPage.setAttribute("style", "display:none;");
        console.log('user is signed out');
    }
}

export {
    setUpUI
}