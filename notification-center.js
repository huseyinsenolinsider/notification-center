const productPageSelector = '#product-detail-add-to-card-operation';
const visitedProducts = JSON.parse(localStorage.getItem('last-visited-products')) || [];
const isSameProduct = visitedProducts.some(product => product.url === window.location.href);

const init = () => {
    if ($(productPageSelector).length <= 0 && visitedProducts.length >= 3) {
        resetAll();
        initHTML();
        initCSS();
        setEvents();
    } else {
        setProductData();
    }
};

const resetAll = () => {
    $('.notification-center-style-06')?.remove();
};

const setProductData = () => {
    if ($(productPageSelector).length > 0 && !isSameProduct) {

        visitedProducts.push(
            {
                imgSrc: $('#productSliderPhotos img:first').attr('src'),
                title: $('h1.product-title').text().trim(),
                description: $('.info-panel-content li').text().trim(),
                url: window.location.href
            }
        );

        if (visitedProducts.length > 3) {
            visitedProducts.shift();
        };

        localStorage.setItem('last-visited-products', JSON.stringify(visitedProducts));
    };
};

const setProductItemHtml = () => {
    return visitedProducts.map((item) => (`
        <a class="product-row" href="${item.url}">
            <img src="${item.imgSrc}" class="product-image" alt="product image">
            <div class="product-info">
                <div class="product-title" >${item.title}</div>
                <div class="product-description" >${item.description}</div>
            </div>
        </a>
    `)).join('');
};

const initHTML = () => {
    const html = `
        <div class="wrapper-notification-center-06">
            <div class="container">
                <div class="main-title">Discover Our Deals</div>
                <div class="product-container">
                    ${setProductItemHtml()}
                </div>
            </div>
            <img class="close-button" alt="close button" src="https://i.imgur.com/5ZWHjzW.png">
        </div>
    `;

    $('body').append(html);
};

const initCSS = () => {
    const style = `
        <style class="notification-center-style-06">
            .wrapper-notification-center-06 {
                width: 300px;
                height:auto;
                position:fixed;
                top:200px;
                right:50px;
                background-color: white;
                border-radius: 5px;
                z-index: 99999999;
            }
            .wrapper-notification-center-06 .container{
            padding: 0px;
            }
            .wrapper-notification-center-06 .main-title {
                height: 50px;
                background-color: #963264;
                font-size: 28px;
                color: white;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .wrapper-notification-center-06 .product-row {
                display: flex;
                padding: 5px; gap:10px
            }
            .wrapper-notification-center-06 .product-image{
                width: 70px; 
                height: 70px;
                flex-shrink: 0;
            }
            .wrapper-notification-center-06 .product-title{
                font-size: 13px;
                font-weight: bold;
                overflow-wrap:break-word; 
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
                overflow: hidden;

            }
            .wrapper-notification-center-06 .product-description{
                overflow-wrap:break-word; 
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 8px;
                color : black;
                margin-top: 5px;
            }
            .wrapper-notification-center-06 .close-button{
                background-color: #963264;
                width: 35px;
                height: 35px;
                border-radius:50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                position: fixed;
                top: 455px;
                margin-left: 305px;
                padding: 5px;
            }
            .hidden{
            display: none;
            }
        </style>`;

    $('head').prepend(style);
};

const setEvents = () => {
    $('.wrapper-notification-center-06 .close-button').on('click', (element) => {
        $('.wrapper-notification-center-06 .container').toggleClass('hidden');

        if ($('.wrapper-notification-center-06 .container').hasClass('hidden')) {
            $('.wrapper-notification-center-06 .close-button').attr('src', "https://i.imgur.com/hzd2xmO.png");
        } else {
            $('.wrapper-notification-center-06 .close-button').attr('src', "https://i.imgur.com/5ZWHjzW.png");
        };
    });
};

init();