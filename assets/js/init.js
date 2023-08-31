import { alert, validateEmail } from "./helper/helper.js"
import { getRating, getStars, getPrices } from "./product.js";

// OBTENER PRODUCTOS

document.addEventListener('DOMContentLoaded', function(){
    init();
})

async function init(){
    const rellax = new Rellax('.newsletter .newsletter__float');
    const splide = new Splide('.splide',{
        //type: 'loop',
        perPage: 3,
        gap: "15px",
        perMove: 1,
        autoplay: false,
        padding: '222px',
        speed: 1000,
        start: 2,
        pagination: false,
        focus  : 'center',
        breakpoints: {
            768: {
                perPage: 1,
                padding: '0',
                start: 0,
            },
            1024: {
                perPage: 1,
                padding: '220px',
                start: 0,
            },
            1366: {
                perPage: 2,
                padding: '230px',
            }
        }
    }).mount();

    await axios.get('https://gradistore-spi.herokuapp.com/products/all').then(function (response) {
        const products = response.data.products.nodes;
        const slideList = document.querySelector('.splide__list');
        products.forEach(product => {
            const rating = getRating(product.tags);
            const stars = getStars(rating);
            const prices = getPrices(product.prices);
            splide.add(`
                <div class="splide__slide">
                    <div class="product__card">
                        <div class="card__image">
                            <img src="${product.featuredImage.url}" alt="title">
                            <div class="card__button">
                                <a href="javascript:void(0);" class="add-to-cart botn secondary inverse">Add to cart</a>
                            </div>
                        </div>
                        <div class="card__body">
                            <h4>${product.title}</h4>
                            <div class="card__between">
                                <div class="card__rate">
                                    <div class="rate__stars${" "+stars}">
                                        <span class="star"></span>
                                        <span class="star"></span>
                                        <span class="star"></span>
                                        <span class="star"></span>
                                        <span class="star"></span>
                                    </div>
                                    <div class="rate__count">(${rating})</div>
                                </div>
                                <div class="card__price">
                                    ${prices}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        splide.go(2);
    }).catch(function (error) {
        console.log(error);
    });

    // :ADD TO CART
    document.addEventListener('click', function(e){
        if (!e.target.matches('.add-to-cart')) return;
        e.preventDefault();

        let target = e.target;
        target.innerHTML = `
            <img src="assets/images/loader.gif">
        `;
        setTimeout(() => {
            target.innerHTML = "Added";
            alert("Product Added to cart");
        }, 1500);
    })

    // :FORM VALIDATION
    const form = document.querySelector('.newsletter__form');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = form.elements['email'];
        if(email.value == ""){
            alert('Email required', 'error');
            return false;
        }
        if(!validateEmail(email.value)){
            alert('Invalid email', 'error');
            return false;
        }

        alert('Thank you for signing up to our newsletter', 'success');
        form.reset();
    });
}
