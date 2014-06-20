/*
 * Sidr
 * https://github.com/artberri/sidr
 *
 * Copyright (c) 2013 Alberto Varela
 * Licensed under the MIT license.
 */;(function($){var sidrMoving=false,sidrOpened=false;var privateMethods={isUrl:function(str){var pattern=new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i');if(!pattern.test(str)){return false;}else{return true;}},loadContent:function($menu,content){$menu.html(content);},addPrefix:function($element){var elementId=$element.attr('id'),elementClass=$element.attr('class');if(typeof elementId==='string'&&''!==elementId){$element.attr('id',elementId.replace(/([A-Za-z0-9_.\-]+)/g,'sidr-id-$1'));}
if(typeof elementClass==='string'&&''!==elementClass&&'sidr-inner'!==elementClass){$element.attr('class',elementClass.replace(/([A-Za-z0-9_.\-]+)/g,'sidr-class-$1'));}
$element.removeAttr('style');},execute:function(action,name,callback){if(typeof name==='function'){callback=name;name='sidr';}
else if(!name){name='sidr';}
var $menu=$('#'+name),$body=$($menu.data('body')),$html=$('html'),menuWidth=$menu.outerWidth(true),speed=$menu.data('speed'),side=$menu.data('side'),bodyAnimation,menuAnimation,scrollTop;if('open'===action||('toogle'===action&&!$menu.is(':visible'))){if($menu.is(':visible')||sidrMoving){return;}
if(sidrOpened!==false){methods.close(sidrOpened,function(){methods.open(name);});return;}
sidrMoving=true;if(side==='left'){bodyAnimation={left:menuWidth+'px'};menuAnimation={left:'0px'};}
else{bodyAnimation={right:menuWidth+'px'};menuAnimation={right:'0px'};}
scrollTop=$html.scrollTop();$html.css('overflow-x','hidden').scrollTop(scrollTop);$body.css({width:$body.width(),position:'absolute'}).animate(bodyAnimation,speed);$menu.css('display','block').animate(menuAnimation,speed,function(){sidrMoving=false;sidrOpened=name;if(typeof callback==='function'){callback(name);}});}
else{if(!$menu.is(':visible')||sidrMoving){return;}
sidrMoving=true;if(side==='left'){bodyAnimation={left:0};menuAnimation={left:'-'+menuWidth+'px'};}
else{bodyAnimation={right:0};menuAnimation={right:'-'+menuWidth+'px'};}
scrollTop=$html.scrollTop();$html.removeAttr('style').scrollTop(scrollTop);$body.animate(bodyAnimation,speed);$menu.animate(menuAnimation,speed,function(){$menu.removeAttr('style');$body.removeAttr('style');$('html').removeAttr('style');sidrMoving=false;sidrOpened=false;if(typeof callback==='function'){callback(name);}});}}};var methods={open:function(name,callback){privateMethods.execute('open',name,callback);},close:function(name,callback){privateMethods.execute('close',name,callback);},toogle:function(name,callback){privateMethods.execute('toogle',name,callback);}};$.sidr=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='function'||typeof method==='string'||!method){return methods.toogle.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.sidr');}};$.fn.sidr=function(options){var settings=$.extend({name:'sidr',speed:200,side:'left',source:null,renaming:true,body:'body'},options);var name=settings.name,$sideMenu=$('#'+name);if($sideMenu.length===0){$sideMenu=$('<div />').attr('id',name).appendTo($('body'));}
$sideMenu.addClass('sidr').addClass(settings.side).data({speed:settings.speed,side:settings.side,body:settings.body});if(typeof settings.source==='function'){var newContent=settings.source(name);privateMethods.loadContent($sideMenu,newContent);}
else if(typeof settings.source==='string'&&privateMethods.isUrl(settings.source)){$.get(settings.source,function(data){privateMethods.loadContent($sideMenu,data);});}
else if(typeof settings.source==='string'){var htmlContent='',selectors=settings.source.split(',');$.each(selectors,function(index,element){htmlContent+='<div class="sidr-inner">'+$(element).html()+'</div>';});if(settings.renaming){var $htmlContent=$('<div />').html(htmlContent);$htmlContent.find('*').each(function(index,element){var $element=$(element);privateMethods.addPrefix($element);});htmlContent=$htmlContent.html();}
privateMethods.loadContent($sideMenu,htmlContent);}
else if(settings.source!==null){$.error('Invalid Sidr Source');}
return this.each(function(){var $this=$(this),data=$this.data('sidr');if(!data){$this.data('sidr',name);$this.click(function(e){e.preventDefault();methods.toogle(name);});}});};})(jQuery);