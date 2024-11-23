function validateRegistration(){

    var email = U.$('email');
    var password = U.$('password');
    var repassword = U.$('repassword');

    passwordMatch = false;
    passwordValid = false;
    emailValid = false;

    //email validation
    if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value))){
        if(!(U.$('emailError'))){
            addErrorMessage('email', "Please enter a valid email address");  
            emailValid = false;     
        }
    }   else if(U.$('emailError')){
        removeErrorMessage('emailError');
        emailValid = true;
    } else {
        emailValid = true;
    }

    //password validation
    if(!(/^[a-zA-Z0-9~_&*%@$}]{2,15}$/).test(password.value)){
        if(!(U.$('passwordError'))){
            addErrorMessage('password', "Please enter a valid password");
            passwordValid = false;       
        }
    }   else if(U.$('passwordError')){
        removeErrorMessage('passwordError');
        passwordValid = true;
    } else {
        passwordValid = true;
    }

    //password Match 
    if(!(repassword.value == password.value)){
        if (!(U.$('repasswordError'))){
            addErrorMessage('repassword', "Please enter a matching password");    
            passwordMatch = false;
        } 
    } else if(U.$('repasswordError')){
        removeErrorMessage('repasswordError');
        passwordMatch = true;
    } else {
        passwordMatch = true;
    }
      
    // Add user to data base
    if(email && passwordValid && passwordMatch){
        addUser(email.value, password.value);
    }  
}

function addUser (email, password){
    localStorage.setItem("username" , email);
    localStorage.setItem("password", password);
}

U.addEvent(U.$('register'), 'click', validateRegistration);
