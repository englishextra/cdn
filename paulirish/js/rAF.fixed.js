/*!
 * modified paulirish.com/2011/requestanimationframe-for-smart-animating/
 * my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Moller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 * @see {@link https://gist.github.com/paulirish/1579671}
 * passes jshint
 */
(function(){for(var e=0,b=["ms","moz","webkit","o"],a=0;a<b.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[b[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[a]+"CancelAnimationFrame"]||window[b[a]+"CancelRequestAnimationFrame"];}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(a,b){var c=(new Date()).getTime(),d=Math.max(0,16-(c-e)),f=window.setTimeout(function(){a(c+d);},d);e=c+d;return f;};}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(a){clearTimeout(a);};}})();
