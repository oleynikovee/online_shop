$(document).ready(function () {
$.ajax({
  method:'get',
  dataType: "json",
  url:"../../json/catalog.json",
  dataType:'json',
  success: function(data){
    var out='';
    console.log(data);
    for(var key in data){
      if(data[key].category==$('#id_of_page').attr('Value')){
      out+='<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-inner container-fluid">';
      out+='<div class="product-wrap">';
      out+=`<div><a href="../../images/${data[key].image}" class="lightzoom"><img src="../../images/${data[key].image}"></a></div>`;
      out+='<div class="actions">';
      out+=`<a href="" class="add-to-cart" data-id=${key}></a>`; 
      out+='</div>';
      out+='</div>';
      out+='<div class="product-info">';
      out+=` <p class="font-italic">${data[key].name}</p>`;
      out+=`<span class="price" style="vertical-aligh:bottom;">${data[key].cost} грн</span><button class="add-to-cart" data-id="${key}" style="margin-left:3px"><img src="../../images/archive.svg"></button>`;
      out+='</div>';
      out+='</div>';
      }
    } 
    $('#put_catalog').html(out);
    $('.add-to-cart').on('click',addToCart);
    loadCart();
  }
});
});
function addToCart(){
//Get product to cart
  var id=$(this).attr('data-id');
  if(cart[id]==undefined){
    cart[id]=1;//if product is not in cart
  }
  else{
    cart[id]++;
  }
  saveCart();
  getItemsToCart();
}

function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));//cart to string;
}

function loadCart(){
  //find nums of products in carts
  if(localStorage.getItem('cart')){
    //if true -put in cart
    cart=JSON.parse(localStorage.getItem('cart'));
  }
}
;( function( $ ) {

  $( '.lightzoom' ).lightzoom( {
    boxClass: "my-box-class",
    speed: 400,
    viewTitle: true,
    isOverlayClickClosing:true,
    isWindowClickClosing: true,
    isEscClosing: true,
    titleColor: "red",
    overlayColor: ""
  } );

} )( jQuery );