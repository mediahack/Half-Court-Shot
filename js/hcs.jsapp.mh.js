/**
* @name     Half Court Shot
* @author <codes>      mediaHACK - http://mediahack.com
* @author <pretties>       Rogie - http://rog.ie
* @date         2013.12.13
* @version  1.2
*
* A JSApp that taps the Dribbble API (http://dribbble.com/api) to
* show off a shots and such from players. 
*
* This has been a mediaHACK and Rogie  collab. Our powers
* combined are Super-Sonic-Bionic. Trust pound.
*
* @copyright   whatevs
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
    var self = this;

    self.settings = settings;
    self.play; // this is going to be our script object
    self.goal = document.getElementsByTagName('body')[0];  // This is where we want the shot to be displayed
    
    var allstarsIMO = [ "rogie", "simplebits", "shauninman", "jsm", "squaredeye"];
    var cointoss = Math.floor(Math.random()*5); 
    self.player = allstarsIMO[ cointoss ];  // This is the player we want to shoot
    self.jersey = self.player;
    
    self.shots = 0;   // How many shots to take
    self.page = 1;
    self.per_page; // how many shots per page...
    
    self.following = false;
    
    self.className = "hcs";
    self.apiUrl = 'http://api.dribbble.com/';
    self.playType = "players";
    self.url = "";
    
    HalfCourtShot.currentIndex = HalfCourtShot.currentIndex || 0;    
    self.index = HalfCourtShot.currentIndex++;
    
    self.debug = false;
    
    /**
    * Our configuration.
    **/
    self.callThePlay = function(cb){
        var ball = this;
        
        // If we don't have any settings, lets just go with what we got!
        if( ball.settings == null ){ return; } 
        
        // loop thru our provided settings 
        for( var x in ball.settings){
            if( ball[ x]  != undefined )
                ball[ x ] = ball.settings[x];
        }      

        if(typeof cb == 'function'){
            cb();
        }
        
    }; // self.config = function()
    
    /**
    * Hail Mary shot from our site to Dribbble.
    **/
    self.shootDaBall = function(){
        var ball = this;
        
        var sCallback = "HalfCourtShot.callback" + ball.index;
        HalfCourtShot["callback" + ball.index] = function(data){ ball.jumboTron(data); };
        
        ball.genUrl(function(){
            var instId = "halfCourtShot" + ball.currentIndex;
            HalfCourtShot[ instId ] = document.createElement("script");
            HalfCourtShot[ instId ].setAttribute("id", instId);
            HalfCourtShot[ instId ].setAttribute("type", "text/javascript");
            HalfCourtShot[ instId ].setAttribute("src", ball.url );
            
            document.getElementsByTagName('body')[0].appendChild( HalfCourtShot[ instId ] );    
        });
        
        
        
    }; // self.shootDaBall = function()
    
    /**
    * Display the output
    **/
    self.jumboTron = function(data){
        
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
        
    }; // self.jumboTron = function(data)
    
    self.buildImageListItem = function( d ){
        
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
    self.genUrl = function(cb){
        var self = this,
            randomNo = Math.floor(Math.random()*9999999),
            pageOpts = "";
        
        if( typeof self.jersey == "string" ){ 
            if( self.page != undefined  ) pageOpts = "&page=" + self.page;
            if( self.per_page != undefined ) pageOpts = pageOpts + "&per_page=" + self.per_page;
            else if(self.shots <= 30) pageOpts = pageOpts + "&shots="+self.shots+"&per_page=" + self.shots;
        }
        
        if( self.playType == "shots" ){ 
            var pageOpts = "";
            
            if( self.jersey == "debuts" || self.jersey == "everyone" || self.jersey == "popular" )
                self.url = self.apiUrl + self.playType + "/" + self.jersey + "/" + "?" + pageOpts + "&r=" + randomNo + "&callback=HalfCourtShot.callback" + self.index;
             else                        
                self.url = self.apiUrl + self.playType + "/" + self.jersey + "/" + "?r=" + randomNo + "&callback=HalfCourtShot.callback" + self.index;
            
            if( self.debug ) console.log(self.url);
        }
        else if( self.playType == "players" ){
            var jerseyType = parseInt(self.jersey);
            
            if( parseInt(self.jersey) ){
                self.url = self.apiUrl + self.playType + "/" + self.jersey + "/?r=" + randomNo + "&callback=HalfCourtShot.callback" + self.index;
            }
            else{
                var followingOpts = ( eval(self.following) ) ? "following/" : "";
                self.url = self.apiUrl + self.playType + "/" + self.jersey + "/shots/" + followingOpts + "?r=" + randomNo + "&callback=HalfCourtShot.callback" + self.index + pageOpts;
            }
        }

        if(typeof cb == 'function'){
            cb();
        }
        
    }; // self.genUrl = function()
    
    /**
    * Object dump
    **/
    self.rideThePine = function( v ){
        if(self.debug) console.log( this[v] );
    }; // self.rideThePine = function( v )
    
    /**
    * Our init
    **/
    self.hitTheFloor = function(){
        var self = this;

        self.callThePlay(function(){
            self.shootDaBall();
        });
        
    }; //  self.init = function()
    
    self.hitTheFloor();
    
} // function HalfCourtShot( settings )
