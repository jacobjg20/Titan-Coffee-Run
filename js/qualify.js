
function validateForm(e){
    'use strict';

    var email = U.$('email');
    var remail = U.$('remail');
    var fname = U.$('fname');
    var lname = U.$('lname');
    var city = U.$('city');
    var state = U.$('state');
    var zip = U.$('zip');
    var grossIncome = U.$('grossIncome');
    var ssn = U.$('ssn');
    var termsAndService = U.$('termsAndService');

    //Email validation
    if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value))){
        if(!(U.$('emailError'))){
            addErrorMessage('email', "Please enter a valid email address");       
        }
    }   else if(U.$('emailError')){
        removeErrorMessage('emailError');
    }
    

    //Matching email validation
    if(email.value !== remail.value){
        if(!(U.$('remailError'))){
            addErrorMessage('remail', "Emails do not match");    
        }
    }  else if(U.$('remailError')){
        removeErrorMessage('remailError');
    }

    //first name validation
    if(!(/^[A-Za-z\s]+$/.test(fname.value))) {
        if(!(U.$('fnameError'))){
            addErrorMessage('fname', "Please enter a valid name");
        }
    }else if(U.$('fnameError')){
        removeErrorMessage('fnameError');
    }

     //last name validation
    if(!(/^[A-Za-z\s]+$/.test(lname.value))) {
        if(!(U.$('lnameError'))){
            addErrorMessage('lname', "Please enter a valid name");
        }
    }else if(U.$('lnameError')){
        removeErrorMessage('lnameError');
    }

    //Zip code vlaidation
    if(!(/^\d{5}(-\d{4})?$/.test(zip.value))){
        if(!(U.$('zipError'))){
            addErrorMessage('zip', "Please enter a valid zip code");
        }
    }else if(U.$('zipError')){
        removeErrorMessage('zipError');
    }

    //City validation
    if(!(/^[A-Za-z\s.]+$/.test(city.value))) {
        if(!(U.$('cityError'))){
            addErrorMessage('city', "Please enter a valid city");
        }
    }else if(U.$('cityError')){
        removeErrorMessage('cityError');
    }

    //gross income validation
    if(!(/^\d+$/.test(grossIncome))){
        if(!(U.$('grossIncomeError'))){
            addErrorMessage('grossIncome', "Please enter a valid income");
        }
    }else if(U.$('grossIncomeError')){
        removeErrorMessage('grossIncomeError');
    } 
}



U.addEvent(U.$('submit'), 'mouseover', validateForm);