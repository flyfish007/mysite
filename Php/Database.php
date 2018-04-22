<?php 
	ini_set("error_reporting","E_ALL & ~E_NOTICE");
	header("Content-Type: text/html;charset=utf-8");

	date_default_timezone_set('Asia/Shanghai');

	$dbms='mysql';     //数据库类型
	$host='mysql'; //数据库主机名
	$dbName='maxus_d90';    //使用的数据库
	$user='test';      //数据库连接用户名
	$pass='ttt123';          //对应的密码
	$dsn="$dbms:host=$host;dbname=$dbName";	

	try {
	    $dbh = new PDO($dsn, $user, $pass); //初始化一个PDO对象

	} catch (PDOException $e) {
	    die ("Error!: " . $e->getMessage() . "<br/>");
	}

?>