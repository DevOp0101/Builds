<?PHP

$user = $_POST['username'];
$inv = $_POST['inv'];



$con = mysqli_connect("fdb1031.runhosting.com:3306","4364293_devopdata","abc123efg", "4364293_devopdata") or ("Cannot connect!"  . mysql_error());
if (!$con)
	die('Could not connect: ' . mysql_error());
	

$check = mysqli_query($con, "SELECT * FROM `Score` WHERE `username` = '".$user."'");
$numrows = mysqli_num_rows($check);
if($numrows == 0)
{   
    $ins = mysqli_query($con, "INSERT INTO `Score` ( username , inv ) VALUES ('" . $user . "' , '" . $inv . "'); ");
    if ($ins)
        die ("Successfully Created User Inventory");
    else
        die ("Error: " . mysql_error());
}
else
{
    $upd = mysqli_query($con, "UPDATE `Score` SET inv ='" . $inv . "' WHERE `username` = '".$user."'");
    if($upd)
        die ("Successfully Updated User Inventory");
    else
        die("Error: " + mysql_error());
}

?>