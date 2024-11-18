
function validateForm(e){
    'use strict';

    var fname = U.$('fname');

    if(fname != 'Jacob') {
        addErrorMessage('fname', "This is not Jacob");
    }
}



U.addEvent(U.$('submit'), 'mouseover', validateForm);