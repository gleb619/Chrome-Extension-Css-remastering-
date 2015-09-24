(function() {

	var root = this;
	var app = {};

	// Use in node or in browser
	if (typeof exports !== 'undefined') {
		module.exports = app;
	} else {
		root.app = app;
	}
  
  /*------------------------------------------------------------*/
  
	function init(){
		var timer = setTimeout(function() {
			addFrame();
			clearTimeout(timer);
			timer = null;
		}, 100);
		
		changeHead();
		onMessageReceive();
		
		tryToDeleteJivo(100);
		tryToDeleteJivo(1000);
		tryToDeleteJivo(3000);
		tryToDeleteJivo(5000);
		tryToDeleteJivo(10000);
		tryToDeleteJivo(15000);
		tryToDeleteJivo(20000);
		tryToDeleteJivo(25000);
		
	}

	function addFrame(){
		//var frameHolder = document.getElementsByClassName("body iframe");
		var mainBlock = document.getElementById('block-system-main');
		var frameHolder;
		if(mainBlock != null){
			frameHolder = mainBlock.getElementsByClassName("content");
		}
		if(typeof frameHolder != 'undefined'){
			if(typeof frameHolder.length != 'undefined' && frameHolder.length > 0){
				frameHolder = frameHolder[0];
				var iframe = document.createElement('iframe');
				iframe.setAttribute("id", "taimax_frame");
				iframe.style.display = "none";
				iframe.src = "http://178.88.186.230:8080/shop-rcr-server/d/index3#/widget_search";
				//iframe.src = "http://178.88.186.230:8080/shop-rcr-server/d/index3#/";
				iframe.width = "100%";
				iframe.height = "100%";
				
				frameHolder.parentNode.replaceChild(iframe, frameHolder);
				frameHolder = null;
				iframe.onload = onFrameLoad;
				
				var timer = setTimeout(function() {
					iframe.style.display = "block";
					iframe = null;
					clearTimeout(timer);
					timer = null;
				}, 300);
			}
		}
	}
	
	function onFrameLoad(){
		loadSettings();
	}
  
	function tryToDeleteJivo(interval){
		var timer = setTimeout(function() {
			deleteAnnoyingElements();
			clearTimeout(timer);
			timer = null;
		}, interval);
	}

	function deleteAnnoyingElements(){
		var junkHolder = document.getElementById("jivo_top_wrap");
		if(typeof junkHolder != 'undefined' && junkHolder != null){
			junkHolder.parentNode.removeChild(junkHolder);
		}
	}	
	
	/*------------------------------------------------------------*/
  
	function onMessageReceive(){
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			switch(request.type) {
				case "repaint":
					render(request.data);
				break;
			}
			return true;
		});
	}

	function loadSettings(){
		loadSetingsData(function (result) {	
			render(result.remaster_settings);
		});
	}

	function render(values){
		changeMainPage(values);
		changeModule(values);
	}
	
	function loadSetingsData(callback){
		chrome.storage.local.get('remaster_settings', callback);
	}
	
	function changeMainPage(values){
		var container = document.getElementsByClassName("container");
		if(typeof container.length != 'undefined' && container.length > 0){
			container = container[0];
			container.style.width = values.contentWidth + "px";
			if(values.fullsizeEnable){
				container.style.width = "100%";					
			}
		}
		showSlider(values.sliderEnable);
		showFooter(values.footerEnable);
	}

	function changeHead(){
		var url = chrome.extension.getURL('icon_16.png'); 

		var favicon = document.createElement("link");
		var meta = document.createElement("meta");
		
		favicon.type = "image/x-icon";
		favicon.rel = 'shortcut icon';
		favicon.href = url;
		
		meta.name = 'viewport';
		meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';

		document.getElementsByTagName("head")[0].appendChild(favicon);
		document.getElementsByTagName("head")[0].appendChild(meta);
		document.title = 'Hotels | silktour.kz';
		
		url= null;
		favicon= null;
		meta = null;
		
	}
	  

	function showSlider(enable){
	  var slider = document.getElementsByTagName("header");
	  if(typeof enable === 'undefined'){
		  enable = true;
	  }

	  if(typeof slider.length != 'undefined' && slider.length > 0){
			slider = slider[0];
			slider.style.display = enable ? "block" : "none";
	  }
	}

	function showFooter(enable){
	  var footer = document.getElementsByTagName("footer");
	  
	  if(typeof enable === 'undefined'){
		  enable = true;
	  }
	  if(typeof footer.length != 'undefined' && footer.length > 0){
			footer = footer[0];
			footer.style.display = enable ? "block" : "none";
	  }
	}

	function animation(property, duration, type){
		property = property || 'all' ;
		duration = duration || '0.5' ;
		type = type || 'ease' ;
	  
		var template =  '-webkit-transition: #property #durations #type;' + 
								'-moz-transition: #property #durations #type;' +
								'-o-transition: #property #durations #type;' +
								'transition: #property #durations #type;';
		
		return template.replace('#property', property).replace('#duration', duration).replace('#type', type)
	}
	  
	function changeModule(values){
		var iboxWrapper = '.widget_search .ibox-container .ibox-wrapper { ' + 
							'max-width: #cardWidthpx; ' + 
							'#animationMW ' + 
		'}';
		iboxWrapper = iboxWrapper.replace(/#animationMW/g, animation('max-width'));
		iboxWrapper = iboxWrapper.replace(/#cardWidth/g, values.cardWidth);
		
		var css = 	'body { background-color: #mainColorText; #animationBG }\n' +
						'.navbar-default, h5.cate { background-color: #headerColorText; #animationBG }\n' +
						'.menu { ' + 
									'background-color: #panelColorText; ' + 
									'color: #panelFontColorText; ' +
									'#animation' +
						'}\n' + 
						'.help-block { color: #panelFontColorText; #animationC }\n' +
						'.navbar-input-group .btn i { color: #panelFontColorText; #animationC }' +
						'.ibox.freesale .ibox-content.product-box .image-holder { background-color: rgba(102,207,227,0.8); }' +
						'.ibox-content { background-color: #cardColorText; #animationBG }' +
						'.ibox .product-price, .ibox .product-price-2 { background-color: #cardColorText; #animationBG }' +
						
						'.freesale .ibox-content { color: #fff; background-color: #freesaleCardColorText; }' +
						'.freesale .product-price, .freesale .product-price-2 { background-color: transparent; color: #fff; }' +
						'.freesale .product-freesale { background-color: transparent; color: #fff; }' +
						
						'.ibox.freesale .header { background-color: #freesaleCardColorText; #animationBG }' +
						'.ibox.freesale .ibox-content.product-box .image-holder { background-color: #freesaleCardColorText; #animationBG }' +
						'.ibox.freesale .product-desc { background-color: #freesaleCardColorText; #animationBG }'
						;
						
		css = css.replace(/#mainColorText/g, values.mainColorText);
		css = css.replace(/#headerColorText/g, values.headerColorText);
		css = css.replace(/#panelColorText/g, values.panelColorText);
		css = css.replace(/#panelFontColorText/g, values.panelFontColorText);
		css = css.replace(/#cardColorText/g, values.cardColorText);
		css = css.replace(/#freesaleCardColorText/g, values.freesaleCardColorText);
		
		css = css.replace(/#animationBG/g, animation('background-color'));
		css = css.replace(/#animation/g, animation());
		css = css.replace(/#animationC/g, animation('color'));
	
		var complex = '.divider-vertical { ' +
				'border-left: 1px solid ' + shadeColor(values.headerColorText, 20) + ';' +
				'border-right: 1px solid ' + shadeColor(values.headerColorText, -20) + ';' +
		' }';
		
		complex += '\n\n.navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus';
		complex += '{ color: ' + (isDark(values.headerColorText) ? '#fff' : shadeColor(values.headerColorText, 40)) + '; }';
		
		complex += '\n\n.navbar-input-group .btn';
		complex += '{ background-color: ' + (isDark(values.headerColorText) ? '#fff' : shadeColor(values.headerColorText, 30)) + '; }';
		
		complex += '\n\n.navbar-input-group .btn:hover';
		complex += '{ background-color: ' + (isDark(values.headerColorText) ? '#fff' : shadeColor(values.headerColorText, -30)) + '; }';
		
		if(values.circledImage){
			complex += '\n\n.img-responsive.chain { border-radius: 50%; border: 1px solid #ddd; }';
			complex += '\n\n.product-freesale { background-color: transparent; color: #fff; }';
			complex += '\n\n.ibox .header { border-bottom: none; }';
			
			/*
			complex += '\n\n.ibox.freesale .header { background-color: #freesaleCardColorText; #animationBG }' +
				'.ibox.freesale .ibox-content.product-box .image-holder { background-color: #freesaleCardColorText; #animationBG }' +
				'.ibox.freesale .product-desc { background-color: #freesaleCardColorText; #animationBG }';
			complex = complex.replace(/#freesaleCardColorText/g, values.freesaleCardColorText);
			*/
		}
		
		
		
		/*
		if(isDark(values.headerColorText)){
			complex += '{ color: ' + isDark(values.headerColorText) ? '#fff' : shadeColor(values.headerColorText, 30) + '; }';
		}
		else {
			complex += '{ color: ' + shadeColor(values.headerColorText, 30) + '; }';
		}
		*/
		/*
		complex += '\n\n.navbar-input-group .btn';
		if(isDark(values.headerColorText)){
			complex += '{ background-color: #fff; }';
		}
		else {
			complex += '{ background-color: ' + shadeColor(values.headerColorText, 30) + '; }';
		}
		*/
		
		addCssToFrame(iboxWrapper + '\n\n' + css  + '\n\n' + complex);
	}  

	function addCssToFrame(text){
		var iframe = document.getElementById("taimax_frame");
		if(iframe != null){
			var oldstyle = iframe.contentWindow.document.getElementById('taimax_style')
			if(oldstyle != null){
				oldstyle.remove();
				oldstyle = null;
			}
			
			var style = document.createElement('style');
			var head = iframe.contentWindow.document.head;
			
			style.setAttribute("id", "taimax_style");
			style.type = 'text/css';
			if (style.styleSheet){
				style.styleSheet.cssText = text;
			} else {
				style.appendChild(document.createTextNode(text));
			}
			
			head.appendChild(style);
			
			style = null;
			head = null;
			iframe = null;
		}
	}

  /*------------------------------------------------------------*/
  
	function isDark(color) {
		var R = parseInt(color.substring(1,3),16);
		var G = parseInt(color.substring(3,5),16);
		var B = parseInt(color.substring(5,7),16);

		var luma = 0.2126 * R + 0.7152 * G + 0.0722 * B;
		if (luma < 40) {
			return true;
		}
		
		return false;
	}
		
	//shadeColor("#63C6FF",40);
	//shadeColor("#63C6FF",-40);
	function shadeColor(color, percent) {

		var R = parseInt(color.substring(1,3),16);
		var G = parseInt(color.substring(3,5),16);
		var B = parseInt(color.substring(5,7),16);

		R = parseInt(R * (100 + percent) / 100);
		G = parseInt(G * (100 + percent) / 100);
		B = parseInt(B * (100 + percent) / 100);

		R = (R<255)?R:255;  
		G = (G<255)?G:255;  
		B = (B<255)?B:255;  

		var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
		var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
		var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

		return "#"+RR+GG+BB;
	}
  
  /*------------------------------------------------------------*/
  
  init();

}());
