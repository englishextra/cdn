/*!
 * modified routie - a tiny hash router - v0.3.2
 * @see {@link https://github.com/jgallen23/routie/blob/master/dist/routie.js}
 * projects.jga.me/routie
 * copyright Greg Allen 2013
 * MIT License
 * @requires setImmediate {@link https://github.com/YuzuJS/setImmediate YuzuJS/setImmediate}
 * "#" => ""
 * "#/" => "/" wont trigger anything? {@link https://github.com/jgallen23/routie/issues/49}
 * "#/home" => "/home"
 * routie({"/contents": function () {},"/feedback": function () {};};
 * routie.navigate("/somepage");
 * in navigate method setImmediate with setTimeout fallback
 * fixed The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
 * @see {@link https://github.com/jgallen23/routie/blob/master/dist/routie.js}
 * passes jshint
 */
(function(root){"use strict";var routie=(function(){var w=window;var routes=[];var map={};var reference="routie";var oldReference=w[reference];var Route=function(path,name){this.name=name;this.path=path;this.keys=[];this.fns=[];this.params={};this.regex=pathToRegexp(this.path,this.keys,false,false);};Route.prototype.addHandler=function(fn){this.fns.push(fn);};Route.prototype.removeHandler=function(fn){for(var i=0,c=this.fns.length;i<c;i++){var f=this.fns[i];if(fn==f){this.fns.splice(i,1);return;}}};Route.prototype.run=function(params){for(var i=0,c=this.fns.length;i<c;i++){this.fns[i].apply(this,params);}};Route.prototype.match=function(path,params){var m=this.regex.exec(path);if(!m){return false;}for(var i=1,len=m.length;i<len;++i){var key=this.keys[i-1];var val=('string'==typeof m[i])?decodeURIComponent(m[i]):m[i];if(key){this.params[key.name]=val;}params.push(val);}return true;};Route.prototype.toURL=function(params){var path=this.path;for(var param in params){if(params.hasOwnProperty(param)){path=path.replace('/:'+param,'/'+params[param]);}}path=path.replace(/\/:.*\?/g,'/').replace(/\?/g,'');if(path.indexOf(':')!=-1){throw new Error('missing parameters for url: '+path);}return path;};var pathToRegexp=function(path,keys,sensitive,strict){if(path instanceof RegExp){return path;}if(path instanceof Array){path='('+path.join('|')+')';}path=path.concat(strict?'':'/?').replace(/\/\(/g,'(?:/').replace(/\+/g,'__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(_,slash,format,key,capture,optional){keys.push({name:key,optional:!!optional});slash=slash||'';return''+(optional?'':slash)+'(?:'+(optional?slash:'')+(format||'')+(capture||(format&&'([^/.]+?)'||'([^/]+?)'))+')'+(optional||'');}).replace(/([\/.])/g,'\\$1').replace(/__plus__/g,'(.+)').replace(/\*/g,'(.*)');return new RegExp('^'+path+'$',sensitive?'':'i');};var addHandler=function(path,fn){var s=path.split(' ');var name=(s.length==2)?s[0]:null;path=(s.length==2)?s[1]:s[0];if(!map[path]){map[path]=new Route(path,name);routes.push(map[path]);}map[path].addHandler(fn);};var _r=function(path,fn){if(typeof fn=='function'){addHandler(path,fn);_r.reload();}else if(typeof path=='object'){for(var p in path){if(path.hasOwnProperty(p)){addHandler(p,path[p]);}}_r.reload();}else if(typeof fn==='undefined'){_r.navigate(path);}};_r.lookup=function(name,obj){for(var i=0,c=routes.length;i<c;i++){var route=routes[i];if(route.name==name){return route.toURL(obj);}}};_r.remove=function(path,fn){var route=map[path];if(!route){return;}route.removeHandler(fn);};_r.removeAll=function(){map={};routes=[];};_r.navigate=function(path,options){options=options||{};var silent=options.silent||false;if(silent){removeListener();}setTimeout(function(){window.location.hash=path;if(silent){setTimeout(function(){addListener();},1);}},1);if(window.setImmediate){setImmediate(function(){window.location.hash=path;if(silent){setImmediate(function(){addListener();});}});}else{setTimeout(function(){window.location.hash=path;if(silent){setTimeout(function(){addListener();},1);}},1);}};_r.noConflict=function(){w[reference]=oldReference;return _r;};var getHash=function(){return window.location.hash.substring(1);};var checkRoute=function(hash,route){var params=[];if(route.match(hash,params)){route.run(params);return true;}return false;};var hashChanged=_r.reload=function(){var hash=getHash();for(var i=0,c=routes.length;i<c;i++){var route=routes[i];if(checkRoute(hash,route)){return;}}};var addListener=function(){if(w.addEventListener){w.addEventListener('hashchange',hashChanged,false);}else{w.attachEvent('onhashchange',hashChanged);}};var removeListener=function(){if(w.removeEventListener){w.removeEventListener('hashchange',hashChanged);}else{w.detachEvent('onhashchange',hashChanged);}};addListener();return _r;}());root.routie=routie;})("undefined" !== typeof window ? window : this);
