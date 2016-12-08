/*!
 * modified routie - a tiny hash router - v0.3.2
 * projects.jga.me/routie
 * copyright Greg Allen 2013
 * MIT License
 * @requires setImmediate {@link https://github.com/YuzuJS/setImmediate YuzuJS/setImmediate}
 * "#" => ""
 * "#/" => "/" wont trigger anything? {@link https://github.com/jgallen23/routie/issues/49}
 * "#/home" => "/home"
 * routie({"/contents": function () {},"/feedback": function () {};};
 * routie.navigate("/somepage");
 * changed setTimeout to setImmediate in navigate method
 * added window object existence check
 * fixed The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
 * source: github.com/jgallen23/routie/blob/master/dist/routie.js
 * passes jshint
 */
;(function(n){if("undefined"==typeof window||!("document"in window)){return console.log("window is undefined or document is not in window"),!1;}var e=[],t={},r="routie",o=n[r],i=function(n,e){this.name=e;this.path=n;this.keys=[];this.fns=[];this.params={};this.regex=a(this.path,this.keys,!1,!1);};i.prototype.addHandler=function(n){this.fns.push(n);};i.prototype.removeHandler=function(n){for(var e=0,t=this.fns.length;t>e;e++){var r=this.fns[e];if(n==r){return this.fns.splice(e,1),void 0;}}};i.prototype.run=function(n){for(var e=0,t=this.fns.length;t>e;e++){this.fns[e].apply(this,n);}};i.prototype.match=function(n,e){var t=this.regex.exec(n);if(!t){return!1;}for(var r=1,o=t.length;o>r;++r){var i=this.keys[r-1],a="string"==typeof t[r]?decodeURIComponent(t[r]):t[r];if(i){this.params[i.name]=a;}e.push(a);}return!0;};i.prototype.toURL=function(n){var e=this.path;for(var t in n){if(n.hasOwnProperty(t)){e=e.replace("/:"+t,"/"+n[t]);}}if(e=e.replace(/\/:.*\?/g,"/").replace(/\?/g,""),-1!=e.indexOf(":")){throw new Error("missing parameters for url: "+e);}return e;};var a=function(n,e,t,r){return n instanceof RegExp?n:(n instanceof Array&&(n="("+n.join("|")+")"),n=n.concat(r?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(n,t,r,o,i,a){return e.push({name:o,optional:!!a}),t=t||"",""+(a?"":t)+"(?:"+(a?t:"")+(r||"")+(i||r&&"([^/.]+?)"||"([^/]+?)")+")"+(a||"");}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),RegExp("^"+n+"$",t?"":"i"));},s=function(n,r){var o=n.split(" "),a=2==o.length?o[0]:null;n=2==o.length?o[1]:o[0];if(!t[n]){t[n]=new i(n,a);e.push(t[n]);}t[n].addHandler(r);},h=function(n,e){if("function"==typeof e){s(n,e);h.reload();}else if("object"==typeof n){for(var t in n){if(n.hasOwnProperty(t)){s(t,n[t]);}}h.reload();}else{if(e===void 0){h.navigate(n);}}};h.lookup=function(n,t){for(var r=0,o=e.length;o>r;r++){var i=e[r];if(i.name==n){return i.toURL(t);}}};h.remove=function(n,e){var r=t[n];if(r){r.removeHandler(e);}};h.removeAll=function(){t={};e=[];};h.navigate=function(n,e){e=e||{};var t=e.silent||!1;if(t){l();}setImmediate(function(){window.location.hash=n;if(t){setImmediate(function(){p();});}});};h.noConflict=function(){return n[r]=o,h;};var f=function(){return window.location.hash.substring(1);},c=function(n,e){var t=[];return e.match(n,t)?(e.run(t),!0):!1;},u=h.reload=function(){for(var n=f(),t=0,r=e.length;r>t;t++){var o=e[t];if(c(n,o)){return;}}},p=function(){if(n.addEventListener){n.addEventListener("hashchange",u,!1);}else{n.attachEvent("onhashchange",u);}},l=function(){if(n.removeEventListener){n.removeEventListener("hashchange",u);}else{n.detachEvent("onhashchange",u);}};p();n[r]=h;})(window);
