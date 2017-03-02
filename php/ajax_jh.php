<?php
header('Content-type:text/json');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $shuju = "mydemo";
    $conn = mysqli_connect($servername,$username,$password,$shuju);
    $action=$_POST["action"]; 
    $id=$_POST["id"]; 
if($action=="getlink"){
    $query=mysqli_query($conn,"select * from mylist where id=$id"); 
    $row = mysqli_fetch_array($query); 
    $list = array("firstname"=>$row["firstname"],"lastname"=>$row["lastname"],"email"=>$row["email"]); 
    echo json_encode($list); 
};
?>
