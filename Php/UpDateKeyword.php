<?php
	require 'Database.php';
	header("content-type:application/json");
	
	$num=5; //显示条数
	$keyword='';
	$resultcount=0;
	$tag=0;
	//数据库配置信息(用户名,密码，数据库名，表前缀等)
	if(isset($_GET['keyword'])){
		$keyword = replaceSpecialChar($_GET['keyword']);
	}else{
		return false;
	}

	if(isset($_GET['resultcount'])){
		$result=(int)$_GET['resultcount'];
		$resultcount = ($result<=0)?0:$result;
	}

	if(isset($_GET['num']) && $_GET['num']<=10 && (int)$_GET['num']>0){
		$num=(int)$_GET['num'];
	}

	if($keyword){
		$sql = "select id,keyword from keywords where keyword ='".$keyword."' and date>='".date('Y-m-d')."';";
		$res = $dbh->query($sql);
		// $mNums = $dbh->exec($res);
		$row=$res->fetchAll();
	}else{
		if(count($_GET['keyword'])>0){
			return false;
		}
	}

	$data=array();
	foreach ($row as $key => $value) {
		$data[$value[0]]=$value[1];
	}

	if($resultcount > 0){
		if(in_array($keyword, $data)){
			$keys=array_search($keyword,$data);
			if(update($dbh,$keys)){
				$tag=1;
			}else{
				$tag=0;
			}
		}else{
			if(insert($dbh,$keyword)){
				$tag=1;
			}else{
				$tag=0;
			}
		}		
	}

	if($resultcount == 0){
		if(insert_new($dbh,$keyword)){
			$tag=1;
		}
	}

	if($tag){
		echo 'true';
	}
	sort($data);
	// mysql_free_result($res);

	//过滤特殊符号
	function replaceSpecialChar($strParam){
    	$regex = "/\/|\~|\!|\@|\#|\\$|\%|\^|\&|\*|\(|\)|\_|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\.|\/|\;|\'|\`|\-|\=|\\\|\|/";
    	return preg_replace($regex,"",$strParam);
	}

	function insert($dbh,$keyword){
		$sql="insert into `keywords` (`keyword`,`date`,`lastmodified`, `weight`) values('".$keyword."','".date('Y-m-d')."','".date('Y-m-d')."', 50);";
		$dbh->exec($sql);
		return true;
	}

	function insert_new($dbh,$keyword){
		$d=date('Y-m-d');
		$sql="insert into `leakkeywords` (`keyword`,`lastmodified`) values('{$keyword}','{$d}');";
		$dbh->exec($sql);
		return true;
	}

	function update($dbh,$id){
		$d=date('Y-m-d');
		$sql="update `keywords` set count=count+1,lastmodified='{$d}' where id =".$id.";";
		$dbh->exec($sql);
		return true;
	}

?>