var banner = [
    ["https://chamberlaincoffee.com/products", "img/coffee1.png"],
    ["https://www.breville.com/en-us/product/bes870", "img/coffee2.png"],
    ["https://www.keurig.com/Home-Coffee-Makers", "img/coffee3.png"],
    ["https://upstatecoffee.com/products", "img/coffee4.png"]
    ];
    
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    
    shuffle(banner);
    
    document.getElementById('ad-container').innerHTML = '<a href="'+banner[0][0]+'" target="_blank" rel="nofollow"><img src="'+banner[0][1]+'" height="250" width="300" alt="300x250 Banner Ad" /></a>';