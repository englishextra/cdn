/*!
 * modified A function for elements selection - v0.1.9
 * @see {@link https://github.com/finom/bala}
 * @param {String} a id, class or tag string
 * @param {String|Object} [b] context tag string or HTML Element object
 * a=BALA("sometag/#someid/.someclass"[,someParent]);
 * a=BALA.one("sometag/#someid/.someclass"[,someParent]);
 * global $ becomes var g
 * renamed function $ to g
 * @see {@link https://github.com/finom/bala/blob/master/bala.js}
 * passes jshint
 */
(function(root){"use strict";var BALA=(function(){var g=(function(document,s_addEventListener,s_querySelectorAll){function g(s,context,bala){bala=Object.create(g.fn);if(s){bala.push.apply(bala,s[s_addEventListener]?[s]:""+s===s?/</.test(s)?((context=document.createElement(context||s_addEventListener)).innerHTML=s,context.children):context?((context=g(context)[0])?context[s_querySelectorAll](s):bala):document[s_querySelectorAll](s):typeof s=='function'?document.readyState[7]?s():document[s_addEventListener]('DOMContentLoaded',s):s);}return bala;}g.fn=[];g.one=function(s,context){return g(s,context)[0]||null;};return g;})(document,'addEventListener','querySelectorAll');return g;}());root.BALA=BALA;})("undefined" !== typeof window ? window : this);
