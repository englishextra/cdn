/*!
 * modified for babel load JS async v0.2.3
 * modified order of arguments, removed CommonJS stuff
 * github.com/filamentgroup/loadJS
 * gist.github.com/englishextra/397e62184fde65d7755744fdb7a01829
 * @param {String} _src path string
 * @param {Object} callback callback function
 * loadJS(_src,callback)
 * source: github.com/filamentgroup/loadJS/tree/0.2.3
 * passes jshint
 */
;(function(){var loadJS=function(_src,callback){"use strict";var ref=document.getElementsByTagName("script")[0];var script=document.createElement("script");script.src=_src;script.async=true;ref.parentNode.insertBefore(script,ref);if(callback&&"function"===typeof callback){script.onload=callback;}return script;};("undefined"!==typeof window?window:this).loadJS=loadJS;}());
