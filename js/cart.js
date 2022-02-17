var cart={};

$(document).ready(function loadCart(){
    //if localStorage have notice about cart put it to cart
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else{
        $('#here').html('Корзина пуста!');
        countItemsInCart();
        $('#price').html("0");
    }
    $('#send-email').on('click',sendEmail);//email with products
    $('#ephone').on('keyup', function(){
        $(this).val($(this).val().replace (/\D/, ''));
    });
});

function sendEmail(){
    var ename=$('#ename').val();
    var ephone=$('#ephone').val();
    if(ename!="" && ephone!=""){
        if(!isEmpty(cart)){
            alert("Корзина пуста,заказ не возможен");
        }
        else{
            $.post(
                "../../core/mail.php",
                {
                    "ename" : ename,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    console.log(data);
                }
            );
        }
    }
    else{
        alert("Заполните поля!");
    }
    
}

function loadCarts(){
    //if localStorage have notice about cart put it to cart
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else{
        $('#here').html('Корзина пуста!');
        countItemsInCart();
    }
}


function showCart(){
    if(!isEmpty(cart)){
        $('#here').html('Корзина пуста!');
        countItemsInCart();
        $('#price').html("0");
    }
    else{
        $.ajax({
            method:'get',
            dataType: "json",
            url:"../../json/catalog.json",
            dataType:'json',
            success:function(data){
                var out='';
                var price='';
                var full=0;
                for(var id in cart){
                    buffer='';
                    out+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">'
                    out+=`<button class="mince-goods" data-id="${id}">x</button>`;
                    out+='<div class="product-wrap">'
                    out+=`<img src="../../images\\${data[id].image}">`;
                    out+='</div>'
                    out+=`Название: ${data[id].name}<br>`;
                    out+=`<button class="del-goods" data-id="${id}">-</button> `
                    out+=`Кол-во: ${cart[id]} `;
                    out+=`<button class="plus-goods" data-id="${id}">+</button><br>`
                    out+=`Цена: ${data[id].cost}<br>`;
                    out+='</div>'
                    buffer+=data[id].cost;
                    buffer*=cart[id];
                    full+=Number(buffer);
                }
                $('#here').html(out);
                $('#price').html("Итого: "+full+"грн");
                $('.del-goods').on('click',delGoods);
                $('.add-to-cart').on('click',getItemsToCart);
                $('.plus-goods').on('click',plusGoods);
                $('.mince-goods').on('click',minceGoods);
                countItemsInCart();
            }
        });
    }
}

function minceGoods(){
    var id=$(this).attr('data-id');
    delete cart[id];
    saveCart();
    loadCarts();
    countItemsInCart();
}

function plusGoods(){
    var id=$(this).attr('data-id');
    cart[id]++;
    saveCart();
    loadCarts();
}

function countItemsInCart(){
    var count=1;
    for(var kkk in cart) {
        count+=cart[kkk];
    }
    count--;
    if(count!=0){
        $('.badge').html(count);
    }
    else{
        $('.badge').html('');
    }
}

function getItemsToCart(){
    saveCart();
    loadCarts();
    countItemsInCart();
}

function delGoods(){
    //delete product from cart
    var id=$(this).attr('data-id');
    if(cart[id]==1)
    {
        delete cart[id];
    }
    else
    {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

function isEmpty(object){
    //empty or not
    for(var key in object){
    if(object.hasOwnProperty(key)) {
        return true;
    }
    else{
    return false;
    }
    }
}