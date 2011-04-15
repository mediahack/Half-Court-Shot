/**
* @name     Half Court Shot
* @author <codes>      mediaHACK - http://mediahack.com
* @author <pretties>      KomodoMedia - http://komodomedia.com
* @date         2010.07.28
* @version	1.100825
*
* A JSApp that taps the Dribbble API (http://dribbble.com/api) to
* show off a shots and such from players. 
*
* This has been a mediaHACK and KomodoMedia  collab. Our powers
* combined are Super-Sonic-Bionic. Trust pound.
*
* @copyright   yoMama
* @licence  MIT Licensed. Nice if you give origination cred.
* 
**/

/**
* Our main class. It sets up the shot calls from here to dribble.
*
* @param    Settings    Object      A configuration object to setup our shot
* @returns  noshing!
**/
function HalfCourtShot( settings ){
   
    this.settings = settings;
    this.play; // this is going to be our script object
    this.goal = document.getElementsByTagName('body')[0];  // This is where we want the shot to be displayed
    
    var allstarsIMO = [ "rogie", "simplebits", "shauninman", "jsm", "squaredeye"];
    var cointoss = Math.floor(Math.random()*5); 
    this.player = allstarsIMO[ cointoss ];  // This is the player we want to shoot
    this.jersey = this.player;
    
    this.shots = 0;   // How many shots to take
    this.page;
    this.per_page; // how many shots per page...
    
    this.following = false;
    
    this.className = "hcs";
    this.apiUrl = 'http://api.dribbble.com/';
    this.playType = "players";
    this.url = "";
    
    HalfCourtShot.currentIndex = HalfCourtShot.currentIndex || 0;    
    this.index = HalfCourtShot.currentIndex++;
    
    this.debug = false;
    
    /**
    * Our configuration.
    **/
    this.callThePlay = function(){
        var ball = this;
        
        // If we don't have any settings, lets just go with what we got!
        if( ball.settings == null ){ return; } 
        
        // loop thru our provided settings 
        for( var x in ball.settings){
            if( ball[ x]  != undefined )
                ball[ x ] = ball.settings[x];
        }      
        
    }; // this.config = function()
    
    /**
    * Hail Mary shot from our site to Dribbble.
    **/
    this.shootDaBall = function(){
        var ball = this;
        
        var sCallback = "HalfCourtShot.callback" + ball.index;
        HalfCourtShot["callback" + ball.index] = function(data){ ball.jumboTron(data); };
        
        ball.genUrl();
        
        var instId = "halfCourtShot" + ball.currentIndex;
        HalfCourtShot[ instId ] = document.createElement("script");
        HalfCourtShot[ instId ].setAttribute("id", instId);
        HalfCourtShot[ instId ].setAttribute("type", "text/javascript");
        HalfCourtShot[ instId ].setAttribute("src", ball.url );
        
        document.getElementsByTagName('body')[0].appendChild( HalfCourtShot[ instId ] );
        
    }; // this.shootDaBall = function()
    
    /**
    * Display the output
    **/
    this.jumboTron = function(data){
        
        var ball = this;
                
        var bounds = document.createElement("div");
        bounds.setAttribute("class", ball.className);
        
        var imgList = document.createElement("ul");
        var thumbList = document.createElement("ul");
        
        var show = ( ball.shots ) ? ball.shots : data.shots.length;
		if( show > data.shots.length ) show = data.shots.length;
		
        var mainShot = show; // we set this so we know where to stop with our main vs thumbs
        if( ball.warmUp ) show += ball.numberOfLayups; // if we're showing thumbs
        
        // This is if we have multple shots to show
        if( data.shots ){        
            for( var x = 0; x < show; x++ ){                
                var li = ball.buildImageListItem(data.shots[x]);                
                imgList.appendChild(li);                
            }
        }
        else if( data.image_url || data.avatar_url ){
            var li = ball.buildImageListItem(data);
            imgList.appendChild(li);
        }
         
        bounds.appendChild(imgList); // Add the list to the bounds
        
        if( ball.warmUp ) bounds.appendChild(thumbList); // adding thumbs if wanted
        
        if( typeof ball.goal  == 'string' ) ball.goal = document.getElementById( ball.goal );
        
        ball.goal.appendChild(bounds); // add the bounds to the target element aka goal
        ball.goal.innerHTML = ball.goal.innerHTML; // Added for IE7 >=
		
        if( ball.onComplete ){
            ball.onComplete();
        }
        
    }; // this.jumboTron = function(data)
    
    this.buildImageListItem = function( d ){
        
        var image_url = (d.image_url) ? d.image_url : d.avatar_url ;
        
        var a = document.createElement("a");
        a.setAttribute("href", d.url);
        a.setAttribute("title", d.title);
        
        var img = document.createElement("img");
        img.setAttribute("src", image_url);
        
        var lay = document.createElement("span");
        lay.setAttribute("class", "overlay");
        
        if( d.width ) img.setAttribute("width", d.width);
        if( d.height) img.setAttribute("height", d.height);
        if( d.title ) img.setAttribute("title", d.title);
        else if( d.name ) img.setAttribute("title", d.name);
        if( d.title) img.setAttribute("alt", d.title);
        else if( d.name ) img.setAttribute("alt", d.name);
        
        // put the img inside the anchor
        a.appendChild(img);
        
        //put the overlay inside the anchor
        a.appendChild(lay);
        
        // create the LI to hold the anchor
        var li = document.createElement("li");
        
         // put the anchor inside teh LI
        li.appendChild(a);
        
        return li;
    };
    
    /**
    * Generates a unique url for each instance
    **/
    this.genUrl = function(){
        var randomNo = Math.floor(Math.random()*9999999);
        
         if( typeof this.jersey == "string" ){
            if( this.page != undefined  ) pageOpts = "page=" + this.page;
            if( this.per_page != undefined ) pageOpts = pageOpts + "&per_page=" + this.per_page;
        }
        
        if( this.playType == "shots" ){
            var pageOpts = "";
            
            if( this.jersey == "debuts" || this.jersey == "everyone" || this.jersey == "popular" )
                this.url = this.apiUrl + this.playType + "/" + this.jersey + "/" + "?" + pageOpts + "&r=" + randomNo + "&callback=HalfCourtShot.callback" + this.index;
             else                        
                this.url = this.apiUrl + this.playType + "/" + this.jersey + "/" + "?r=" + randomNo + "&callback=HalfCourtShot.callback" + this.index;
            
            if( this.debug ) console.log(this.url);
        }
        else if( this.playType == "players" ){
            var jerseyType = parseInt(this.jersey);
            
            if( parseInt(this.jersey) ){ 
                this.url = this.apiUrl + this.playType + "/" + this.jersey + "/?r=" + randomNo + "&callback=HalfCourtShot.callback" + this.index;
            }
            else{
                var followingOpts = ( eval(this.following) ) ? "following/" : "";
                this.url = this.apiUrl + this.playType + "/" + this.jersey + "/shots/" + followingOpts + "?r=" + randomNo + "&callback=HalfCourtShot.callback" + this.index;
            }
        }
        
    }; // this.genUrl = function()
    
    /**
    * Object dump
    **/
    this.rideThePine = function( v ){
        if(this.debug) console.log( this[v] );
    }; // this.rideThePine = function( v )
    
    /**
    * Our init
    **/
    this.hitTheFloor = function(){
        this.callThePlay();
        this.shootDaBall();
    }; //  this.init = function()
    
    this.hitTheFloor();
    
} // function HalfCourtShot( settings )
