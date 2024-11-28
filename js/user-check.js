//adds sales link if admin is logged
if(JSON.parse(localStorage.getItem('isAdmin'))){   
    var link = document.createElement('a');
    link.href = 'sales.html';
    link.id = 'sales-link';
    link.textContent = 'Sales';
    U.$('nav').appendChild(link);
} else if(U.$('sales-link')){
    U.$('sales-link').remove();
} 


