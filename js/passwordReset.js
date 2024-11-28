 function resetPassword(){
    var username = U.$('email');
    var password = U.$('password');
    var newPassword = U.$('newPassword')

    var storedUser = JSON.parse(localStorage.getItem('user'));
    var storedUsername = storedUser.username;
    var storedPassword = storedUser.password;

    //set new password
    if((username.value == storedUsername) && (password.value == storedPassword)){
        storedUser.password = newPassword.value;
        localStorage.setItem('user', JSON.stringify(storedUser)); 
        location.reload();
    } else {
        alert('username and password combination is invalid');
    }
 }


U.addEvent(U.$('resetPassword'), 'click', resetPassword);
