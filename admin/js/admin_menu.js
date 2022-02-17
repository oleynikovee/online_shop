var counter=0;
function init() {
    $.post(
        "php/core.php",
        {
            "action":"init"
        },
        showGoods,
    );
}

function showGoods(data){
    data=JSON.parse(data);
    var out='<select>';
    out+='<option data-id="0">Новый товар</option>';
    counter=0;
    for(var id in data){
        out+=`<option data-id="${id}">${data[id].name}</option>`;
        counter++;
    }
    out+='</select>';
    $('.goods-out').html(out);
    $('.goods-out select').on('change',selectGoods);
}

function selectGoods(){
    var id=$('.goods-out select option:selected').attr('data-id');
    if(id==0||id==undefined)
    {
        $('#gname').val('');
        $('#gcost').val('');
        $('#gcategory').val('');
        $('#img').val('');
        $('#gid').val('0');
    }
    else{
        $.post(
            "php/core.php",
            {
                "action" : "selectOneGoods",
                "gid" : id
            },
            function(data){
                data=JSON.parse(data);
                console.log(data.id);
                $('#gname').val(data.name);
                $('#gcost').val(data.cost);
                $('#gcategory').val(data.category);
                $('#img').val(data.image);
                $('#gid').val(data.id);
            }
        );
    }
}

function saveToDb(){
    var id=$('#gid').val();
    console.log(id);
    if(id !=0){
        $.post(
            "php/core.php",
            {
                "action" : "updateGoods",
                "gid" : id,
                "gname" : $('#gname').val(),
                "gcategory": $('#gcategory').val(),
                "gcost" : $('#gcost').val(),
                "image" : $('#img').val()
            },
            function(data){
                if(data==1){
                    init();
                    alert('Запись добавлена');
                }
                else{
                    console.log(data);
                }
            }
        );
    }
    else{
        console.log('new');
        $.post(
            "php/core.php",
            {
                "action" : "newGoods",
                "gid": counter+1,
                "gname" : $('#gname').val(),
                "gcategory": $('#gcategory').val(),
                "gcost" : $('#gcost').val(),
                "image" : $('#img').val()
            },
            function(data){
                if(data==1){
                    init();
                    alert('Запись добавлена');
                    selectGoods();
                }
                else{
                    console.log(data);
                }
            }
        );
    }
}

$(document).ready(function(){
    init();
    $('.add-to-db').on('click',saveToDb);
});