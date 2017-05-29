/*!
 * modified Prism is a lightweight, extensible syntax highlighter,
 * built with modern web standards in mind.
 * It's used in thousands of websites,
 * including some of those you visit daily.
 * @see {@link http://prismjs.com/}
 * source: prismjs.com/download.html?themes=prism&languages=markup+clike+javascript
 * passes jshint with suppressing comments
 */
/* jshint -W018 */
/* jshint -W030 */
/* jshint -W041 */
/* jshint boss: true */
/* jshint elision: true */
/* jshint forin: false */
/* jshint shadow: true */
/* jshint sub: true */
/* jslint bitwise: true */
var _self=(typeof window!=='undefined')?window:((typeof WorkerGlobalScope!=='undefined'&&self instanceof WorkerGlobalScope)?self:{});var Prism=(function(){var lang=/\blang(?:uage)?-(\w+)\b/i;var uniqueId=0;var _=_self.Prism={util:{encode:function(tokens){if(tokens instanceof Token){return new Token(tokens.type,_.util.encode(tokens.content),tokens.alias);}else if(_.util.type(tokens)==='Array'){return tokens.map(_.util.encode);}else{return tokens.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\u00a0/g,' ');}},type:function(o){return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];},objId:function(obj){if(!obj['__id']){Object.defineProperty(obj,'__id',{value:++uniqueId});}
return obj['__id'];},clone:function(o){var type=_.util.type(o);switch(type){case'Object':var clone={};for(var key in o){if(o.hasOwnProperty(key)){clone[key]=_.util.clone(o[key]);}}
return clone;case'Array':return o.map&&o.map(function(v){return _.util.clone(v);});}
return o;}},languages:{extend:function(id,redef){var lang=_.util.clone(_.languages[id]);for(var key in redef){lang[key]=redef[key];}
return lang;},insertBefore:function(inside,before,insert,root){root=root||_.languages;var grammar=root[inside];if(arguments.length==2){insert=arguments[1];for(var newToken in insert){if(insert.hasOwnProperty(newToken)){grammar[newToken]=insert[newToken];}}
return grammar;}
var ret={};for(var token in grammar){if(grammar.hasOwnProperty(token)){if(token==before){for(var newToken in insert){if(insert.hasOwnProperty(newToken)){ret[newToken]=insert[newToken];}}}
ret[token]=grammar[token];}}
_.languages.DFS(_.languages,function(key,value){if(value===root[inside]&&key!=inside){this[key]=ret;}});return root[inside]=ret;},DFS:function(o,callback,type,visited){visited=visited||{};for(var i in o){if(o.hasOwnProperty(i)){callback.call(o,i,o[i],type||i);if(_.util.type(o[i])==='Object'&&!visited[_.util.objId(o[i])]){visited[_.util.objId(o[i])]=true;_.languages.DFS(o[i],callback,null,visited);}
else if(_.util.type(o[i])==='Array'&&!visited[_.util.objId(o[i])]){visited[_.util.objId(o[i])]=true;_.languages.DFS(o[i],callback,i,visited);}}}}},plugins:{},highlightAll:function(async,callback){var env={callback:callback,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};_.hooks.run("before-highlightall",env);var elements=env.elements||document.querySelectorAll(env.selector);for(var i=0,element;element=elements[i++];){_.highlightElement(element,async===true,env.callback);}},highlightElement:function(element,async,callback){var language,grammar,parent=element;while(parent&&!lang.test(parent.className)){parent=parent.parentNode;}
if(parent){language=(parent.className.match(lang)||[,''])[1].toLowerCase();grammar=_.languages[language];}
element.className=element.className.replace(lang,'').replace(/\s+/g,' ')+' language-'+language;parent=element.parentNode;if(/pre/i.test(parent.nodeName)){parent.className=parent.className.replace(lang,'').replace(/\s+/g,' ')+' language-'+language;}
var code=element.textContent;var env={element:element,language:language,grammar:grammar,code:code};_.hooks.run('before-sanity-check',env);if(!env.code||!env.grammar){_.hooks.run('complete',env);return;}
_.hooks.run('before-highlight',env);if(async&&_self.Worker){var worker=new Worker(_.filename);worker.onmessage=function(evt){env.highlightedCode=evt.data;_.hooks.run('before-insert',env);env.element.innerHTML=env.highlightedCode;callback&&callback.call(env.element);_.hooks.run('after-highlight',env);_.hooks.run('complete',env);};worker.postMessage(JSON.stringify({language:env.language,code:env.code,immediateClose:true}));}
else{env.highlightedCode=_.highlight(env.code,env.grammar,env.language);_.hooks.run('before-insert',env);env.element.innerHTML=env.highlightedCode;callback&&callback.call(element);_.hooks.run('after-highlight',env);_.hooks.run('complete',env);}},highlight:function(text,grammar,language){var tokens=_.tokenize(text,grammar);return Token.stringify(_.util.encode(tokens),language);},tokenize:function(text,grammar,language){var Token=_.Token;var strarr=[text];var rest=grammar.rest;if(rest){for(var token in rest){grammar[token]=rest[token];}
delete grammar.rest;}
tokenloop:for(var token in grammar){if(!grammar.hasOwnProperty(token)||!grammar[token]){continue;}
var patterns=grammar[token];patterns=(_.util.type(patterns)==="Array")?patterns:[patterns];for(var j=0;j<patterns.length;++j){var pattern=patterns[j],inside=pattern.inside,lookbehind=!!pattern.lookbehind,greedy=!!pattern.greedy,lookbehindLength=0,alias=pattern.alias;if(greedy&&!pattern.pattern.global){var flags=pattern.pattern.toString().match(/[imuy]*$/)[0];pattern.pattern=RegExp(pattern.pattern.source,flags+"g");}
pattern=pattern.pattern||pattern;for(var i=0,pos=0;i<strarr.length;pos+=strarr[i].length,++i){var str=strarr[i];if(strarr.length>text.length){break tokenloop;}
if(str instanceof Token){continue;}
pattern.lastIndex=0;var match=pattern.exec(str),delNum=1;if(!match&&greedy&&i!=strarr.length-1){pattern.lastIndex=pos;match=pattern.exec(text);if(!match){break;}
var from=match.index+(lookbehind?match[1].length:0),to=match.index+match[0].length,k=i,p=pos;for(var len=strarr.length;k<len&&p<to;++k){p+=strarr[k].length;if(from>=p){++i;pos=p;}}
if(strarr[i]instanceof Token||strarr[k-1].greedy){continue;}
delNum=k-i;str=text.slice(pos,p);match.index-=pos;}
if(!match){continue;}
if(lookbehind){lookbehindLength=match[1].length;}
var from=match.index+lookbehindLength,match=match[0].slice(lookbehindLength),to=from+match.length,before=str.slice(0,from),after=str.slice(to);var args=[i,delNum];if(before){args.push(before);}
var wrapped=new Token(token,inside?_.tokenize(match,inside):match,alias,match,greedy);args.push(wrapped);if(after){args.push(after);}
Array.prototype.splice.apply(strarr,args);}}}
return strarr;},hooks:{all:{},add:function(name,callback){var hooks=_.hooks.all;hooks[name]=hooks[name]||[];hooks[name].push(callback);},run:function(name,env){var callbacks=_.hooks.all[name];if(!callbacks||!callbacks.length){return;}
for(var i=0,callback;callback=callbacks[i++];){callback(env);}}}};var Token=_.Token=function(type,content,alias,matchedStr,greedy){this.type=type;this.content=content;this.alias=alias;this.length=(matchedStr||"").length|0;this.greedy=!!greedy;};Token.stringify=function(o,language,parent){if(typeof o=='string'){return o;}
if(_.util.type(o)==='Array'){return o.map(function(element){return Token.stringify(element,language,o);}).join('');}
var env={type:o.type,content:Token.stringify(o.content,language,parent),tag:'span',classes:['token',o.type],attributes:{},language:language,parent:parent};if(env.type=='comment'){env.attributes['spellcheck']='true';}
if(o.alias){var aliases=_.util.type(o.alias)==='Array'?o.alias:[o.alias];Array.prototype.push.apply(env.classes,aliases);}
_.hooks.run('wrap',env);var attributes='';for(var name in env.attributes){attributes+=(attributes?' ':'')+name+'="'+(env.attributes[name]||'')+'"';}
return'<'+env.tag+' class="'+env.classes.join(' ')+'"'+(attributes?' '+attributes:'')+'>'+env.content+'</'+env.tag+'>';};if(!_self.document){if(!_self.addEventListener){return _self.Prism;}
_self.addEventListener('message',function(evt){var message=JSON.parse(evt.data),lang=message.language,code=message.code,immediateClose=message.immediateClose;_self.postMessage(_.highlight(code,_.languages[lang],lang));if(immediateClose){_self.close();}},false);return _self.Prism;}
var script=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();if(script){_.filename=script.src;if(document.addEventListener&&!script.hasAttribute('data-manual')){if(document.readyState!=="loading"){if(window.requestAnimationFrame){window.requestAnimationFrame(_.highlightAll);}else{window.setTimeout(_.highlightAll,16);}}
else{document.addEventListener('DOMContentLoaded',_.highlightAll);}}}
return _self.Prism;})();if(typeof module!=='undefined'&&module.exports){module.exports=Prism;}
if(typeof global!=='undefined'){global.Prism=Prism;}Prism.languages.markup={'comment':/<!--[\w\W]*?-->/,'prolog':/<\?[\w\W]+?\?>/,'doctype':/<!DOCTYPE[\w\W]+?>/i,'cdata':/<!\[CDATA\[[\w\W]*?]]>/i,'tag':{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{'tag':{pattern:/^<\/?[^\s>\/]+/i,inside:{'punctuation':/^<\/?/,'namespace':/^[^\s>\/:]+:/}},'attr-value':{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{'punctuation':/[=>"']/}},'punctuation':/\/?>/,'attr-name':{pattern:/[^\s>\/]+/,inside:{'namespace':/^[^\s>\/:]+:/}}}},'entity':/&#?[\da-z]{1,8};/i};Prism.hooks.add('wrap',function(env){if(env.type==='entity'){env.attributes['title']=env.content.replace(/&amp;/,'&');}});Prism.languages.xml=Prism.languages.markup;Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.clike={'comment':[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:true},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:true}],'string':{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:true},'class-name':{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:true,inside:{punctuation:/(\.|\\)/}},'keyword':/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,'boolean':/\b(true|false)\b/,'function':/[a-z0-9_]+(?=\()/i,'number':/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,'operator':/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,'punctuation':/[{}[\];(),.:]/};Prism.languages.javascript=Prism.languages.extend('clike',{'keyword':/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,'number':/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,'function':/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,'operator':/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/});Prism.languages.insertBefore('javascript','keyword',{'regex':{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:true,greedy:true}});Prism.languages.insertBefore('javascript','string',{'template-string':{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:true,inside:{'interpolation':{pattern:/\$\{[^}]+\}/,inside:{'interpolation-punctuation':{pattern:/^\$\{|\}$/,alias:'punctuation'},rest:Prism.languages.javascript}},'string':/[\s\S]+/}}});if(Prism.languages.markup){Prism.languages.insertBefore('markup','tag',{'script':{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:true,inside:Prism.languages.javascript,alias:'language-javascript'}});}
Prism.languages.js=Prism.languages.javascript;
/* jshint -W018 */
/* jshint -W030 */
/* jshint -W041 */
/* jshint boss: false */
/* jshint elision: false */
/* jshint forin: true */
/* jshint shadow: false */
/* jshint sub: false */
/* jslint bitwise: false */
