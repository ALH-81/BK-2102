<?php
include_once './config.php';

// 根据前端的传参,来执行数据库查询操作
// 将查询结果的数组,以json串的形式返回给前端

// 接收参数
$cat_one_id = $_GET['cat_one_id'];
$page = $_GET['page'];
$line = $_GET['line'];

$startLine = ($page-1) * $line;


// 链接数据库,执行查询语句

// 通过当前需要显示的页数,和每页的数据数量,可以计算起始数据的索引下标

// (当前页-1) * 每页的数据数量

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

// 分页查询部分
// 执行时的数据是前端传参的数据
$sql = "SELECT * FROM `goods` WHERE `cat_one_id` = '{$cat_one_id}' LIMIT {$startLine}  , {$line} ";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);


// 需要PHP程序反馈查询信息给前端内容

// 查询所有的匹配的数据数量

$sqlAll = "SELECT COUNT(*) as `num` FROM `goods` WHERE `cat_one_id` = '{$cat_one_id}' ";
$stmtAll = mysqli_query($link, $sqlAll);
$numArr = mysqli_fetch_assoc($stmtAll);
$row = $numArr['num'];

// 根据数据总量和每页的数据数量,可以计算总页数
// 总页数 / 每页的数据数量  向上取整

$sumPage = ceil($row / $line); 


// 给查新结果添加属性,属性值是查询的数据中数


$resArr = [
    'data' => $arr,
    'row' => $row,
    'sumPage' => $sumPage,
    'page' => $page,
    'line' => $line,
];

echo json_encode($resArr);