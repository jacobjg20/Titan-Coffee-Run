function login(){
    var username = U.$('email');
    var password = U.$('password');

    if((username.value == localStorage.getItem('username')) && (password.value == localStorage.getItem('password'))){
        window.location.replace("index.html");
    } else {
        alert ('You are not logged in');
    }
}

U.addEvent(U.$('login'), 'click', login);
