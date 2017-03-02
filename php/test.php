
<?php
$allowname = array("jpg","jepg","png","gif");
$temp = explode(".",$_FILES["file"]["name"]);
$extention = end($temp);
if((($_FILES["file"]["type"]=="image/jpg")||($_FILES["file"]["type"]=="image/png")
    ||($_FILES["file"]["type"]=="image/gif")||($_FILES["file"]["type"]=="image/jepg")
    )&&($_FILES["file"]["size"]<2048000)&&in_array($extention,$allowname)){

    if ($_FILES["file"]["error"]>0) {
        echo $_FILES["file"]["error"]."<br>";
     }else{
        echo "文件类型:".$_FILES["file"]["type"]."<br>";
        echo "文件名:".$_FILES["file"]["name"]."<br>";
        echo "文件大小:".$_FILES["file"]["size"]."<br>";
        echo "文件存储位置:".$_FILES["file"]["tmp_name"]."<br>";
        if (file_exists("upload/" . $_FILES["file"]["name"])) {
            echo $_FILES["file"]["name"] . "已经存在";
        }else{
            move_uploaded_file($_FILES["file"]["tmp_name"],"upload/" . $_FILES["file"]["name"]);
            echo "文件存数在" . $_FILES["file"]["tmp_name"];
        }
     }
}else{
    echo "文件格式不对";
}
?>
