<?php
unset($get[0]); unset($get[1]); unset($get[2]);
$get = array_values($get);
//$ep = $data['get'] = $get = array_values($get);
//$data['count'] = $epc = $count = count($get);
//$data['SERVER'] = $_SERVER;

$path = $data['path'] = __DIR__;
set_include_path($path);

$data['params'] = $get;

$data['count'] = $count = count($data['params']);

$file = date("Y-m-d\TH:i:s\Z", strtotime('now'));

$data['count'] = $count = count($data['params']);

if($count > 1) {
      
    $apikey = '';
    require_once __DIR__.'/../../pkg/Google/vendor/autoload.php';    
    $client = new Google_Client();
    $client->setAuthConfig($path.'/../../pkg/Google/client_secret.json');
    $client->setApplicationName("YouTube Fetcher");
    $client->setDeveloperKey($apikey);
    $client->setAccessType('offline');        // offline access
    $client->setIncludeGrantedScopes(true);   // incremental auth
    $youtube = new Google_Service_YouTube($client);
    
    if($count > 0) {


            if($count > 1) {
            
                if($count > 2 && $data['params'][0] === 'youtube') {

                    $data['task'] = "Fetch YouTube Videos";
                    //$myfile = fopen($_SERVER['DOCUMENT_ROOT']."/time.php", strtotime("now"));

                    $data['query'] = $_SERVER['QUERY_STRING'];
                    //$keyword = parse_url($data['query'])['q'];
                    $keyword = 'iphone';

                    $search = $youtube->search->listSearch('id,snippet', array(
                      'q' => $keyword,
                      'maxResults' => 50,
                    ));

                    $handle ? fwrite($handle, $file) : null;

                    $data['response'] = $search;
                    $data['response']['items'] = $search['items'];

                    function search($v,$array) {
                        $item = null;
                        $data['array'] = $array;
                        foreach($array as $struct) {
                            if ($v == $struct[$v]) {
                                $item = $struct;
                                break;
                            }
                        }
                    }

                }

            }


    }

    $handle = fopen($path.'/index.txt','w');
}
?>