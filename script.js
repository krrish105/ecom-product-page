let quantity = 0;
$(document).ready(() => {
    let imgIndexLight = {
        start: 0
    }
    let imgIndexMain = {
        start: 0
    }
    let isAdd = false;
    const cartQty = $('#cart-qty');
    $('#main-options img').each((i,el) => {
        $('#main-options img').eq(i).on('click', function(){
            $('#main-options img').removeClass('img-option-active');
            imgOptionHandler('#home-main-img img','#main-options img', i);
            imgIndexMain.start = i;
        });
    });
    $('#light-options img').each((i,el) => {
        $('#light-options img').eq(i).on('click', function() {
            $('#light-options img').removeClass('img-option-active');
            imgOptionHandler('#light-main img', '#light-options img', i);
            imgIndexLight.start = i;
        });
    });

    $('.img-next').on('click', () => {
        nextHandler('#home-main-img img','#main-options img', imgIndexMain);
    })
    $('.img-prev').on('click', () => {
        prevHandler('#home-main-img img','#main-options img', imgIndexMain);
    });
    $('.light-next').on('click', () => {
        nextHandler('#light-main img', '#light-options img', imgIndexLight);
    })
    $('.light-prev').on('click', () => {
        prevHandler('#light-main img', '#light-options img', imgIndexLight);
    });
    $('#home-main-img img').on('click', () => {
        $('.backdrop').show();
        $('.lightbox').show();
    });
    $('#lightbox-close').on('click', () => {
        $('.backdrop').hide();
        $('.lightbox').hide();
    });
    let val = $('#quantity-num').attr('value');
    $('#quantity-minus').on('click', () => {
        if (val > 0) {
            $('#quantity-num').attr('value', --val);
            --quantity;
            if(quantity === 0){ 
                isAdd = false; 
                showCartContent();
            }
            if(isAdd){
                showCartContent();
            }
        }
    });
    $('#quantity-plus').on('click', () => {
        $('#quantity-num').attr('value', ++val);
        quantity++;
        if(isAdd){
            showCartContent();
        }
    });
    $('#close-nav').on('click', () => {
        $('.nav-container').css({"left": "-2000px"});
        $('.backdrop').hide();
    });
    $('#hamburger-menu').on('click', () => {
        $('.nav-container').css({"left": "0"});
        $('.backdrop').show();
    });
    $('#cart-icon').on('click', () => {
        $('.cart-container').toggleClass('show-cart');
        if(isAdd){
            showCartContent();
        }else{
            $('.cart-empty').show();
            $('#cart-item-container').hide();
        }
    });
    cartQty.html() === '0' ? cartQty.hide() : cartQty.show();
    $('#delete-item').on('click', () => {
        quantity = 0;
        val=0;
        $('#quantity-num').attr('value', 0);
        showCartContent();
    });
    $('#add-to-cart').on('click', () => {
        isAdd = true;
        showCartContent();
    })
    function showCartContent(){
        if(quantity === 0){
            cartQty.html(quantity);
            cartQty.hide();
            $('.cart-empty').show();
            $('#cart-item-container').hide();
            return;
        }
        cartQty.html(quantity);
        cartQty.show();
        $('#cart-quantity').html(quantity);
        $('#cart-total-price').html(' $'+125*quantity+'.00');
        if($('.cart-container').hasClass('show-cart')){
            if(quantity === 0){
                $('.cart-empty').show();
                $('#cart-item-container').hide();
                return;
            }
            $('.cart-empty').hide();
            $('#cart-item-container').show();
        }
    }
});

function nextHandler(option, imgOption, index) {
    if(index.start < $(option).length -1){
        imgOptionHandler(option, imgOption, ++index.start);
    }
}
function prevHandler(option,imgOption, index) {
    if(index.start > 0){
        imgOptionHandler(option, imgOption, --index.start);
    }
}
function imgOptionHandler(option, imgOption, i){
    $(option).hide();
    $(option).eq(i).show();
    console.log(i)
    $(imgOption).removeClass('img-option-active');
    $(imgOption).eq(i).addClass('img-option-active');
}