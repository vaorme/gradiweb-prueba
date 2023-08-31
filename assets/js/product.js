
function getRating(array){
    // :Filtramos solo numeros del array TAG
    let onlyNumbers = array.filter(item => !isNaN(item));
    const sum = onlyNumbers.reduce((total, num) => total + parseInt(num), 0);

    // :Devolvemos ya el promedio o el valor
    return sum / onlyNumbers.length;
}

function numberInBetween(number, lower, upper){
    // :Comprobamos si el numero esta entre MENOR y MAYOR
    return number > lower && number < upper;
}

function getStars(rating){
    if(numberInBetween(rating, 400, 500)){
        return "five";
    }else if(numberInBetween(rating, 300, 400)){
        return "four";
    }else if(numberInBetween(rating, 200, 300)){
        return "three";
    }else if(numberInBetween(rating, 100, 200)){
        return "two";
    }else{
        return "one";
    }
}

function formatPrice(num, code) {
    const price = num / 100;
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code
    }).format(price);
  
    return formattedPrice;
}

function getPrices(prices){
    const normalPrice = formatPrice(prices.max.amount, prices.max.currencyCode);
    const discountPrice = formatPrice(prices.min.amount, prices.min.currencyCode);
    let pricesHtml = "";
    // Comprobamos que tengan "descuento"
    if(discountPrice < normalPrice){
        pricesHtml = `
            <span class="price__tag discount">${normalPrice}</span>
            <span class="price__tag">${discountPrice}</span>
        `;
    }else{
        pricesHtml = `
            <span class="price__tag">${normalPrice}</span>
        `;
    }

    return pricesHtml;
}

export{
    getRating,
    getStars,
    getPrices
}