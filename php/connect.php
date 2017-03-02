<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>connect</title>
</head>
<body>
<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $cnname = "mydemo";
    $conn = mysqli_connect($servername,$username,$password,$cnname);
    if ($conn->connect_error) {
        echo connect_error;
    }else{
        echo "连接陈宫!";
    };
    $sql =$conn->prepare("INSERT INTO mylist(firstname,lastname,email) VALUES(?,?,?)");
    $sql->bind_param("sss",$firstname,$lastname,$email);
    $firstname = "nimei";
    $lastname = "nidaye";
    $email = "heihei.com";
    $sql->execute();
    // if ($conn->query($sql)===TRUE) {
    //     echo "添加陈宫";
    // };
    $conn->close();
?>
</body>
</html>