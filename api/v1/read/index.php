<?php
if(count($_GET) > 2) { include($_GET[2].'.php'); }
else { return http_response_code(404); }
?>