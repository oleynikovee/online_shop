<?php
    $servername="localhost";
    $username="root";
    $password="";
    $dbname="catalog";
    $selected='';

    function connect(){
        $connect=mysqli_connect("localhost","root","","catalog");
        if(!$connect){
            die("Connection failed" . mysqli_connect_error());
        }
        mysqli_set_charset($connect,'utf8');
        return $connect;
    }
    function init(){
        //Out product list
        $conn=connect();
        $sql="SELECT id , name FROM catalog";
        $result=mysqli_query($conn,$sql);

        if(mysqli_num_rows($result)>0){
            $out=array();
            while($row=mysqli_fetch_assoc($result)){
                $out[$row["id"]]=$row;
            }
            echo json_encode($out);
        }
        else{
            echo "0 продуктов в списке!";
        }
        mysqli_close($conn);
    }    
    function selectOneGoods(){
        $conn=connect();
        $id=$_POST['gid'];
        $sql="SELECT * FROM catalog WHERE id='$id'";
        $result=mysqli_query($conn,$sql);

        if(mysqli_num_rows($result)>0){
            $row=mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
        else{
            echo "0 продуктов в списке!";
        }
        mysqli_close($conn);
    }

    function updateGoods(){
        $conn=connect();
        $id=$_POST['gid'];
        $name=$_POST['gname'];
        $category=$_POST['gcategory'];
        $cost=$_POST['gcost'];
        $img=$_POST['image'];

        $sql = "UPDATE catalog SET category='$category', name='$name', cost='$cost', image='$img' WHERE id='$id' ";

        if (mysqli_query($conn, $sql)) {
        echo "1";
        } else {
        echo "Error updating record: " . mysqli_error($conn);
        }
        mysqli_close($conn);
        writeJSON();
    }
    function newGoods(){
        $conn=connect();
        $name=$_POST['gname'];
        $id=$_POST['gid'];
        $category=$_POST['gcategory'];
        $cost=$_POST['gcost'];
        $img=$_POST['image'];

        $sql = "INSERT INTO catalog(id,category,name,cost, image)
        VALUES ('$id','$category','$name','$cost', '$img')";
        
        if (mysqli_query($conn, $sql)) {
          echo "1";
        } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
        writeJSON();
    }

    function writeJSON(){
        //Out product list
        $conn=connect();
        $sql="SELECT * FROM catalog";
        $result=mysqli_query($conn,$sql);
        
        if(mysqli_num_rows($result)>0){
            $out=array();
            while($row=mysqli_fetch_assoc($result)){
            $out[$row["id"]]=$row;
        }
        file_put_contents ('../../json/catalog.json', json_encode($out));
        }
        else{
        echo "0 продуктов в списке!";
        }
        mysqli_close($conn);
    }
?>