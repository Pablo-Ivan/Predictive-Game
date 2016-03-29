<?php
Header("content-type: application/x-javascript");
function data_uri($file)
{ 
  $contents = file_get_contents($file);
  $base64   = base64_encode($contents);
  return ('data:audio/ogg;base64,' . $base64);
}
?>
var sonidos =
{
   "beep"	: new Audio("<?php echo data_uri('beep.ogg');?>"),
   "gol		: new Audio("<?php echo data_uri('gol.ogg');?>"),
   "plop"	: new Audio("<?php echo data_uri('plop.ogg');?>")
};