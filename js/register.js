function validateRegistration(){
    if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value))){
        if(!(U.$('emailError'))){
            addErrorMessage('email', "Please enter a valid email address");       
        }
    }   else if(U.$('emailError')){
        removeErrorMessage('emailError');
    }

    
}

U.addEvent(U.$('register'), 'click', validateRegistration);
