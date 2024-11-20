function addErrorMessage(id, msg){
    'use strict'

    var elem = document.getElementById(id);

    var newId = id + "Error";

    var span = document.getElementById(newId);

    if(span){
        span.firstChild.value = msg; 
    }{

        // creates a span
        span = document.createElement('span');
        span.id = newId;
        span.className = "error";
        span.appendChild(document.createTextNode(msg));

        // Add the span to the parent
        elem.parentNode.appendChild(span);
        elem.previousElementSibling.className = "error";
    }  
}

function removeErrorMessage(id){
    document.getElementById(id).remove();
}

