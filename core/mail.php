<?php
require_once '../phpmailer/phpmailer/PHPMailerAutoload.php';
//json of catalog
    $JSON=file_get_contents('../json/catalog.json');
    $JSON=json_decode($JSON,true);
//message of catalog
    $summ=0;
    $message='';
    $message.='<h1>Заказ в магазине<h1>';
    $message.='<p>Имя: '.$_POST['ename'].'</p>';
    $message.='<p>Телефон: '.$_POST['ephone'].'</p>';
    $message.='<p>Наименование товара:</p>';

    $cart=$_POST['cart'];

    foreach ($cart as $id=>$count){
        $message.=$JSON[$id] ['name'].'<br>'.' Кол-во: ';
        $message.=$count.'<br>'.' Сумма за этот товар: ';
        $message.=$count*$JSON[$id] ['cost'].'<br>'.'----------------------';
        $message.='<br>';
        $summ=floatval($summ)+floatval($count*$JSON[$id] ['cost']);
    }
    $message.='<p>Итого: '.$summ.'</p>';
        
    $mail = new PHPMailer;

    $mail->isSMTP();

    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'login*'; // логин от вашей почтыs
    $mail->Password = 'password*'; // пароль от почтового ящика
    $mail->SMTPDebug = 2;  // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPSecure = 'tls';
    $mail->Port = '587';

    $mail->CharSet = 'UTF-8';
    $mail->From = 'from'; // адрес почты, с которой идет отправка
    $mail->FromName = ''.$JSON.[$id] ['name'].''; // имя отправителя
    $mail->addAddress('to',);
    $mail->isHTML(true);

    $mail->Subject = 'Заказ в интернет магазине';
    $mail->Body = $message;
    if( $mail->send() ){
        echo 'Письмо отправлено';
    }else{
        echo 'Письмо не может быть отправлено. ';
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }
    
?>