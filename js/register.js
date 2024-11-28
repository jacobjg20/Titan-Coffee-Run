function validateRegistration(){

    var tbl = document.createElement('table');
    tbl.id = 'table';
    tbl.style.width = '200px';
    tbl.style.border = '1px solid white';

    var email = U.$('email');
    var password = U.$('password');
    var repassword = U.$('repassword');
    var fields = [email, password, repassword];
    var isValid = true;

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
      
     //removes existing table
     if(U.$('table')){
        U.$('table').remove();
    }

    for (let i = 0; i < fields.length; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 2; j++) {
        if (i === fields.length && j === 1) {
            break;
        } else if(j === 1){
            if(U.$(fields[i].id + "Error"))
            {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode('Invalid'));
                td.style.border = '1px solid white';
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode('Valid'));
                td.style.border = '1px solid white';
            } 
        } else {
            const td = tr.insertCell();
            td.appendChild(document.createTextNode(fields[i].name));
            td.style.border = '1px solid white';
            if (i === 1 && j === 1) {
            }
        }
        }
    }

    //checks if table has any erros , adds user , redirects to new window
    for (let i = 0; i < fields.length; i++) {
        if(U.$(fields[i].id + 'Error')){
            isValid = false;
        }
    }
    if(isValid) {
        addUser(email.value, password.value);
        window.location.replace("login.html");
        return;
    }

    //adds table to the webpage
    U.$('table-display').appendChild(tbl);

}

function addUser (email, password){
    let user = {
        'username': email,
        'password': password
    }
    localStorage.setItem('user', JSON.stringify(user));
}

U.addEvent(U.$('register'), 'click', validateRegistration);
