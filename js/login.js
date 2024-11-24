function login(){
    var username = U.$('email');
    var password = U.$('password');

    //logs in the admin
    if((username.value == 'admin') && (password.value == 'test123')){
        localStorage.setItem('isAdmin' , true);
        window.location.replace("index.html");
        return;
    }

    //logs in user
    if((username.value == localStorage.getItem('username')) && (password.value == localStorage.getItem('password'))){
        window.location.replace("index.html");
    } else {
        alert ('You are not logged in');
    }

}

U.addEvent(U.$('login'), 'click', login);
