/*jslint browser: true */
/*jslint node: true */
/*global global, ActiveXObject, define, escape, module, pnotify, Proxy, jQuery, require, self, setImmediate, window */
/*!
 * modified Plain javascript replacement for jQuery's .ready()
 * so code can be scheduled to run when the document is ready
 * @see {@link https://github.com/jfriend00/docReady}
 * @see {@link https://gist.github.com/englishextra/7c22a9a9cae3320318e9c9eab6777c84}
 * docReady(function(){});
 * @see {@link https://github.com/jfriend00/docReady/blob/master/docready.js}
 * passes jshint
 */
(function(root){"use strict";var docReady=(function(){var readyList=[];var readyFired=false;var readyEventHandlersInstalled=false;function ready(){if(!readyFired){readyFired=true;for(var i=0;i<readyList.length;i++){readyList[i].fn.call(window,readyList[i].ctx);}readyList=[];}}function readyStateChange(){if(document.readyState==="complete"){ready();}}return function(callback,context){if(readyFired){setTimeout(function(){callback(context);},1);return;}else{readyList.push({fn:callback,ctx:context});}if(document.readyState==="complete"||(!document.attachEvent&&document.readyState==="interactive")){setTimeout(ready,1);}else if(!readyEventHandlersInstalled){if(document.addEventListener){document.addEventListener("DOMContentLoaded",ready,false);window.addEventListener("load",ready,false);}else{document.attachEvent("onreadystatechange",readyStateChange);window.attachEvent("onload",ready);}readyEventHandlersInstalled=true;}};})();root.docReady=docReady;})("undefined" !== typeof window ? window : this);
