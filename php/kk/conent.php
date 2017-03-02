<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";
// 创建连接
$conn =mysqli_connect($servername, $username,$password,$dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$sql = "SELECT * FROM user WHERE firstname='b'";
$result = mysqli_query($conn,$sql);
while ($row = mysqli_fetch_array($result)) {
    echo $row['firstname']."<br>";
}
$conn->close();
 ?>
</body>
</html>