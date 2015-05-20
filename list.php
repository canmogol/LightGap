<?php
sleep(1);
$arr = array();
$charactersUpper1 = 'AEIOU';
$charactersUpper2 = 'BCDFGHKLMNPRSTVWYZ';
$characters1 = 'aeiou';
$characters2 = 'bcdfghklmnprstvwyz';
$randomString = '';
for ($i = 0; $i < 100; $i++) {
    $randomString = ucwords($characters1[rand(0, strlen($characters1) - 1)]);
    $randomString .= $characters2[rand(0, strlen($characters2) - 1)];
    $randomString .= $characters1[rand(0, strlen($characters1) - 1)];
    $randomString .= $characters2[rand(0, strlen($characters2) - 1)];
    $randomString .= $characters1[rand(0, strlen($characters1) - 1)];
    $randomString .= " ";
    $randomString .= $charactersUpper2[rand(0, strlen($charactersUpper2) - 1)];
    $randomString .= $charactersUpper1[rand(0, strlen($charactersUpper1) - 1)];
    $randomString .= $charactersUpper2[rand(0, strlen($charactersUpper2) - 1)];
    $randomString .= $charactersUpper1[rand(0, strlen($charactersUpper1) - 1)];
    $randomString .= $charactersUpper2[rand(0, strlen($charactersUpper2) - 1)];
    $randomString .= $charactersUpper1[rand(0, strlen($charactersUpper1) - 1)];
    array_push($arr, array('id' => $i, 'name' => $randomString));
}
echo json_encode($arr);
?>