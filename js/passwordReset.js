 function resetPassword(){
    var username = U.$('email');
    var password = U.$('password');
    var newPassword = U.$('newPassword')

    //set new password
    if((username.value == localStorage.getItem('username')) && (password.value == localStorage.getItem('password'))){
        localStorage.setItem('password', newPassword.value); 
    } else {
        alert('username and password combination is invalid');
    }
 }


U.addEvent(U.$('resetPassword'), 'click', resetPassword);
