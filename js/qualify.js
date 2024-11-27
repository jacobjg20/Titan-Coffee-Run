
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
    if(!(/^[0-9]+$/.test(grossIncome.value))){
        if(!(U.$('grossIncomeError'))){
            addErrorMessage('grossIncome', "Please enter a valid income");
        }
    }else if(U.$('grossIncomeError')){
        removeErrorMessage('grossIncomeError');
    } 

    //social securtiy validation
    if(!(/^\d{4}(-\d{3})?$/.test(ssn.value))){
        if(!(U.$('ssnError'))){
            addErrorMessage('ssn', "Please enter a valid zip code");
        }
    }else if(U.$('ssnError')){
        removeErrorMessage('ssnError');
    }

    //state validation
    if(state.value == "selectState"){
        if(!(U.$('stateError'))){
            addErrorMessage('state', "Please select a state");
        }
    }else if(U.$('stateError')){
        removeErrorMessage('stateError');
    }

    //terms and service validation
    if(!termsAndService.checked){
        if(!(U.$('termsAndServiceError'))){
            addErrorMessage('termsAndService', "Please confirm that you agree to the terms and service");
        }
    }else if(U.$('termsAndServiceError')){
        removeErrorMessage('termsAndServiceError');
    }

    //checking grossIncome requirement
    if(document.getElementsByClassName('error').length < 1){
       if(grossIncome.value > 20000){
        alert('You Qualify for a credit card :)');
       }else {
        alert('We\'re sorry, you do not qualify for a credit line at this time" :(');
       }
    }

    tableCreate();
}

function resetForm(){
    document.getElementById('theForm').reset();
    document.querySelectorAll('.error').forEach(e => e.remove());
    if(U.$('table')){
        U.$('table').remove();
    }
}


function tableCreate() {

    tbl = document.createElement('table');
    tbl.id = 'table';
    tbl.style.width = '200px';
    tbl.style.border = '1px solid white';
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
    var fields = [email, remail, fname, lname, city, state, zip, grossIncome, ssn, termsAndService];
    var isValid = true;


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

    //checks if table has any erros
    for (let i = 0; i < fields.length; i++) {
        if(U.$(fields[i].id + 'Error')){
            isValid = false;
        }
    }
    if(isValid) {
        return;
    }

    //adds table to the webpage
    U.$('table-display').appendChild(tbl);
}

U.addEvent(U.$('apply'), 'click', validateForm);
U.addEvent(U.$('resetButton'), 'click', resetForm);

