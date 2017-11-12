/*global HTMLDocument, global, module, Promise, self, setImmediate, Symbol,
 URLSearchParams, DOMException, DOMTokenList, WeakMap, Window,
 MutationEvent */
/*!
 * Polyfills the querySelector and querySelectorAll methods.
 * @see https://gist.github.com/Fusselwurm/4673695
 * @see {@link https://github.com/cobbdb/polyfill-queryselector/blob/master/querySelector.js}
 * IE8 needs that
 */
(function(){var style;var select=function(selector,maxCount){var all=document.all,l=all.length,i,resultSet=[];style.addRule(selector,"foo:bar");for(i=0;i<l;i+=1){if(all[i].currentStyle.foo==="bar"){resultSet.push(all[i]);if(resultSet.length>maxCount){break;}}}style.removeRule(0);return resultSet;};if(document.querySelectorAll||document.querySelector){return;}style=document.createStyleSheet();document.querySelectorAll=document.body.querySelectorAll=function(selector){return select(selector,Infinity);};document.querySelector=document.body.querySelector=function(selector){return select(selector,1)[0]||null;};}());
/*!
 * Implementation of standard Array methods (introduced in ECMAScript 5th
 * edition) and shorthand generics (JavaScript 1.8.5)
 *
 * Copyright (c) 2013 Alex K @plusdude
 * @see {@link http://opensource.org/licenses/MIT}
 * @see {@link https://github.com/plusdude/array-generics/blob/master/array.generics.js}
 * IE9 needs that
 */
