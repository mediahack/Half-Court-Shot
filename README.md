#Half-Court Shot

This jsApp will fetch your [Dribbble](http://dribbble.com) shots from across the court (aka Internets) and display them in a fancy little widgeto. It was a collab effort between [mediaHACK](http://blog.mediahack.com) <codes> and [Rogie](http://rog.ie) <pretties>.

If you have any questions, suggestions or issues let me know via twitter [@mediahack](http://twitter.com/mediahack).

##Usage
###NOTE 
If you plan on using Github as a CDN you may run into problems because the RAW content doesn't provide the content-types and browsers may not process the CSS and JS properly. 

If you want to just use this and instantly go, copy the code directly below and replace the jersey name "Rogie" with your own.

	<link href="//cdn.rawgit.com/mediahack/Half-Court-Shot/master/css/hcs.css" rel="stylesheet" type="text/css" />
    <div id="dribbble"></div>
    <script type="text/javascript" src="//cdn.rawgit.com/mediahack/Half-Court-Shot/master/js/hcs.jsapp.mh.min.js"></script>
    <script type="text/javascript">var hcs = new HalfCourtShot({ jersey: "Rogie", shots: 4, goal: 'dribbble' });</script>

The instances of a shot can be passed a settings object. If you don't give it a settings object then you'll just get the app appended to your HTML body tag.

##Styles

There is a default style sheet you can include.

####Github as a CDN
    <link href="//cdn.rawgit.com/mediahack/Half-Court-Shot/master/css/hcs.css" rel="stylesheet" />
    
####Local Dev Copy
    <link href="//css/half-court-shot.css" rel="stylesheet" />

##Settings

A settings object with the following properties can be passed to the constructor. 
* **goal**: Target to put the app into. For example,`<div id="mydribbble"></div>`. Default is appended to body tag. 
* **jersey**: Who do you want to watch shoot? Default is random from rogie, simplebits, shauninman, jsm
* **playType**: shots|players
* **shots**: The number of shots to return
* **className**: This will override the app container with the class you want to use
* **page**: The current page you want to view
* **per_page**: How many shots per page
* **following**: Show who the player (specified by the jersey property) is following 

##Examples

Basic with no tweaking. The HCS object we create is arbitrary. You can call it whatever you want and create as many instances as you want. Just drop these script tags at the bottom of your page before the closing body tag.

    <script src="//cdn.rawgit.com/mediahack/Half-Court-Shot/master/js/hcs.jsapp.mh.min.js"></script>
    <script>var hcs = new HalfCourtShot();</script>

This example is targeted at [Rogie](http://rog.ie) and an element where he wanted the app to be injected into

    <script src="//cdn.rawgit.com/mediahack/Half-Court-Shot/master/js/hcs.jsapp.mh.min.js"></script>
    <script>var hcs = new HalfCourtShot({ jersey: "Rogie", shots: 6, goal: "dribbble" });</script>