/*!
 * modified for babel crel - a small, simple, and fast DOM creation utility
 * github.com/KoryNunn/crel
 * crel(tagName/dom element[,attributes,child1,child2,childN...])
 * var element=crel('div',crel('h1','Crello World!'),
 * crel('p','This is crel'),crel('input',{type:'number'}));
 * removed AMD, CommonJS support
 * exposed as window property
 * added window object existence check
 * fixed Use '===' to compare with 'null'.
 * fixed The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
 * fixed Expected an assignment or function call and instead saw an expression.
 * source: github.com/KoryNunn/crel/blob/master/crel.js
 * passes jshint
 */
;(function(root,factory){if("undefined"==typeof window||!("document"in window)){return console.log("window is undefined or document is not in window"),!1;}window.crel=factory();}(window,function(){var fn='function',obj='object',nodeType='nodeType',textContent='textContent',setAttribute='setAttribute',attrMapString='attrMap',isNodeString='isNode',isElementString='isElement',d=typeof document===obj?document:{},isType=function(a,type){return typeof a===type;},isNode=typeof Node===fn?function(object){return object instanceof Node;}:function(object){return object&&isType(object,obj)&&(nodeType in object)&&isType(object.ownerDocument,obj);},isElement=function(object){return crel[isNodeString](object)&&object[nodeType]===1;},isArray=function(a){return a instanceof Array;},appendChild=function(element,child){if(!crel[isNodeString](child)){child=d.createTextNode(child);} element.appendChild(child);};function crel(){var args=arguments,element=args[0],child,settings=args[1],childIndex=2,argumentsLength=args.length,attributeMap=crel[attrMapString];element=crel[isElementString](element)?element:d.createElement(element);if(argumentsLength===1){return element;} if(!isType(settings,obj)||crel[isNodeString](settings)||isArray(settings)){--childIndex;settings=null;} if((argumentsLength-childIndex)===1&&isType(args[childIndex],'string')&&element[textContent]!==undefined){element[textContent]=args[childIndex];}else{for(;childIndex<argumentsLength;++childIndex){child=args[childIndex];if(child===null){continue;} if(isArray(child)){for(var i=0;i<child.length;++i){appendChild(element,child[i]);}}else{appendChild(element,child);}}} for(var key in settings){if(settings.hasOwnProperty(key)){if(!attributeMap[key]){element[setAttribute](key,settings[key]);}else{var attr=attributeMap[key];if(typeof attr===fn){attr(element,settings[key]);}else{element[setAttribute](attr,settings[key]);}}}} return element;} crel[attrMapString]={};crel[isElementString]=isElement;crel[isNodeString]=isNode;if(typeof Proxy!=='undefined'){crel.proxy=new Proxy(crel,{get:function(target,key){if(!(key in crel)){crel[key]=crel.bind(null,key);} return crel[key];}});} return crel;}));