/*jshint bitwise: false */
(function(global,infinity,undefined){"use strict";var Array=global.Array;var Object=global.Object;var Math=global.Math;var Number=global.Number;var toInteger=function(value){var number;number=Number(value);return(number!==number?0:0===number||infinity===number||-infinity===number?number:(0<number||-1)*Math.floor(Math.abs(number)));};var slice=function(begin,end){var result,elements,length,index,count;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?Math.max(length+begin,0):Math.min(begin,length);}else{index=0;}if(undefined!==end){end=toInteger(end);length=0>end?Math.max(length+end,0):Math.min(end,length);}result=new Array(length-index);for(count=0;index<length;++index,++count){if(index in elements){result[count]=elements[index];}}return result;};var indexOf=function(target,begin){var elements,length,index;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?Math.max(length+begin,0):Math.min(begin,length);}else{index=0;}for(;index<length;++index){if(index in elements&&target===elements[index]){return index;}}return-1;};var lastIndexOf=function(target,begin){var elements,length,index;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?length-Math.abs(begin):Math.min(begin,length-1);}else{index=length-1;}for(;-1<index;--index){if(index in elements&&target===elements[index]){return index;}}return-1;};var forEach=function(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){callback.call(scope,elements[index],index,elements);}}};var every=function(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements&&!callback.call(scope,elements[index],index,elements)){return false;}}return true;};var some=function(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements&&callback.call(scope,elements[index],index,elements)){return true;}}return false;};var filter=function(callback,scope){var result=[],elements,length,index,count;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=count=0;index<length;++index){if(index in elements&&callback.call(scope,elements[index],index,elements)){result[count++]=elements[index];}}return result;};var map=function(callback,scope){var result=[],elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){result[index]=callback.call(scope,elements[index],index,elements);}}return result;};var reduce=function(callback,value){var elements,isset,length,index;elements=Object(this);requireFunction(callback);isset=undefined!==value;length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){if(isset){value=callback(value,elements[index],index,elements);}else{value=elements[index];isset=true;}}}requireValue(isset);return value;};var reduceRight=function(callback,value){var elements,isset,index;elements=Object(this);requireFunction(callback);isset=undefined!==value;index=(elements.length>>>0)-1;for(;-1<index;--index){if(index in elements){if(isset){value=callback(value,elements[index],index,elements);}else{value=elements[index];isset=true;}}}requireValue(isset);return value;};function isArray(value){return"[object Array]"===Object.prototype.toString.call(value);}function requireFunction(value){if("[object Function]"!==Object.prototype.toString.call(value)){throw new Error(value+" is not a function");}}function requireValue(isset){if(!isset){throw new Error("reduce of empty array with no initial value");}}function supportsStandard(key){var support=true;if(Array.prototype[key]){try{Array.prototype[key].call(undefined,/test/,null);support=false;}catch(e){}}else{support=false;}return support;}function supportsGeneric(key){var support=true;if(Array[key]){try{Array[key](undefined,/test/,null);support=false;}catch(e){}}else{support=false;}return support;}function extendArray(key){if(!supportsGeneric(key)){Array[key]=createGeneric(key);}}function createGeneric(key){return function(elements){var list;if(undefined===elements||null===elements){throw new Error("Array.prototype."+key+" called on "+elements);}list=Array.prototype.slice.call(arguments,1);return Array.prototype[key].apply(elements,list);};}var ES5={"indexOf":indexOf,"lastIndexOf":lastIndexOf,"forEach":forEach,"every":every,"some":some,"filter":filter,"map":map,"reduce":reduce,"reduceRight":reduceRight};for(var key in ES5){if(ES5.hasOwnProperty(key)){if(!supportsStandard(key)){Array.prototype[key]=ES5[key];}extendArray(key);}}Array.isArray=Array.isArray||isArray;["concat","join","slice","pop","push","reverse","shift","sort","splice","unshift"].forEach(extendArray);if(document){try{Array.slice(document.childNodes);}catch(e){Array.prototype.slice=slice;}}}("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {},1/0));
/*jshint bitwise: true */
/*!
 * Lightweight ES6 Promise polyfill for the browser and node. A+ Compliant
 * @see {@link https://github.com/taylorhakes/promise-polyfill/blob/master/promise.js}
 * IE11 needs that
 */
(function(root){"use strict";var setTimeoutFunc=setTimeout;function noop(){}function bind(fn,thisArg){return function(){fn.apply(thisArg,arguments);};}function Promise(fn){if(typeof this!=="object"){throw new TypeError("Promises must be constructed via new");}if(typeof fn!=="function"){throw new TypeError("not a function");}this._state=0;this._handled=false;this._value=undefined;this._deferreds=[];doResolve(fn,this);}function handle(self,deferred){while(self._state===3){self=self._value;}if(self._state===0){self._deferreds.push(deferred);return;}self._handled=true;Promise._immediateFn(function(){var cb=self._state===1?deferred.onFulfilled:deferred.onRejected;if(cb===null){(self._state===1?resolve:reject)(deferred.promise,self._value);return;}var ret;try{ret=cb(self._value);}catch(e){reject(deferred.promise,e);return;}resolve(deferred.promise,ret);});}function resolve(self,newValue){try{if(newValue===self){throw new TypeError("A promise cannot be resolved with itself.");}if(newValue&&(typeof newValue==="object"||typeof newValue==="function")){var then=newValue.then;if(newValue instanceof Promise){self._state=3;self._value=newValue;finale(self);return;}else if(typeof then==="function"){doResolve(bind(then,newValue),self);return;}}self._state=1;self._value=newValue;finale(self);}catch(e){reject(self,e);}}function reject(self,newValue){self._state=2;self._value=newValue;finale(self);}function finale(self){if(self._state===2&&self._deferreds.length===0){Promise._immediateFn(function(){if(!self._handled){Promise._unhandledRejectionFn(self._value);}});}for(var i=0,len=self._deferreds.length;i<len;i++){handle(self,self._deferreds[i]);}self._deferreds=null;}function Handler(onFulfilled,onRejected,promise){this.onFulfilled=typeof onFulfilled==="function"?onFulfilled:null;this.onRejected=typeof onRejected==="function"?onRejected:null;this.promise=promise;}function doResolve(fn,self){var done=false;try{fn(function(value){if(done){return;}done=true;resolve(self,value);},function(reason){if(done){return;}done=true;reject(self,reason);});}catch(ex){if(done){return;}done=true;reject(self,ex);}}Promise.prototype["catch"]=function(onRejected){return this.then(null,onRejected);};Promise.prototype.then=function(onFulfilled,onRejected){var prom=new(this.constructor)(noop);handle(this,new Handler(onFulfilled,onRejected,prom));return prom;};Promise.all=function(arr){var args=Array.prototype.slice.call(arr);return new Promise(function(resolve,reject){if(args.length===0){return resolve([]);}var remaining=args.length;function res(i,val){try{if(val&&(typeof val==="object"||typeof val==="function")){var then=val.then;if(typeof then==="function"){then.call(val,function(val){res(i,val);},reject);return;}}args[i]=val;if(--remaining===0){resolve(args);}}catch(ex){reject(ex);}}for(var i=0;i<args.length;i++){res(i,args[i]);}});};Promise.resolve=function(value){if(value&&typeof value==="object"&&value.constructor===Promise){return value;}return new Promise(function(resolve){resolve(value);});};Promise.reject=function(value){return new Promise(function(resolve,reject){reject(value);});};Promise.race=function(values){return new Promise(function(resolve,reject){for(var i=0,len=values.length;i<len;i++){values[i].then(resolve,reject);}});};Promise._immediateFn=(typeof setImmediate==="function"&&function(fn){setImmediate(fn);})||function(fn){setTimeoutFunc(fn,0);};Promise._unhandledRejectionFn=function _unhandledRejectionFn(err){if(typeof console!=="undefined"&&console){console.warn("Possible Unhandled Promise Rejection:",err);}};Promise._setImmediateFn=function _setImmediateFn(fn){Promise._immediateFn=fn;};Promise._setUnhandledRejectionFn=function _setUnhandledRejectionFn(fn){Promise._unhandledRejectionFn=fn;};if(typeof module!=="undefined"&&module.exports){module.exports=Promise;}else if(!root.Promise){root.Promise=Promise;}}("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}));
/*!
 * A window.fetch JavaScript polyfill
 * @see {@link https://github.com/github/fetch/blob/master/fetch.js}
 * IE11/Edge13 needs that
 */
(function(self){"use strict";if(self.fetch){return;}var support={searchParams:'URLSearchParams'in self,iterable:'Symbol'in self&&'iterator'in Symbol,blob:'FileReader'in self&&'Blob'in self&&(function(){try{Blob();return true;}catch(e){return false;}})(),formData:'FormData'in self,arrayBuffer:'ArrayBuffer'in self};function normalizeName(name){if(typeof name!=="string"){name=String(name);}if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name');}return name.toLowerCase();}function normalizeValue(value){if(typeof value!=="string"){value=String(value);}return value;}function iteratorFor(items){var iterator={next:function(){var value=items.shift();return{done:value===undefined,value:value};}};if(support.iterable){iterator[Symbol.iterator]=function(){return iterator;};}return iterator;}function Headers(headers){this.map={};if(headers instanceof Headers){headers.forEach(function(value,name){this.append(name,value);},this);}else if(headers){Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name,headers[name]);},this);}}Headers.prototype.append=function(name,value){name=normalizeName(name);value=normalizeValue(value);var list=this.map[name];if(!list){list=[];this.map[name]=list;}list.push(value);};Headers.prototype['delete']=function(name){delete this.map[normalizeName(name)];};Headers.prototype.get=function(name){var values=this.map[normalizeName(name)];return values?values[0]:null;};Headers.prototype.getAll=function(name){return this.map[normalizeName(name)]||[];};Headers.prototype.has=function(name){return this.map.hasOwnProperty(normalizeName(name));};Headers.prototype.set=function(name,value){this.map[normalizeName(name)]=[normalizeValue(value)];};Headers.prototype.forEach=function(callback,thisArg){Object.getOwnPropertyNames(this.map).forEach(function(name){this.map[name].forEach(function(value){callback.call(thisArg,value,name,this);},this);},this);};Headers.prototype.keys=function(){var items=[];this.forEach(function(value,name){items.push(name);});return iteratorFor(items);};Headers.prototype.values=function(){var items=[];this.forEach(function(value){items.push(value);});return iteratorFor(items);};Headers.prototype.entries=function(){var items=[];this.forEach(function(value,name){items.push([name,value]);});return iteratorFor(items);};if(support.iterable){Headers.prototype[Symbol.iterator]=Headers.prototype.entries;}function consumed(body){if(body.bodyUsed){return Promise.reject(new TypeError('Already read'));}body.bodyUsed=true;}function fileReaderReady(reader){return new Promise(function(resolve,reject){reader.onload=function(){resolve(reader.result);};reader.onerror=function(){reject(reader.error);};});}function readBlobAsArrayBuffer(blob){var reader=new FileReader();reader.readAsArrayBuffer(blob);return fileReaderReady(reader);}function readBlobAsText(blob){var reader=new FileReader();reader.readAsText(blob);return fileReaderReady(reader);}function Body(){this.bodyUsed=false;this._initBody=function(body){this._bodyInit=body;if(typeof body==="string"){this._bodyText=body;}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body;}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body;}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this._bodyText=body.toString();}else if(!body){this._bodyText='';}else if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else{throw new Error('unsupported BodyInit type');}if(!this.headers.get('content-type')){if(typeof body==="string"){this.headers.set('content-type','text/plain;charset=UTF-8');}else if(this._bodyBlob&&this._bodyBlob.type){this.headers.set('content-type',this._bodyBlob.type);}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8');}}};if(support.blob){this.blob=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return Promise.resolve(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as blob');}else{return Promise.resolve(new Blob([this._bodyText]));}};this.arrayBuffer=function(){return this.blob().then(readBlobAsArrayBuffer);};this.text=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return readBlobAsText(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as text');}else{return Promise.resolve(this._bodyText);}};}else{this.text=function(){var rejected=consumed(this);return rejected?rejected:Promise.resolve(this._bodyText);};}if(support.formData){this.formData=function(){return this.text().then(decode);};}this.json=function(){return this.text().then(JSON.parse);};return this;}var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];function normalizeMethod(method){var upcased=method.toUpperCase();return(methods.indexOf(upcased)>-1)?upcased:method;}function Request(input,options){options=options||{};var body=options.body;if(Request.prototype.isPrototypeOf(input)){if(input.bodyUsed){throw new TypeError('Already read');}this.url=input.url;this.credentials=input.credentials;if(!options.headers){this.headers=new Headers(input.headers);}this.method=input.method;this.mode=input.mode;if(!body){body=input._bodyInit;input.bodyUsed=true;}}else{this.url=input;}this.credentials=options.credentials||this.credentials||'omit';if(options.headers||!this.headers){this.headers=new Headers(options.headers);}this.method=normalizeMethod(options.method||this.method||'GET');this.mode=options.mode||this.mode||null;this.referrer=null;if((this.method==='GET'||this.method==='HEAD')&&body){throw new TypeError('Body not allowed for GET or HEAD requests');}this._initBody(body);}Request.prototype.clone=function(){return new Request(this);};function decode(body){var form=new FormData();body.trim().split('&').forEach(function(bytes){if(bytes){var split=bytes.split('=');var name=split.shift().replace(/\+/g,' ');var value=split.join('=').replace(/\+/g,' ');form.append(decodeURIComponent(name),decodeURIComponent(value));}});return form;}function headers(xhr){var head=new Headers();var pairs=(xhr.getAllResponseHeaders()||'').trim().split('\n');pairs.forEach(function(header){var split=header.trim().split(':');var key=split.shift().trim();var value=split.join(':').trim();head.append(key,value);});return head;}Body.call(Request.prototype);function Response(bodyInit,options){if(!options){options={};}this.type='default';this.status=options.status;this.ok=this.status>=200&&this.status<300;this.statusText=options.statusText;this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);this.url=options.url||'';this._initBody(bodyInit);}Body.call(Response.prototype);Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url});};Response.error=function(){var response=new Response(null,{status:0,statusText:''});response.type='error';return response;};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(url,status){if(redirectStatuses.indexOf(status)===-1){throw new RangeError('Invalid status code');}return new Response(null,{status:status,headers:{location:url}});};self.Headers=Headers;self.Request=Request;self.Response=Response;self.fetch=function(input,init){return new Promise(function(resolve,reject){var request;if(Request.prototype.isPrototypeOf(input)&&!init){request=input;}else{request=new Request(input,init);}var xhr=new XMLHttpRequest();function responseURL(){if('responseURL'in xhr){return xhr.responseURL;}if(/^X-Request-URL:/mi.test(xhr.getAllResponseHeaders())){return xhr.getResponseHeader('X-Request-URL');}return;}xhr.onload=function(){var options={status:xhr.status,statusText:xhr.statusText,headers:headers(xhr),url:responseURL()};var body='response'in xhr?xhr.response:xhr.responseText;resolve(new Response(body,options));};xhr.onerror=function(){reject(new TypeError('Network request failed'));};xhr.ontimeout=function(){reject(new TypeError('Network request failed'));};xhr.open(request.method,request.url,true);if(request.credentials==='include'){xhr.withCredentials=true;}if('responseType'in xhr&&support.blob){xhr.responseType='blob';}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value);});xhr.send(typeof request._bodyInit==="undefined"?null:request._bodyInit);});};self.fetch.polyfill=true;}("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {}));
/*!
 * EventListener Polyfill for IE
 * @see {@link https://github.com/jonathantneal/EventListener/blob/master/EventListener.js}
 * IE8 needs that
 */
if(this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener){(function(){function addToPrototype(name,method){Window.prototype[name]=HTMLDocument.prototype[name]=Element.prototype[name]=method;}addToPrototype("addEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];if(!typeListeners.length){target.attachEvent("on"+type,typeListeners.event=function(event){var documentElement=target.document&&target.document.documentElement||target.documentElement||{scrollLeft:0,scrollTop:0};event.currentTarget=target;event.pageX=event.clientX+documentElement.scrollLeft;event.pageY=event.clientY+documentElement.scrollTop;event.preventDefault=function(){event.returnValue=false;};event.relatedTarget=event.fromElement||null;event.stopImmediatePropagation=function(){immediatePropagation=false;event.cancelBubble=true;};event.stopPropagation=function(){event.cancelBubble=true;};event.target=event.srcElement||target;event.timeStamp=+new Date();var plainEvt={};for(var i in event){if(event.hasOwnProperty(i)){plainEvt[i]=event[i];}}for(var j=0,typeListenersCache=[].concat(typeListeners),typeListenerCache,immediatePropagation=true;immediatePropagation&&(typeListenerCache=typeListenersCache[j]);++j){for(var ii=0,typeListener;!!(typeListener=typeListeners[ii]);++ii){if(typeListener===typeListenerCache){typeListener.call(target,plainEvt);break;}}}});}typeListeners.push(listener);});addToPrototype("removeEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];for(var i=typeListeners.length-1,typeListener;!!(typeListener=typeListeners[i]);--i){if(typeListener===listener){typeListeners.splice(i,1);break;}}if(!typeListeners.length&&typeListeners.event){target.detachEvent("on"+type,typeListeners.event);}});addToPrototype("dispatchEvent",function(eventObject){var target=this,type=eventObject.type,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];try{return target.fireEvent("on"+type,eventObject);}catch(error){if(typeListeners.event){typeListeners.event(eventObject);}return;}});Object.defineProperty(Window.prototype,"CustomEvent",{get:function(){var self=this;return function CustomEvent(type,eventInitDict){var event=self.document.createEventObject(),key;event.type=type;for(key in eventInitDict){if(key==="cancelable"){event.returnValue=!eventInitDict.cancelable;}else if(key==="bubbles"){event.cancelBubble=!eventInitDict.bubbles;}else if(key==="detail"){event.detail=eventInitDict.detail;}}return event;};}});function ready(event){if(ready.interval&&document.body){ready.interval=clearInterval(ready.interval);document.dispatchEvent(new CustomEvent("DOMContentLoaded"));}}ready.interval=setInterval(ready,1);window.addEventListener("load",ready);})();}if(!this.CustomEvent||typeof this.CustomEvent==="object"){(function(){this.CustomEvent=function CustomEvent(type,eventInitDict){var event;eventInitDict=eventInitDict||{bubbles:false,cancelable:false,detail:undefined};try{event=document.createEvent("CustomEvent");event.initCustomEvent(type,eventInitDict.bubbles,eventInitDict.cancelable,eventInitDict.detail);}catch(error){event=document.createEvent("Event");event.initEvent(type,eventInitDict.bubbles,eventInitDict.cancelable);event.detail=eventInitDict.detail;}return event;};}());}
/*!
 * @see {@link https://github.com/webcomponents/template/blob/master/template.js}
 * IE11 needs that, and Edge13 needs that in head
 * @see {@link https://github.com/Polymer/polymer-bundler/issues/347}
 */
