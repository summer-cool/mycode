<?php 
   header('Content-type:text/json');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dataName = "MrMg";
    $conn = mysqli_connect($servername,$username,$password,$dataName);
    $nameVal = $_POST["user"];
    $pwd = $_POST["password"];
    $sql = mysqli_query($conn,"select Name,Password from MyGuests where Name='$nameVal' and Password='$pwd'");
    if ($row = mysqli_fetch_array($sql)) {
        $list = array("result"=>true,"user"=>$row["Name"]); 
        echo json_encode($list);
    }else{
        $list = array("result"=>false,"user"=>"uu"); 
        echo json_encode($list);
    };
 ?>