/*!
 * modified Polyfill for window.location.origin
 * github.com/shinnn/location-origin.js
 * compiled with closure-compiler.appspot.com/home
 * passes jshint
 */
;(function(){var a,b;a=window.location;if(!a.origin){b=a.protocol+"//"+a.hostname+(a.port?":"+a.port:"");try{Object.defineProperty(a,"origin",{value:b,enumerable:!0});}catch(c){a.origin=b;}}}).call(this);