/*!
 * @see {@link https://github.com/jeffcarp/template-polyfill/blob/master/index.js}
 * IE11 needs that, and Edge13 needs that in head
 * @see {@link https://github.com/Polymer/polymer-bundler/issues/347}
 */
/*!
 * Financial-Times/polyfill-service/polyfills/Event/hashchange/polyfill.js
 * @see {@link https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/Event/hashchange/polyfill.js}
 * Chrome4 needs that
 */
(function(global){var hash=global.location.hash;function poll(){if(hash!==global.location.hash){hash=global.location.hash;global.dispatchEvent(new Event("hashchange"));}setTimeout(poll,500);}global.onhashchange=function(){};poll();}("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {}));
/*!
 * importNode() polyfill for IE8
 * @see {@link https://gist.github.com/dchambers/0abcec9eaf529f993b9d}
 */
//(function(){"use strict";if(!window.DocumentFragment&&window.HTMLDocument){window.DocumentFragment=HTMLDocument;}if(!document.ELEMENT_NODE){document.ELEMENT_NODE=1;document.ATTRIBUTE_NODE=2;document.TEXT_NODE=3;document.CDATA_SECTION_NODE=4;document.ENTITY_REFERENCE_NODE=5;document.ENTITY_NODE=6;document.PROCESSING_INSTRUCTION_NODE=7;document.COMMENT_NODE=8;document.DOCUMENT_NODE=9;document.DOCUMENT_TYPE_NODE=10;document.DOCUMENT_FRAGMENT_NODE=11;document.NOTATION_NODE=12;}if(!document.createElementNS){document.createElementNS=function(namespaceURI,qualifiedName){return document.createElement(qualifiedName);};}if(!document.importNode){document.importNode=function(node,deep){var a,i,il;switch(node.nodeType){case document.ELEMENT_NODE:var newNode=document.createElementNS(node.namespaceURI,node.nodeName);if(node.attributes&&node.attributes.length>0){for(i=0,il=node.attributes.length;i<il;i++){a=node.attributes[i];try{newNode.setAttributeNS(a.namespaceURI,a.nodeName,node.getAttribute(a.nodeName));}catch(err){}}}if(deep&&node.childNodes&&node.childNodes.length>0){for(i=0,il=node.childNodes.length;i<il;i++){newNode.appendChild(document.importNode(node.childNodes[i],deep));}}return newNode;case document.TEXT_NODE:case document.CDATA_SECTION_NODE:return document.createTextNode(node.nodeValue);case document.COMMENT_NODE:return document.createComment(node.nodeValue);case document.DOCUMENT_FRAGMENT_NODE:docFragment=document.createDocumentFragment();for(i=0,il=node.childNodes.length;i<il;++i){docFragment.appendChild(document.importNode(node.childNodes[i],deep));}return docFragment;}};}}());
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.2.201711092
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */
/* jshint bitwise: false */
if ("document" in self) {
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
		(function (view) {
			"use strict";
			if (!('Element' in view)) {
				return;
			}
			var classListProp = "classList",
			protoProp = "prototype",
			elemCtrProto = view.Element[protoProp],
			objCtr = Object,
			strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			arrIndexOf = Array[protoProp].indexOf || function (item) {
				var
				i = 0,
				len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			},
			DOMEx = function (type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			checkTokenAndGetIndex = function (classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "The token must not be empty.");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
				}
				return arrIndexOf.call(classList, token);
			},
			ClassList = function (elem) {
				var
				trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				i = 0,
				len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			classListProto = ClassList[protoProp] = [],
			classListGetter = function () {
				return new ClassList(this);
			};
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				return !~checkTokenAndGetIndex(this, token + "");
			};
			classListProto.add = function () {
				var
				tokens = arguments,
				i = 0,
				l = tokens.length,
				token,
				updated = false;
				do {
					token = tokens[i] + "";
					if (~checkTokenAndGetIndex(this, token)) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);
				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var
				tokens = arguments,
				i = 0,
				l = tokens.length,
				token,
				updated = false,
				index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (~index) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);
				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				var
				result = this.contains(token),
				method = result ? force !== true && "remove" : force !== false && "add";
				if (method) {
					this[method](token);
				}
				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.replace = function (token, replacement_token) {
				var index = checkTokenAndGetIndex(token + "");
				if (~index) {
					this.splice(index, 1, replacement_token);
					this._updateClassName();
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};
			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		}
			(self));
	}
	(function () {
		"use strict";
		var testElement = document.createElement("_");
		testElement.classList.add("c1", "c2");
		if (!testElement.classList.contains("c2")) {
			var createMethod = function (method) {
				var original = DOMTokenList.prototype[method];
				DOMTokenList.prototype[method] = function (token) {
					var i,
					len = arguments.length;
					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}
		testElement.classList.toggle("c3", false);
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;
			DOMTokenList.prototype.toggle = function (token, force) {
				var _contains_token = !this.contains(token);
				var _force = !force;
				if (1 in arguments && _contains_token === _force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}
		if (!("replace" in document.createElement("_").classList)) {
			DOMTokenList.prototype.replace = function (token, replacement_token) {
				var	tokens = this.toString().split(" "),
				index = tokens.indexOf(token + "");
				if (~index) {
					tokens = tokens.slice(index);
					this.remove.apply(this, tokens);
					this.add(replacement_token);
					this.add.apply(this, tokens.slice(1));
				}
			};
		}
		testElement = null;
	})();
}
/* jshint bitwise: true */
/*!
 * modified dataset.js
 * @see {@link https://github.com/remy/polyfills/blob/master/dataset.js}
 * passes jshint
 */
(function(){"use strict";var forEach=[].forEach,regex=/^data-(.+)/,dashChar=/\-([a-z])/ig,el=document.createElement("div"),mutationSupported=false,match,detectMutation=function(){mutationSupported=true;this.removeEventListener("DOMAttrModified",detectMutation,false);};function toCamelCase(s){return s.replace(dashChar,function(m,l){return l.toUpperCase();});}var updateDataset=function(){var dataset={};forEach.call(this.attributes,function(attr){match=attr.name.match(regex)||"";if(match){dataset[toCamelCase(match[1])]=attr.value;}});return dataset;};if("undefined"!==el.dataset){return;}el.addEventListener("DOMAttrModified",detectMutation,false);el.setAttribute("foo","bar");function defineElementGetter(obj,prop,getter){if(Object.defineProperty){Object.defineProperty(obj,prop,{get:getter});}else{obj.__defineGetter__(prop,getter);}}defineElementGetter(Element.prototype,"dataset",mutationSupported?function(){if(!this._datasetCache){this._datasetCache=updateDataset.call(this);}return this._datasetCache;}:updateDataset);document.addEventListener("DOMAttrModified",function(event){delete event.target._datasetCache;},false);}());
/*!
 * modified matchMedia() polyfill - Test a CSS media type/query in JS.
 * @see {@link https://github.com/paulirish/matchMedia.js}
 * Authors & copyright (c) 2012:
 * Scott Jehl, Paul Irish, Nicholas Zakas, David Knight.
 * Dual MIT/BSD license
 * fixed Expected an assignment or function call and instead saw an expression.
 * @see {@link https://github.com/paulirish/matchMedia.js/blob/master/matchMedia.js}
 * passes jshint
 */
if(!window.matchMedia){window.matchMedia=(function(){"use strict";var styleMedia=(window.styleMedia||window.media);if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script);info=('getComputedStyle'in window)&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';if(style.styleSheet){style.styleSheet.cssText=text;}else{style.textContent=text;}return info.width==='1px';}};}return function(media){return{matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}());}
/*!
 * modified paulirish.com/2011/requestanimationframe-for-smart-animating/
 * my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Moller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 * @see {@link https://gist.github.com/paulirish/1579671}
 * passes jshint
 */
(function(){for(var e=0,b=["ms","moz","webkit","o"],a=0;a<b.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[b[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[a]+"CancelAnimationFrame"]||window[b[a]+"CancelRequestAnimationFrame"];}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(a,b){var c=(new Date()).getTime(),d=Math.max(0,16-(c-e)),f=window.setTimeout(function(){a(c+d);},d);e=c+d;return f;};}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(a){clearTimeout(a);};}}());
/*!
 * Polyfill for Function.prototype.bind
 * @see {@link https://gist.github.com/Daniel-Hug/5682738}
 * @see {@link https://gist.github.com/englishextra/db0f22a60e59de86c19f174938c09529}
 */
if(!Function.prototype.bind){Function.prototype.bind=(function(){}).bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}function c(){}var a=[].slice,f=a.call(arguments,1),e=this,d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};}
/*!
 * textContent Polyfill for IE8
 * @see {@link https://developer.mozilla.org/en/docs/Web/API/Node/textContent}
 */
if(Object.defineProperty&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(Element.prototype,"textContent")&&!Object.getOwnPropertyDescriptor(Element.prototype,"textContent").get){(function(){var innerText=Object.getOwnPropertyDescriptor(Element.prototype,"innerText");Object.defineProperty(Element.prototype,"textContent",{get:function(){return innerText.get.call(this);},set:function(s){return innerText.set.call(this,s);}});}());}
/*!
 * modified Storage.js
 * @see {@link https://github.com/remy/polyfills/blob/master/Storage.js}
 * fixed 0 === comparison
 * passes jshint
 */
if(typeof window.localStorage==="undefined"||typeof window.sessionStorage==="undefined"){(function(){var Storage=function(type){function createCookie(name,value,days){var date,expires;if(days){date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString();}else{expires="";}document.cookie=name+"="+value+expires+"; path=/";}function readCookie(name){var nameEQ=name+"=",ca=document.cookie.split(";"),i,c;for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===" "){c=c.substring(1,c.length);}if(c.indexOf(nameEQ)===0){return c.substring(nameEQ.length,c.length);}}return null;}function setData(data){data=JSON.stringify(data);if(type==="session"){window.name=data;}else{createCookie("localStorage",data,365);}}function clearData(){if(type==="session"){window.name="";}else{createCookie("localStorage","",365);}}function getData(){var data=type==="session"?window.name:readCookie("localStorage");return data?JSON.parse(data):{};}var data=getData();return{length:0,clear:function(){data={};this.length=0;clearData();},getItem:function(key){return data[key]===undefined?null:data[key];},key:function(i){var ctr=0;for(var k in data){if(ctr===i){return k;}else{ctr++;}}return null;},removeItem:function(key){delete data[key];this.length--;setData(data);},setItem:function(key,value){data[key]=value+"";this.length++;setData(data);}};};if(typeof window.localStorage==="undefined"){window.localStorage=new Storage("local");}if(typeof window.sessionStorage==="undefined"){window.sessionStorage=new Storage("session");}}());}
/*!
 * modified weakmap-polyfill v2.0.0 - ECMAScript6 WeakMap polyfill
 * @see {@link https://github.com/polygonplanet/weakmap-polyfill}
 * Copyright (c) 2015-2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 * passes jshint
 */
(function(e){"use strict";if(e.WeakMap){return;}var t=Object.prototype.hasOwnProperty;var r=function(e,t,r){if(Object.defineProperty){Object.defineProperty(e,t,{configurable:true,writable:true,value:r});}else{e[t]=r;}};e.WeakMap=(function(){function WeakMap(){if(this===void 0){throw new TypeError("Constructor WeakMap requires 'new'");}r(this,"_id",genId("_WeakMap"));if(arguments.length>0){throw new TypeError("WeakMap iterable is not supported");}}r(WeakMap.prototype,"delete",function(e){checkInstance(this,"delete");if(!isObject(e)){return false;}var t=e[this._id];if(t&&t[0]===e){delete e[this._id];return true;}return false;});r(WeakMap.prototype,"get",function(e){checkInstance(this,"get");if(!isObject(e)){return void 0;}var t=e[this._id];if(t&&t[0]===e){return t[1];}return void 0;});r(WeakMap.prototype,"has",function(e){checkInstance(this,"has");if(!isObject(e)){return false;}var t=e[this._id];if(t&&t[0]===e){return true;}return false;});r(WeakMap.prototype,"set",function(e,t){checkInstance(this,"set");if(!isObject(e)){throw new TypeError("Invalid value used as weak map key");}var n=e[this._id];if(n&&n[0]===e){n[1]=t;return this;}r(e,this._id,[e,t]);return this;});function checkInstance(e,r){if(!isObject(e)||!t.call(e,"_id")){throw new TypeError(r+" method called on incompatible receiver "+typeof e);}}function genId(e){return e+"_"+rand()+"."+rand();}function rand(){return Math.random().toString().substring(2);}r(WeakMap,"_polyfill",true);return WeakMap;}());function isObject(e){return Object(e)===e;}}("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {}));
/*!
 * modified github.com/webcomponents/webcomponentsjs/blob/master/src/MutationObserver/MutationObserver.js
 * closure-compiler.appspot.com/code/jsc665493f158bf71252a410cf61ec2ee93/default.js
 * v0.7.22
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 * fixed no break in case
 * removed var for already declared variables
 * passes jshint with suppressing comments
 */
/*jshint -W086 */
(function(global){if(global.JsMutationObserver){return;}var registrationsTable=new WeakMap();var setImmediate;if(/Trident|Edge/.test(navigator.userAgent)){setImmediate=setTimeout;}else if(window.setImmediate){setImmediate=window.setImmediate;}else{var setImmediateQueue=[];var sentinel=String(Math.random());window.addEventListener("message",function(e){if(e.data===sentinel){var queue=setImmediateQueue;setImmediateQueue=[];queue.forEach(function(func){func();});}});setImmediate=function(func){setImmediateQueue.push(func);window.postMessage(sentinel,"*");};}var isScheduled=false;var scheduledObservers=[];function scheduleCallback(observer){scheduledObservers.push(observer);if(!isScheduled){isScheduled=true;setImmediate(dispatchCallbacks);}}function wrapIfNeeded(node){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(node)||node;}function dispatchCallbacks(){isScheduled=false;var observers=scheduledObservers;scheduledObservers=[];observers.sort(function(o1,o2){return o1.uid_-o2.uid_;});var anyNonEmpty=false;observers.forEach(function(observer){var queue=observer.takeRecords();removeTransientObserversFor(observer);if(queue.length){observer.callback_(queue,observer);anyNonEmpty=true;}});if(anyNonEmpty){dispatchCallbacks();}}function removeTransientObserversFor(observer){observer.nodes_.forEach(function(node){var registrations=registrationsTable.get(node);if(!registrations){return;}registrations.forEach(function(registration){if(registration.observer===observer){registration.removeTransientObservers();}});});}function forEachAncestorAndObserverEnqueueRecord(target,callback){for(var node=target;node;node=node.parentNode){var registrations=registrationsTable.get(node);if(registrations){for(var j=0;j<registrations.length;j++){var registration=registrations[j];var options=registration.options;if(node!==target&&!options.subtree){continue;}var record=callback(options);if(record){registration.enqueue(record);}}}}}var uidCounter=0;function JsMutationObserver(callback){this.callback_=callback;this.nodes_=[];this.records_=[];this.uid_=++uidCounter;}JsMutationObserver.prototype={observe:function(target,options){target=wrapIfNeeded(target);if(!options.childList&&!options.attributes&&!options.characterData||options.attributeOldValue&&!options.attributes||options.attributeFilter&&options.attributeFilter.length&&!options.attributes||options.characterDataOldValue&&!options.characterData){throw new SyntaxError();}var registrations=registrationsTable.get(target);if(!registrations){registrationsTable.set(target,registrations=[]);}var registration;for(var i=0;i<registrations.length;i++){if(registrations[i].observer===this){registration=registrations[i];registration.removeListeners();registration.options=options;break;}}if(!registration){registration=new Registration(this,target,options);registrations.push(registration);this.nodes_.push(target);}registration.addListeners();},disconnect:function(){this.nodes_.forEach(function(node){var registrations=registrationsTable.get(node);for(var i=0;i<registrations.length;i++){var registration=registrations[i];if(registration.observer===this){registration.removeListeners();registrations.splice(i,1);break;}}},this);this.records_=[];},takeRecords:function(){var copyOfRecords=this.records_;this.records_=[];return copyOfRecords;}};function MutationRecord(type,target){this.type=type;this.target=target;this.addedNodes=[];this.removedNodes=[];this.previousSibling=null;this.nextSibling=null;this.attributeName=null;this.attributeNamespace=null;this.oldValue=null;}function copyMutationRecord(original){var record=new MutationRecord(original.type,original.target);record.addedNodes=original.addedNodes.slice();record.removedNodes=original.removedNodes.slice();record.previousSibling=original.previousSibling;record.nextSibling=original.nextSibling;record.attributeName=original.attributeName;record.attributeNamespace=original.attributeNamespace;record.oldValue=original.oldValue;return record;}var currentRecord,recordWithOldValue;function getRecord(type,target){var retval=(currentRecord=new MutationRecord(type,target));return retval;}function getRecordWithOldValue(oldValue){if(recordWithOldValue){return recordWithOldValue;}recordWithOldValue=copyMutationRecord(currentRecord);recordWithOldValue.oldValue=oldValue;return recordWithOldValue;}function clearRecords(){currentRecord=recordWithOldValue=undefined;}function recordRepresentsCurrentMutation(record){return record===recordWithOldValue||record===currentRecord;}function selectRecord(lastRecord,newRecord){if(lastRecord===newRecord){return lastRecord;}if(recordWithOldValue&&recordRepresentsCurrentMutation(lastRecord)){return recordWithOldValue;}return null;}function Registration(observer,target,options){this.observer=observer;this.target=target;this.options=options;this.transientObservedNodes=[];}Registration.prototype={enqueue:function(record){var records=this.observer.records_;var length=records.length;if(records.length>0){var lastRecord=records[length-1];var recordToReplaceLast=selectRecord(lastRecord,record);if(recordToReplaceLast){records[length-1]=recordToReplaceLast;return;}}else{scheduleCallback(this.observer);}records[length]=record;},addListeners:function(){this.addListeners_(this.target);},addListeners_:function(node){var options=this.options;if(options.attributes){node.addEventListener("DOMAttrModified",this,true);}if(options.characterData){node.addEventListener("DOMCharacterDataModified",this,true);}if(options.childList){node.addEventListener("DOMNodeInserted",this,true);}if(options.childList||options.subtree){node.addEventListener("DOMNodeRemoved",this,true);}},removeListeners:function(){this.removeListeners_(this.target);},removeListeners_:function(node){var options=this.options;if(options.attributes){node.removeEventListener("DOMAttrModified",this,true);}if(options.characterData){node.removeEventListener("DOMCharacterDataModified",this,true);}if(options.childList){node.removeEventListener("DOMNodeInserted",this,true);}if(options.childList||options.subtree){node.removeEventListener("DOMNodeRemoved",this,true);}},addTransientObserver:function(node){if(node===this.target){return;}this.addListeners_(node);this.transientObservedNodes.push(node);var registrations=registrationsTable.get(node);if(!registrations){registrationsTable.set(node,registrations=[]);}registrations.push(this);},removeTransientObservers:function(){var transientObservedNodes=this.transientObservedNodes;this.transientObservedNodes=[];transientObservedNodes.forEach(function(node){this.removeListeners_(node);var registrations=registrationsTable.get(node);for(var i=0;i<registrations.length;i++){if(registrations[i]===this){registrations.splice(i,1);break;}}},this);},handleEvent:function(e){e.stopImmediatePropagation();switch(e.type){case"DOMAttrModified":var name=e.attrName;var namespace=e.relatedNode.namespaceURI;var target=e.target;var record=new getRecord("attributes",target);record.attributeName=name;record.attributeNamespace=namespace;var oldValue=e.attrChange===MutationEvent.ADDITION?null:e.prevValue;forEachAncestorAndObserverEnqueueRecord(target,function(options){if(!options.attributes){return;}if(options.attributeFilter&&options.attributeFilter.length&&options.attributeFilter.indexOf(name)===-1&&options.attributeFilter.indexOf(namespace)===-1){return;}if(options.attributeOldValue){return getRecordWithOldValue(oldValue);}return record;});break;case"DOMCharacterDataModified":target=e.target;record=getRecord("characterData",target);oldValue=e.prevValue;forEachAncestorAndObserverEnqueueRecord(target,function(options){if(!options.characterData){return;}if(options.characterDataOldValue){return getRecordWithOldValue(oldValue);}return record;});break;case"DOMNodeRemoved":this.addTransientObserver(e.target);case"DOMNodeInserted":var changedNode=e.target;var addedNodes,removedNodes;if(e.type==="DOMNodeInserted"){addedNodes=[changedNode];removedNodes=[];}else{addedNodes=[];removedNodes=[changedNode];}var previousSibling=changedNode.previousSibling;var nextSibling=changedNode.nextSibling;record=getRecord("childList",e.target.parentNode);record.addedNodes=addedNodes;record.removedNodes=removedNodes;record.previousSibling=previousSibling;record.nextSibling=nextSibling;forEachAncestorAndObserverEnqueueRecord(e.relatedNode,function(options){if(!options.childList){return;}return record;});}clearRecords();}};global.JsMutationObserver=JsMutationObserver;if(!global.MutationObserver){global.MutationObserver=JsMutationObserver;JsMutationObserver._isPolyfilled=true;}}("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}));
/*jshint +W086 */
/*!
Copyright (C) 2013-2015 by Andrea Giammarchi - @WebReflection
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* jshint ignore:start */
(function(window){'use strict';function createDocumentFragment(){return document.createDocumentFragment();}function createElement(nodeName){return document.createElement(nodeName);}function enoughArguments(length,name){if(!length)throw new Error('Failed to construct '+name+': 1 argument required, but only 0 present.');}function mutationMacro(nodes){if(nodes.length===1){return textNodeIfString(nodes[0]);}for(var fragment=createDocumentFragment(),list=slice.call(nodes),i=0;i<nodes.length;i++){fragment.appendChild(textNodeIfString(list[i]));}return fragment;}function textNodeIfString(node){return typeof node==='string'?document.createTextNode(node):node;}for(var head,property,TemporaryPrototype,TemporaryTokenList,wrapVerifyToken,document=window.document,hOP=Object.prototype.hasOwnProperty,defineProperty=Object.defineProperty||function(object,property,descriptor){if(hOP.call(descriptor,'value')){object[property]=descriptor.value;}else{if(hOP.call(descriptor,'get'))object.__defineGetter__(property,descriptor.get);if(hOP.call(descriptor,'set'))object.__defineSetter__(property,descriptor.set);}return object;},indexOf=[].indexOf||function indexOf(value){var length=this.length;while(length--){if(this[length]===value){break;}}return length;},verifyToken=function(token){if(!token){throw'SyntaxError';}else if(spaces.test(token)){throw'InvalidCharacterError';}return token;},DOMTokenList=function(node){var noClassName=typeof node.className==='undefined',className=noClassName?(node.getAttribute('class')||''):node.className,isSVG=noClassName||typeof className==='object',value=(isSVG?(noClassName?className:className.baseVal):className).replace(trim,'');if(value.length){properties.push.apply(this,value.split(spaces));}this._isSVG=isSVG;this._=node;},classListDescriptor={get:function get(){return new DOMTokenList(this);},set:function(){}},uid='dom4-tmp-'.concat(Math.random()* +new Date()).replace('.','-'),trim=/^\s+|\s+$/g,spaces=/\s+/,SPACE='\x20',CLASS_LIST='classList',toggle=function toggle(token,force){if(this.contains(token)){if(!force){this.remove(token);}}else if(force===undefined||force){force=true;this.add(token);}return!!force;},DocumentFragmentPrototype=window.DocumentFragment&&DocumentFragment.prototype,Node=window.Node,NodePrototype=(Node||Element).prototype,CharacterData=window.CharacterData||Node,CharacterDataPrototype=CharacterData&&CharacterData.prototype,DocumentType=window.DocumentType,DocumentTypePrototype=DocumentType&&DocumentType.prototype,ElementPrototype=(window.Element||Node||window.HTMLElement).prototype,HTMLSelectElement=window.HTMLSelectElement||createElement('select').constructor,selectRemove=HTMLSelectElement.prototype.remove,ShadowRoot=window.ShadowRoot,SVGElement=window.SVGElement,idSpaceFinder=/ /g,idSpaceReplacer='\\ ',createQueryMethod=function(methodName){var createArray=methodName==='querySelectorAll';return function(css){var a,i,id,query,nl,selectors,node=this.parentNode;if(node){for(id=this.getAttribute('id')||uid,query=id===uid?id:id.replace(idSpaceFinder,idSpaceReplacer),selectors=css.split(','),i=0;i<selectors.length;i++){selectors[i]='#'+query+' '+selectors[i];}css=selectors.join(',');}if(id===uid)this.setAttribute('id',id);nl=(node||this)[methodName](css);if(id===uid)this.removeAttribute('id');if(createArray){i=nl.length;a=new Array(i);while(i--)a[i]=nl[i];}else{a=nl;}return a;};},addQueryAndAll=function(where){if(!('query'in where)){where.query=ElementPrototype.query;}if(!('queryAll'in where)){where.queryAll=ElementPrototype.queryAll;}},properties=['matches',(ElementPrototype.matchesSelector||ElementPrototype.webkitMatchesSelector||ElementPrototype.khtmlMatchesSelector||ElementPrototype.mozMatchesSelector||ElementPrototype.msMatchesSelector||ElementPrototype.oMatchesSelector||function matches(selector){var parentNode=this.parentNode;return!!parentNode&&-1<indexOf.call(parentNode.querySelectorAll(selector),this);}),'closest',function closest(selector){var parentNode=this,matches;while((matches=parentNode&&parentNode.matches)&&!parentNode.matches(selector)){parentNode=parentNode.parentNode;}return matches?parentNode:null;},'prepend',function prepend(){var firstChild=this.firstChild,node=mutationMacro(arguments);if(firstChild){this.insertBefore(node,firstChild);}else{this.appendChild(node);}},'append',function append(){this.appendChild(mutationMacro(arguments));},'before',function before(){var parentNode=this.parentNode;if(parentNode){parentNode.insertBefore(mutationMacro(arguments),this);}},'after',function after(){var parentNode=this.parentNode,nextSibling=this.nextSibling,node=mutationMacro(arguments);if(parentNode){if(nextSibling){parentNode.insertBefore(node,nextSibling);}else{parentNode.appendChild(node);}}},'replace',function replace(){this.replaceWith.apply(this,arguments);},'replaceWith',function replaceWith(){var parentNode=this.parentNode;if(parentNode){parentNode.replaceChild(mutationMacro(arguments),this);}},'remove',function remove(){var parentNode=this.parentNode;if(parentNode){parentNode.removeChild(this);}},'query',createQueryMethod('querySelector'),'queryAll',createQueryMethod('querySelectorAll')],slice=properties.slice,i=properties.length;i;i-=2){property=properties[i-2];if(!(property in ElementPrototype)){ElementPrototype[property]=properties[i-1];}if(property==='remove'){HTMLSelectElement.prototype[property]=function(){return 0<arguments.length?selectRemove.apply(this,arguments):ElementPrototype.remove.call(this);};}if(/^(?:before|after|replace|replaceWith|remove)$/.test(property)){if(CharacterData&&!(property in CharacterDataPrototype)){CharacterDataPrototype[property]=properties[i-1];}if(DocumentType&&!(property in DocumentTypePrototype)){DocumentTypePrototype[property]=properties[i-1];}}if(/^(?:append|prepend)$/.test(property)){if(DocumentFragmentPrototype){if(!(property in DocumentFragmentPrototype)){DocumentFragmentPrototype[property]=properties[i-1];}}else{try{createDocumentFragment().constructor.prototype[property]=properties[i-1];}catch(o_O){}}}}addQueryAndAll(document);if(DocumentFragmentPrototype){addQueryAndAll(DocumentFragmentPrototype);}else{try{addQueryAndAll(createDocumentFragment().constructor.prototype);}catch(o_O){}}if(ShadowRoot){addQueryAndAll(ShadowRoot.prototype);}if(!createElement('a').matches('a')){ElementPrototype[property]=function(matches){return function(selector){return matches.call(this.parentNode?this:createDocumentFragment().appendChild(this),selector);};}(ElementPrototype[property]);}DOMTokenList.prototype={length:0,add:function add(){for(var j=0,token;j<arguments.length;j++){token=arguments[j];if(!this.contains(token)){properties.push.call(this,property);}}if(this._isSVG){this._.setAttribute('class',''+this);}else{this._.className=''+this;}},contains:(function(indexOf){return function contains(token){i=indexOf.call(this,property=verifyToken(token));return-1<i;};}([].indexOf||function(token){i=this.length;while(i--&&this[i]!==token){}return i;})),item:function item(i){return this[i]||null;},remove:function remove(){for(var j=0,token;j<arguments.length;j++){token=arguments[j];if(this.contains(token)){properties.splice.call(this,i,1);}}if(this._isSVG){this._.setAttribute('class',''+this);}else{this._.className=''+this;}},toggle:toggle,toString:function toString(){return properties.join.call(this,SPACE);}};if(SVGElement&&!(CLASS_LIST in SVGElement.prototype)){defineProperty(SVGElement.prototype,CLASS_LIST,classListDescriptor);}if(!(CLASS_LIST in document.documentElement)){defineProperty(ElementPrototype,CLASS_LIST,classListDescriptor);}else{TemporaryTokenList=createElement('div')[CLASS_LIST];TemporaryTokenList.add('a','b','a');if('a\x20b'!=TemporaryTokenList){TemporaryPrototype=TemporaryTokenList.constructor.prototype;if(!('add'in TemporaryPrototype)){TemporaryPrototype=window.TemporaryTokenList.prototype;}wrapVerifyToken=function(original){return function(){var i=0;while(i<arguments.length){original.call(this,arguments[i++]);}};};TemporaryPrototype.add=wrapVerifyToken(TemporaryPrototype.add);TemporaryPrototype.remove=wrapVerifyToken(TemporaryPrototype.remove);TemporaryPrototype.toggle=toggle;}}if(!('contains'in NodePrototype)){defineProperty(NodePrototype,'contains',{value:function(el){while(el&&el!==this)el=el.parentNode;return this===el;}});}if(!('head'in document)){defineProperty(document,'head',{get:function(){return head||(head=document.getElementsByTagName('head')[0]);}});}(function(){for(var raf,rAF=window.requestAnimationFrame,cAF=window.cancelAnimationFrame,prefixes=['o','ms','moz','webkit'],i=prefixes.length;!cAF&&i--;){rAF=rAF||window[prefixes[i]+'RequestAnimationFrame'];cAF=window[prefixes[i]+'CancelAnimationFrame']||window[prefixes[i]+'CancelRequestAnimationFrame'];}if(!cAF){if(rAF){raf=rAF;rAF=function(callback){var goOn=true;raf(function(){if(goOn)callback.apply(this,arguments);});return function(){goOn=false;};};cAF=function(id){id();};}else{rAF=function(callback){return setTimeout(callback,15,15);};cAF=function(id){clearTimeout(id);};}}window.requestAnimationFrame=rAF;window.cancelAnimationFrame=cAF;}());try{new window.CustomEvent('?');}catch(o_O){window.CustomEvent=function(eventName,defaultInitDict){function CustomEvent(type,eventInitDict){var event=document.createEvent(eventName);if(typeof type!='string'){throw new Error('An event name must be provided');}if(eventName=='Event'){event.initCustomEvent=initCustomEvent;}if(eventInitDict==null){eventInitDict=defaultInitDict;}event.initCustomEvent(type,eventInitDict.bubbles,eventInitDict.cancelable,eventInitDict.detail);return event;}function initCustomEvent(type,bubbles,cancelable,detail){this.initEvent(type,bubbles,cancelable);this.detail=detail;}return CustomEvent;}(window.CustomEvent?'CustomEvent':'Event',{bubbles:false,cancelable:false,detail:null});}try{new Event('_');}catch(o_O){o_O=(function($Event){function Event(type,init){enoughArguments(arguments.length,'Event');var out=document.createEvent('Event');if(!init)init={};out.initEvent(type,!!init.bubbles,!!init.cancelable);return out;}Event.prototype=$Event.prototype;return Event;}(window.Event||function Event(){}));defineProperty(window,'Event',{value:o_O});if(Event!==o_O)Event=o_O;}try{new KeyboardEvent('_',{});}catch(o_O){o_O=(function($KeyboardEvent){var initType=0,defaults={char:'',key:'',location:0,ctrlKey:false,shiftKey:false,altKey:false,metaKey:false,altGraphKey:false,repeat:false,locale:navigator.language,detail:0,bubbles:false,cancelable:false,keyCode:0,charCode:0,which:0},eventType;try{var e=document.createEvent('KeyboardEvent');e.initKeyboardEvent('keyup',false,false,window,'+',3,true,false,true,false,false);initType=((e.keyIdentifier||e.key)=='+'&&(e.keyLocation||e.location)==3)&&(e.ctrlKey?e.altKey?1:3:e.shiftKey?2:4)||9;}catch(o_O){}eventType=0<initType?'KeyboardEvent':'Event';function getModifier(init){for(var out=[],keys=['ctrlKey','Control','shiftKey','Shift','altKey','Alt','metaKey','Meta','altGraphKey','AltGraph'],i=0;i<keys.length;i+=2){if(init[keys[i]])out.push(keys[i+1]);}return out.join(' ');}function withDefaults(target,source){for(var key in source){if(source.hasOwnProperty(key)&&!source.hasOwnProperty.call(target,key))target[key]=source[key];}return target;}function withInitValues(key,out,init){try{out[key]=init[key];}catch(o_O){}}function KeyboardEvent(type,init){enoughArguments(arguments.length,'KeyboardEvent');init=withDefaults(init||{},defaults);var out=document.createEvent(eventType),ctrlKey=init.ctrlKey,shiftKey=init.shiftKey,altKey=init.altKey,metaKey=init.metaKey,altGraphKey=init.altGraphKey,modifiers=initType>3?getModifier(init):null,key=String(init.key),chr=String(init.char),location=init.location,keyCode=init.keyCode||((init.keyCode=key)&&key.charCodeAt(0))||0,charCode=init.charCode||((init.charCode=chr)&&chr.charCodeAt(0))||0,bubbles=init.bubbles,cancelable=init.cancelable,repeat=init.repeat,locale=init.locale,view=init.view||window,args;if(!init.which)init.which=init.keyCode;if('initKeyEvent'in out){out.initKeyEvent(type,bubbles,cancelable,view,ctrlKey,altKey,shiftKey,metaKey,keyCode,charCode);}else if(0<initType&&'initKeyboardEvent'in out){args=[type,bubbles,cancelable,view];switch(initType){case 1:args.push(key,location,ctrlKey,shiftKey,altKey,metaKey,altGraphKey);break;case 2:args.push(ctrlKey,altKey,shiftKey,metaKey,keyCode,charCode);break;case 3:args.push(key,location,ctrlKey,altKey,shiftKey,metaKey,altGraphKey);break;case 4:args.push(key,location,modifiers,repeat,locale);break;default:args.push(char,key,location,modifiers,repeat,locale);}out.initKeyboardEvent.apply(out,args);}else{out.initEvent(type,bubbles,cancelable);}for(key in out){if(defaults.hasOwnProperty(key)&&out[key]!==init[key]){withInitValues(key,out,init);}}return out;}KeyboardEvent.prototype=$KeyboardEvent.prototype;return KeyboardEvent;}(window.KeyboardEvent||function KeyboardEvent(){}));defineProperty(window,'KeyboardEvent',{value:o_O});if(KeyboardEvent!==o_O)KeyboardEvent=o_O;}try{new MouseEvent('_',{});}catch(o_O){o_O=(function($MouseEvent){function MouseEvent(type,init){enoughArguments(arguments.length,'MouseEvent');var out=document.createEvent('MouseEvent');if(!init)init={};out.initMouseEvent(type,!!init.bubbles,!!init.cancelable,init.view||window,init.detail||1,init.screenX||0,init.screenY||0,init.clientX||0,init.clientY||0,!!init.ctrlKey,!!init.altKey,!!init.shiftKey,!!init.metaKey,init.button||0,init.relatedTarget||null);return out;}MouseEvent.prototype=$MouseEvent.prototype;return MouseEvent;}(window.MouseEvent||function MouseEvent(){}));defineProperty(window,'MouseEvent',{value:o_O});if(MouseEvent!==o_O)MouseEvent=o_O;}}(window));(function(global){'use strict';var DOMMap=global.WeakMap||(function(){var counter=0,dispatched=false,drop=false,value;function dispatch(key,ce,shouldDrop){drop=shouldDrop;dispatched=false;value=undefined;key.dispatchEvent(ce);}function Handler(value){this.value=value;}Handler.prototype.handleEvent=function handleEvent(e){dispatched=true;if(drop){e.currentTarget.removeEventListener(e.type,this,false);}else{value=this.value;}};function DOMMap(){counter++;this.__ce__=new Event(('@DOMMap:'+counter)+Math.random());}DOMMap.prototype={'constructor':DOMMap,'delete':function del(key){return dispatch(key,this.__ce__,true),dispatched;},'get':function get(key){dispatch(key,this.__ce__,false);var v=value;value=undefined;return v;},'has':function has(key){return dispatch(key,this.__ce__,false),dispatched;},'set':function set(key,value){dispatch(key,this.__ce__,true);key.addEventListener(this.__ce__.type,new Handler(value),false);return this;},};return DOMMap;}());function Dict(){}Dict.prototype=(Object.create||Object)(null);function createEventListener(type,callback,options){function eventListener(e){if(eventListener.once){e.currentTarget.removeEventListener(e.type,callback,eventListener);eventListener.removed=true;}if(eventListener.passive){e.preventDefault=createEventListener.preventDefault;}if(typeof eventListener.callback==='function'){eventListener.callback.call(this,e);}else if(eventListener.callback){eventListener.callback.handleEvent(e);}if(eventListener.passive){delete e.preventDefault;}}eventListener.type=type;eventListener.callback=callback;eventListener.capture=!!options.capture;eventListener.passive=!!options.passive;eventListener.once=!!options.once;eventListener.removed=false;return eventListener;}createEventListener.preventDefault=function preventDefault(){};var Event=global.CustomEvent,hOP=Object.prototype.hasOwnProperty,dE=global.dispatchEvent,aEL=global.addEventListener,rEL=global.removeEventListener,counter=0,increment=function(){counter++;},indexOf=[].indexOf||function indexOf(value){var length=this.length;while(length--){if(this[length]===value){break;}}return length;},getListenerKey=function(options){return''.concat(options.capture?'1':'0',options.passive?'1':'0',options.once?'1':'0');},augment,proto;try{aEL('_',increment,{once:true});dE(new Event('_'));dE(new Event('_'));rEL('_',increment,{once:true});}catch(o_O){}if(counter!==1){(function(){var dm=new DOMMap();function createAEL(aEL){return function addEventListener(type,handler,options){if(options&&typeof options!=='boolean'){var info=dm.get(this),key=getListenerKey(options),i,tmp,wrap;if(!info)dm.set(this,(info=new Dict()));if(!(type in info))info[type]={handler:[],wrap:[]};tmp=info[type];i=indexOf.call(tmp.handler,handler);if(i<0){i=tmp.handler.push(handler)-1;tmp.wrap[i]=(wrap=new Dict());}else{wrap=tmp.wrap[i];}if(!(key in wrap)){wrap[key]=createEventListener(type,handler,options);aEL.call(this,type,wrap[key],wrap[key].capture);}}else{aEL.call(this,type,handler,options);}};}function createREL(rEL){return function removeEventListener(type,handler,options){if(options&&typeof options!=='boolean'){var info=dm.get(this),key,i,tmp,wrap;if(info&&(type in info)){tmp=info[type];i=indexOf.call(tmp.handler,handler);if(-1<i){key=getListenerKey(options);wrap=tmp.wrap[i];if(key in wrap){rEL.call(this,type,wrap[key],wrap[key].capture);delete wrap[key];for(key in wrap)return;tmp.handler.splice(i,1);tmp.wrap.splice(i,1);if(tmp.handler.length===0)delete info[type];}}}}else{rEL.call(this,type,handler,options);}};}augment=function(Constructor){if(!Constructor)return;var proto=Constructor.prototype;proto.addEventListener=createAEL(proto.addEventListener);proto.removeEventListener=createREL(proto.removeEventListener);};if(global.EventTarget){augment(EventTarget);}else{augment(global.Text);augment(global.Element||global.HTMLElement);augment(global.HTMLDocument);augment(global.Window||{prototype:global});augment(global.XMLHttpRequest);}}());}}(self));
/* jshint ignore:end */
