<?php
include_once './config.php';

// 接收参数
$id = $_POST['goods_id'];

// 链接数据库,执行查询语句

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `goods` WHERE `goods_id` = {$id} ";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_assoc($result);

echo json_encode($arr);