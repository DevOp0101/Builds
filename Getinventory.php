<?PHP

$user = $_POST['username'];


$con = mysqli_connect("DA PMA Signon:3306","mpfhesxt_Data","abc123efg", "mpfhesxt_Data") or ("Cannot connect!"  . mysql_error());
if (!$con)
	die('Could not connect: ' . mysql_error());
	

$check = mysqli_query($con, "SELECT * FROM `Score` WHERE `username`='".$user."'");
$numrows = mysqli_num_rows($check);
if ($numrows == 0)
{
	die ("Username does not have a character");
}
else
{
    while($row = mysqli_fetch_assoc($check))
	{
		echo $row['inv'];
	}
}

?>
