<?php
sleep(1);
$arr = array('isLogged' => 'true', 'message' => 'Welcome', 'user' => 'John Doe');
$headers = apache_request_headers();
foreach ($headers as $header => $value) {
    $arr[$header] = $value;
}
foreach ($_REQUEST as $key => $value) {
    $arr[$_SERVER['REQUEST_METHOD']][$key] = urldecode($value);
}
echo json_encode($arr);
?>