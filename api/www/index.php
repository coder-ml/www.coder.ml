<?php
header('Access-Control-Allow-Origin: *');
$data = [];
//$data['SERVER'] = $_SERVER;
$_GET = $get = array_filter(explode('/',trim($_SERVER['REQUEST_URI'],'/')));
$query = array_slice($_GET,2);
$params = count($query);
$endpoints = ['create', 'read', 'update', 'delete'];
$host = $_SERVER['HTTP_HOST'];
$arrhost = explode('.',$host);
$arrhostcount = count($arrhost);
$domain = $arrhost[count($arrhost)-2];
$tld = $arrhost[count($arrhost)-1];
$request_uri = $_SERVER['REQUEST_URI'];
$api = 'api.'.$domain.'.'.$tld;

$server = [
   'HTTP_HOST' => $host,
   'HOST_ARRAY' => $arrhost,
   'HOST_ARRAY_LENGTH' => $arrhostcount,
   'HOST_DOMAIN' => $domain,
   'HOST_TLD' => $tld,
   'REQUEST_URI' => $request_uri
];

if(count($arrhost) > 2) {

    $subdomain = $arrhost[count($arrhost)-3];

    if(count($arrhost) > 3) {

        $data['error'] = ["code" => 404, "message" => "Unauthorized"];
        return http_response_code(404);

    } else {       

        if($host === $api) {
            
            #$data['SERVER']['HOST'] = $api;
            #$data['SERVER']['HOST_MODE'] = 'API';

            if(count($_GET) > 1) {
                header('Content-Type: application/json');
                include('../'.$_GET[0].'/'.$_GET[1].'/index.php');
                $data ? print_r(json_encode($data, JSON_PRETTY_PRINT)) : null;
            } 
            else { return http_response_code(404); }

        }
        else { return http_response_code(404); }

    }

}

unset($data);

?>