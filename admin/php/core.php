<?php
    $action=$_POST['action'];

    require_once 'function.php';

    switch($action){
        case "init":
            init();
            writeJSON();
            break;
        case "selectOneGoods":
            selectOneGoods();
            break;
        case "updateGoods":
            updateGoods();
            break;
        case "newGoods":
            newGoods();
            break;
        
    }