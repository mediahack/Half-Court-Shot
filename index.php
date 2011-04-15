<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd"
    >
<html lang="en">
<head>
    <title>Half-Court Shot</title>
    <link href="http://code.mediahack.com/apps/half-court-shot/style/half-court-shot.css" rel="stylesheet" />
</head>
<body>
    
    <h1>Half-Court Shot</h1>
    <p>This jsApp is standalone and will fetch your dribble shots from across the court (aka Internets) and display them in a fancy little widgeto</p>
    
    <h2>Usage</h2>
    <p>The instances of a shot can be passed a settings object.</p>
    
    <h3>Object Properties Supported</h3>
    <ul>
        <li>goal: Target to put the app into. Default is appended to body tag</li>
        <li>jersey: Who do you want to watch shoot? Default is random from simplebits, rogie, shauninman, jsm</li>
        <li>playType: shots|players</li>
    </ul>
    
    <div id="myShots"></div>

<script type="text/javascript">
try{
    (function(){
        var ssb = document.createElement('script'); ssb.type = 'text/javascript'; ssb.src = "js/half-court-shot.jsapp.mh.js";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ssb, s);
        ssb.onload = function(){
            var hcs = new HalfCourtShot();
            //var hcs2 = new HalfCourtShot( <?php echo json_encode($_GET); ?> );           
        }
    })();
    
} catch(err) { console.log( err ); }</script>
    
</body>
</html>
