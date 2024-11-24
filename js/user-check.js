//adds sales link if admin is logged
if(localStorage.isAdmin){   
    var link = document.createElement('a');
    link.href = 'sales.html';
    link.textContent = 'Sales';
    U.$('nav').appendChild(link);
}