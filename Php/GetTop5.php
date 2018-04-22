<?php
	require 'Database.php';
	$num=5; //显示条数
	$day=1;
	$force=false;

	if(isset($_GET['day']) && $_GET['day']<=168 && (int)$_GET['day']>0){
		$day=(int)$_GET['day'];
	}

	if(isset($_GET['force'])){
		$force=(bool)$_GET['force'];
	}
	$time = date('Y-m-d',strtotime("-{$day} days"));
	$sql = "select json,lastmodified from jsonresult where lastmodified >'{$time}' limit 1;";
	$res = $dbh->query($sql);
	// $mNums = $dbh->exec($sql);
	$row = $res->fetchAll();
	
	if(empty($row) || $force){
		$d=date('Y-m-d',strtotime("-30 days"));
		$sql = "select keyword, max(weight) as w, sum(count) as c from keywords where lastmodified >= '".$d."' group by keyword order by w desc, c desc limit 5;";
		$res = $dbh->query($sql);
		// $weight_num= $dbh->exec($res);
		$row=$res->fetchAll();
		$data=array();
		foreach ($row as $key => $value) {
			$data[]=$value[0];
		}

		$sql="select * from jsonresult limit 1;";
		$res = $dbh->query($sql);
		// $num= $dbh->exec($res);
		if($res){
			if(update($dbh,$data)){
			 	$reslt = json_encode($data);
			}	
		}else{
			if(insert($dbh,$data)){
			 	$reslt = json_encode($data);
			}	
		}
	}else{
		$reslt = json_encode(unserialize($row[0][0]));
	}

	// mysql_free_result($res);
	header("content-type:application/json");
	echo $reslt;
	

	function insert($dbh,$data){
		$d=date('Y-m-d');
		$sql="insert into `jsonresult` (`json`,`lastmodified`) values('".serialize($data)."','{$d}');";
		$dbh->exec($sql);
		return true;
	}

	function update($dbh,$data){
		$data=serialize($data);
		$d=date('Y-m-d');
		$sql="update `jsonresult` set json='{$data}',lastmodified='$d' where id =1;";
		$dbh->exec($sql);
		return true;
	}
?>