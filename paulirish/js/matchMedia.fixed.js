/*!
 * matchMedia() polyfill - Test a CSS media type/query in JS.
 * github.com/paulirish/matchMedia.js
 * Authors & copyright (c) 2012:
 * Scott Jehl, Paul Irish, Nicholas Zakas, David Knight.
 * Dual MIT/BSD license
 * fixed Expected an assignment or function call and instead saw an expression.
 * source: github.com/paulirish/matchMedia.js/blob/master/matchMedia.js
 * passes jshint
 */
if(!window.matchMedia){window.matchMedia=function(){"use strict";var styleMedia=(window.styleMedia||window.media);if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script);info=('getComputedStyle'in window)&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';if(style.styleSheet){style.styleSheet.cssText=text;}else{style.textContent=text;}return info.width==='1px';}};}return function(media){return{matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}();}