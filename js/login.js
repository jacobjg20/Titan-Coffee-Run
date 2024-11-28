function login(){

    var username = U.$('email');
    var password = U.$('password');

    var storedUser = JSON.parse(localStorage.getItem('user'));
    var storedUsername;
    var storedPassword;

    if (storedUser) {
        storedUsername = storedUser.username;
        storedPassword = storedUser.password;
    }
   
    //logs in the admin
    if((username.value == 'admin') && (password.value == 'test123')){
        localStorage.setItem('isAdmin' , true);
        window.location.replace("sales.html");
        return;
    }

    //logs in user
    if((username.value == storedUsername) && (password.value == storedPassword)){
        window.location.replace("cart.html");
    } else {
        alert ('You are not logged in');
    }
    
   

}

U.addEvent(U.$('login'), 'click', login);
