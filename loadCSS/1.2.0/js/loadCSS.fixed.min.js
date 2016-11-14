/*!
 * modified for babel load CSS async v1.2.0
 * modified order of arguments, added callback option, removed CommonJS stuff
 * github.com/filamentgroup/loadCSS
 * gist.github.com/englishextra/50592e9944bd2edc46fe5a82adec3396
 * @param {String} _href path string
 * @param {Object} callback callback function
 * @param {String} media media attribute string value
 * @param {Object} [before] target HTML element
 * loadCSS(_href,callback,media,before)
 * source: github.com/filamentgroup/loadCSS/blob/v1.2.0/src/loadCSS.js
 * passes jshint
 */
;(function(){var loadCSS=function(_href,callback,media,before){"use strict";var doc=document;var ss=doc.createElement("link");var ref;if(before){ref=before;}else{var refs=(doc.body||doc.getElementsByTagName("head")[0]).childNodes;ref=refs[refs.length-1];}var sheets=doc.styleSheets;ss.rel="stylesheet";ss.href=_href;ss.media="only x";if(callback&&"function"===typeof callback){ss.onload=callback;}function ready(cb){if(doc.body){return cb();}setTimeout(function(){ready(cb);});}ready(function(){ref.parentNode.insertBefore(ss,(before?ref:ref.nextSibling));});var onloadcssdefined=function(cb){var resolvedHref=ss.href;var i=sheets.length;while(i--){if(sheets[i].href===resolvedHref){return cb();}}setTimeout(function(){onloadcssdefined(cb);});};function loadCB(){if(ss.addEventListener){ss.removeEventListener("load",loadCB);}ss.media=media||"all";}if(ss.addEventListener){ss.addEventListener("load",loadCB);}ss.onloadcssdefined=onloadcssdefined;onloadcssdefined(loadCB);return ss;};("undefined"!==typeof window?window:this).loadCSS=loadCSS;}());
