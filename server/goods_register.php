<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "INSERT INTO `user1`(`name` , `pwd`) VALUES('{$userName}' , '{$userPwd}')";

$result = mysqli_query($link, $sql);

// // 写入成功,执行结果是true,写入失败是false
if($result == true){
    echo json_encode(['result'=>1,'msg'=>'注册成功']);
}else{
    echo json_encode(['result'=>0,'msg'=>'注册失败']);
}