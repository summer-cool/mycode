<?php 
header("Content-type:text/html;charset=utf-8");
setcookie("user", "leejian", time()+3600);
session_start();
if (isset($_COOKIE["user"])) {
    echo "HEllo     ".$_COOKIE["user"];
}else{
    echo "普通房客<br>";
};
if (isset($_SESSION["views"])) {
    $_SESSION["views"]=$_SESSION["views"] + 1;
    unset($_SESSION["views"]);
}else{
    echo $_SESSION["views"] = 1;
    echo "浏览量：".$_SESSION["views"];
};
$int = 123;
if (!filter_var($int,FILTER_VALIDATE_INT)) {
    echo "不是一个合法的数据";
}else{
    echo "合法";
};
 class Emp{
    public $name = "";
    public $age = "";
    public $birthday = "";
 };
 $e = new Emp();
 $e ->name = "lee";
 $e ->age = "26";
 $e ->birthday = "2014/01/05";
 echo json_encode($e);

// $allowedExts = array('gif','png','jpeg');
// $temp = explode('.',$_FILES['file']['name']);
// $fileName = end($temp);
// echo $_FILES['file']['type'];
// if ((($_FILES['file']['type'] == 'image/gif')||($_FILES['file']['type'] == 'image/png')||($_FILES['file']['type'] == 'image/jpeg')&&($_FILES['file']['size'] < 240000)) && in_array($fileName,$allowedExts)
//     ) {
//      if ($_FILES['file']['error'] > 0) {
//         echo "错误:".$_FILES['file']['error']."<br>";
//      }else{
//         echo "文件名:".$_FILES['file']['name']."<br>";
//         echo "文件类型:".$_FILES['file']['type']."<br>";
//         echo "文件大小:".($_FILES['file']['size']/10000)."kb<br>";
//         echo "文件存储位置:".$_FILES['file']['tmp_name']."<br><br>";
//         if (file_exists('kk/'.$_FILES['file']['name'])) {
//             echo "该文件已经上传过了";
//         }else{
//             move_uploaded_file($_FILES['file']['tmp_name'],'kk/'.$_FILES['file']['name']);
//             echo "上传成功~~~~~~~~";
//         }
//      }
// }else{
//     echo "文件格式不对无法上传";
// }
?>
