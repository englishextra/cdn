/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// todo - make generation of buttons bundle via node js for each theme
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(10);

	var shareLinks = __webpack_require__(2).shareLinks;
	var shareHandlers = __webpack_require__(3).shareHandlers;
	var Sharer = __webpack_require__(4).Sharer;
	var shareBox = __webpack_require__(5).ShareBox;

	Sharer.prototype.shareLinks = shareLinks;
	Sharer.prototype.shareHandlers = shareHandlers;
	Sharer.prototype.shareBox = shareBox;

	pluso.shareLink = Sharer.prototype.shareLink;


	pluso.registerModule('sharer', Sharer);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Share links for social Sharer
	 * @param {string} buttonId
	 * @description url to open window
	 */
	shareLinks = {
	    facebook: {
	        link: 'http://www.facebook.com/sharer.php?src=pluso&u=%url%&t=%title%',
	        title: 'Facebook',
	        js: false,

	        ref: /^(.+\.)?facebook\.com$/,
	        num: 1
	    },
	    twitter: {
	        link: 'https://twitter.com/intent/tweet?url=%url%&text=%title%',
	        title: 'Twitter',
	        js: false,

	        ref: /^(.+\.)?(twitter\.com|t\.co)$/,
	        num: 2
	    },
	    tumblr: {
	        link: 'http://www.tumblr.com/share?v=3&u=%url%&t=%title%&s=%selection%',
	        title: 'Tumblr',
	        js: false,
	        ref: /^(.+\.)?tumblr\.com$/,
	        num: 22
	    },
	    vkontakte: {
	        link: 'http://vk.com/share.php?url=%url%&title=%title%&description=%selection%&image=%img%',
	        title: 'ВКонтакте',
	        js: false,

	        ref: /^(.+\.)?(vk\.com|vkontakte\.ru)$/,
	        num: 3
	    },
	    odnoklassniki: {
	        link: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl=%url%',
	        title: 'Одноклассники',
	        js: false,

	        ref: /^(.+\.)?odnoklassniki\.ru$/,
	        num: 4
	    },
	    google: {
	        link: 'https://plus.google.com/share?url=%url%&hl=ru',
	        title: 'Google+',
	        js: false,

	        ref: /^plus\.google\.com$/,
	        num: 5
	    },
	    livejournal: {
	        link: 'http://www.livejournal.com/update.bml?subject=%title%&event=%3Ca+href%3D%22%url%%22%3E%title%%3C%2Fa%3E',
	        title: 'LiveJournal',
	        js: false,
	        bigwindow: true,
	        ref: /^(.+\.)?(livejournal\.com|livejournal\.ru)$/,
	        num: 6
	    },
	    moimir: {
	        link: 'http://connect.mail.ru/share?url=%url%&title=%title%&description=%selection%&imageurl=%img%',
	        title: 'Мой Мир@Mail.Ru',
	        js: false,

	        ref: /^my\.mail\.ru$/,
	        num: 7
	    },
	    pinterest: {
	        link: 'http://pinterest.com/pin/create/button/?url=%url%&media=%img%',
	        title: 'Pinterest',
	        js: true,
	        ref: /^(.+\.)?pinterest\.com$/,
	        num: 17
	    },
	    liveinternet: {
	        link: 'http://www.liveinternet.ru/journal_post.php?action=l_add&cnurl=%url%&cntitle=%title%',
	        title: 'LiveInternet',
	        js: false,
	        ref: /^(.+\.)?(liveinternet\.ru|li.ru)$/,
	        num: 8
	    },
	    springpad: {
	        link: 'http://springpad.com/clip.action?url=%url%&title=%title%',
	        title: 'Springpad',
	        js: false,
	        ref: /^(.+\.)?springpad\.com$/,
	        num: 19
	    },
	    stumbleupon: {
	        link: 'http://www.stumbleupon.com/submit?url=%url%&title=%title%',
	        title: 'StumbleUpon',
	        js: false,
	        bigwindow: true,
	        ref: /^(.+\.)?stumbleupon\.com$/,
	        num: 20
	    },
	    myspace: {
	        link: 'http://www.myspace.com/Modules/PostTo/Pages/default.aspx?u=%url%',
	        title: 'mySpace',
	        js: false,
	        ref: /^(.+\.)?myspace\.com$/,
	        num: 15
	    },
	    formspring: {
	        link: 'http://www.formspring.me/share?url=%url%&title=%title%',
	        title: 'Formspring.me',
	        js: false,
	        bigwindow: true,
	        ref: /^(.+\.)?formspring\.me$/,
	        num: 13
	    },
	    blogger: {
	        link: 'http://www.blogger.com/blog-this.g?t&u=%url%&n=%title%',
	        title: 'Blogger',
	        js: false,
	        ref: /^(.+\.)?(blogger\.com|blogspot\.com)$/,
	        num: 9
	    },
	    digg: {
	        link: 'http://digg.com/submit?partner=pluso&url=%url%&title=%title%&bodytext=%selection%',
	        title: 'Digg',
	        js: false,
	        ref: /^(.+\.)?digg\.com$/,
	        num: 11
	    },
	    surfingbird: {
	        link: 'http://surfingbird.ru/share?url=%url%&title=%title%',
	        title: 'Surfingbird',
	        js: false,
	        ref: /^(.+\.)?surfingbird\.ru$/,
	        num: 21
	    },
	    bobrdobr: {
	        link: 'http://bobrdobr.ru/addext.html?url=%url%&title=%title%&desc=%selection%',
	        title: 'БобрДобр',
	        js: false,
	        ref: /^(.+\.)?bobrdobr\.ru$/,
	        num: 24
	    },
	    readability: {
	        link: 'http://assets.pinterest.com/js/pinmarklet.js?url=%url%&title=%title%&desc=%selection%',
	        title: 'Readability',
	        js: true,
	        num: 18
	    },
	    instapaper: {
	        link: 'http://www.instapaper.com/edit?url=%url%&title=%title%&summary=%selection%',
	        title: 'Instapaper',
	        js: false,
	        ref: /^(.+\.)?instapaper\.com$/,
	        num: 14
	    },
	    evernote: {
	        link: 'http://www.evernote.com/clip.action?url=%url%&title=%title%&body=%3Ca+href%3D%22%url%%22%3E%title%%3C%2Fa%3E',
	        title: 'Evernote',
	        js: false,
	        ref: /^(.+\.)?evernote\.com$/,
	        num: 12
	    },
	    delicious: {
	        link: 'http://www.delicious.com/save?url=%url%&title=%title%&notes=%selection%&v=6&noui=1&jump=doclose',
	        title: 'Delicious',
	        js: false,
	        ref: /^(.+\.)?delicious\.com$/,
	        num: 10
	    },
	    vkrugu: {
	        link: 'http://vkrugudruzei.ru/x/button?url=%url%',
	        title: 'В Кругу Друзей',
	        js: false,
	        ref: /^(.+\.)?vkrugudruzei\.com$/,
	        num: 25
	    },
	    pinme: {
	        link: 'http://assets.pinterest.com/js/pinmarklet.js?url=%url%&title=%title%&body=%selection%',
	        title: 'Pinme',
	        js: false,
	        ref: /^(.+\.)?pinme\.ru$/,
	        num: 16
	    },
	    yandex: {
	        link: 'http://my.ya.ru/posts_share_link.xml?url=%url%&title=%title%&body=%selection%',
	        title: 'Я.ру',
	        js: false,
	        ref: /^my\.ya\.ru$/,
	        num: 23
	    },
	    yazakladki: {
	        link: "http://zakladki.yandex.ru/newlink.xml?url=%url%&name=%title%&descr=%selection%",
	        title: "Яндекс.Закладки",
	        js: false,
	        ref: /^(.+\.)?zakladki\.yandex\.ru$/,
	        num: 29
	    },
	    moikrug: {
	        link: "http://share.yandex.ru/go.xml?service=moikrug&url=%url%&title=%title%&description=%selection%",
	        title: "МойКруг",
	        js: false,
	        ref: /^(.+\.)?moikrug\.ru$/,
	        num: 30
	    },
	    googlebookmark: {
	        link: "http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=%url%&title=%title%&annotation=%selection%",
	        title: "Google закладки",
	        js: false,
	        ref: /^google\.com\/bookmarks\//,
	        num: 31
	    },
	    yahoo: {
	        link: "http://bookmarks.yahoo.com/toolbar/savebm?u=%url%&t=%title%&d=%selecton%",
	        title: "Yahoo закладки",
	        js: false,
	        ref: /^bookmarks\.yahoo\.com^/,
	        num: 32
	    },
	    moemesto: {
	        link: "http://moemesto.ru/post/?url=%url%&title=%title%",
	        title: "МоёМесто",
	        js: false,
	        ref: /^(.+\.)?moemesto\.ru$/,
	        num: 33
	    },
	    memori: {
	        link: "http://memori.ru/link/?sm=1&u_data[url]=%url%&u_data[name]=%title%",
	        title: "Memori.ru",
	        js: false,
	        ref: /^(.+\.)?memori\.ru$/,
	        num: 34
	    },
	    juick: {
	        link: "http://www.juick.com/post?body=%title% - %url%",
	        title: "Juick",
	        js: false,
	        ref: /^(.+\.)?juick\.com$/,
	        num: 35
	    },
	    linkedin: {
	        link: "http://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%",
	        title: "LinkedIn",
	        js: false,
	        ref: /^(.+\.)?(linkedin\.com|lnkd\.in)$/,
	        num: 36
	    },
	    webdiscover: {
	        link: "http://webdiscover.ru/share.php?url=%url%",
	        title: "WebDiscover",
	        js: false,
	        ref: /^(.+\.)?webdiscover\.ru$/,
	        num: 37
	    },
	    bookmark: {
	        link: '',
	        title: 'В закладки',
	        js: true,
	        num: 26
	    },
	    email: {
	        link: '',
	        title: 'Отправить на email',
	        js: false,

	        num: 27
	    },
	    print: {
	        link: '',
	        title: 'Печатать',
	        js: true,

	        num: 28
	    },
	    market: {
	        link: '',
	        title: 'Маркет',
	        js: true,
	        num: 38
	    },
	    webmoney: {
	        link: "http://events.webmoney.ru/sharer.aspx?url=%url%&image=%img%&title=%title%",
	        title: "Webmoney события",
	        js: false,
	        ref: /^(.+\.)?events.webmoney\.ru$/,
	        num: 39
	    },
	    misterwong: {
	        link: "http://www.mister-wong.ru/index.php?action=addurl&bm_url=%url%&bm_description=%title%",
	        title: 'Мистер Вонг',
	        js: false,
	        ref: /^(.+\.)?mister-wong\.ru$/,
	        num: 40
	    },
	    friendfeed: {
	        link: 'https://friendfeed.com/?url=%url%&title=%title%',
	        title: 'Friend Feed',
	        js: false,
	        ref: /^(.+\.)?friendfeed\.com$/,
	        num: 41
	    },
	    more: {
	        title: 'Все соцсети'
	    }
	    // current num 41

	};

	exports.shareLinks = shareLinks;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Handlers for social Sharer
	 * @param {string} buttonId
	 * @description handler to be called
	 */
	shareHandlers = {
	    // share function
	    'print': function() {
	        window.print()
	    },
	    'bookmark': function(params) {
	        if (typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function") {
	            window.sidebar.addPanel('title', params.url, "")
	        } else if (typeof window.external == "object" && !window.chrome) {
	            window.external.AddFavorite(params.url, params.title)
	        } else prompt("Скопируйте и добавьте эту ссылку в Закладки", params.url)
	    },
	    'email': function(params) {
	        var link = "mailto:?Subject=" + params.title + "&body=" + encodeURIComponent(params.url);
	        var tag = document.createElement('a');
	        tag.href = link;
	        tag.click();
	        // window.open(link, "mailto");
	        return false;
	    },
	    'more': function() {
	        pluso.modules.shareBox.show();
	    }
	}

	exports.shareHandlers = shareHandlers;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module Sharer
	 *
	 */
	function Sharer(container, config) {
	    /**
	     * default options for module
	     */
	    var defaults = {
	        buttons: 'vkontakte,odnoklassniki,facebook,twitter,google,moimir,email,print',
	        style: {
	            size: 'big',
	            shape: 'round',
	            theme: 'theme01',
	            css: 'background:transparent'
	        },
	        orientation: 'horizontal',
	        multiline: false,
	        redraw: true
	    };

	    var me = this,
	        $ = pluso.$,
	        _ = pluso._,
	        HTML = pluso.HTML;

	    /**
	     * config
	     */
	    this.config = pluso._.extend(defaults, config);

	    /**
	     * root element
	     */
	    this.rootNode = container.domNode;

	    /**
	     * share params -  url, title, description, image
	     */
	    this.params = container.params;

	    initButtons.call(this);

	    pluso.modules.shareBox = new this.shareBox(this);

	    function initButtons(buttonsStr) {
	        var template = '<div class="pluso-sharer {{css}} " style="{{style}}">' +
	            '{{each social}}<a data-id="{{this.id}}" class="{{this.cls}}" title="{{this.name}}" style="{{this.style}}"><span data-id="{{this.id}}" class="pluso-btns-hover"></span></a>{{/each}}' +
	            '</div>';

	        var css = ['', this.config.style.theme, this.config.style.shape, this.config.style.size, this.config.orientation, (this.config.multiline ? 'multiline' : 'line')].join(' pluso--');

	        var templateData = {
	            css: css,
	            style: this.config.style.css,
	            social: []
	        };

	        var buttonsIds = this.config.buttons.split(',');

	        _.map(buttonsIds, function(buttonId) {
	            var title = buttonId;
	            if (this.shareLinks[buttonId]) {
	                title = this.shareLinks[buttonId].title;
	            }
	            var socialButton = {
	                id: buttonId,
	                cls: 'pluso__' + buttonId + ' pluso_link ',
	                style: '',
	                name: title
	            }
	            templateData.social.push(socialButton);
	        }, me);

	        if (this.config.multiline && this.config.orientation === 'horizontal') {
	            var breakIndex = Math.floor(buttonsIds.length / 2);
	            templateData.social[breakIndex].style += 'clear:both;';
	            var nextLineButtons = templateData.social.slice(breakIndex);
	            _.map(nextLineButtons, function(button) {
	                button.cls += ' second-line';
	            });
	        }

	        if (!this.config.redraw) {
	            return;
	        };
	        var html = HTML(template, templateData);
	        $(me.rootNode).fill(html);
	        $(this.rootNode).on('click', _.bind(this.click, this));
	        this.rootNode.onmousedown = function() {
	            return false;
	        };
	    }
	};

	Sharer.prototype = {

	    version: '0.0.1',

	    /**
	     * click social buttons handler
	     */
	    click: function(event) {
	        var target = event.target = event.target || event.srcElement;
	        var id = pluso.$(target).get('@data-id');
	        if (!id) {
	            return;
	        }
	        this.shareLink(id);
	    },

	    /**
	     * share links by id
	     */
	    shareLink: function(id) {
	        var me = this;
	        var params = {
	            selection: this.params.description || getSelectionText(),
	            image: this.params.image || '',
	            title: this.params.title || document.title,
	            url: this.params.url || location.href
	        };

	        if (typeof me.shareHandlers[id] === 'function') {
	            me.shareHandlers[id].call(this, params);
	            return;
	        }

	        var shareLink = me.shareLinks[id];
	        var url = shareLink.link.replace('%url%', encodeURIComponent(params.url));
	        url = url.replace('%title%', encodeURIComponent(params.title));
	        url = url.replace('%selection%', encodeURIComponent(params.selection));
	        url = url.replace('%img%', encodeURIComponent(params.image));

	        if (!window.open(url, 'sharer', "toolbar=0,status=0,resizable=1,width=626,height=436")) {
	            window.location.href = url;
	        };
	        this.reportUrl(url);
	        return false;

	        function getSelectionText() {
	            var text = "";
	            if (window.getSelection) {
	                text = window.getSelection().toString();
	            } else if (document.selection && document.selection.type != "Control") {
	                text = document.selection.createRange().text;
	            }
	            return text;
	        }
	    },

	    /**
	     * report url to server
	     */
	    reportUrl: function(url) {
	        var logEl = new Image();
	        logEl.src = '/shared-link?url=' + encodeURI(url);
	    }


	}

	exports.Sharer = Sharer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module ShareBox
	 *
	 */
	function ShareBox(sharer) {
	    /**
	     * default options for module
	     */
	    var defaults = {
	        theme: '01'
	    };

	    var self = this,
	        $ = pluso.$,
	        _ = pluso._,
	        HTML = pluso.HTML;

	    this.sharer = sharer;

	    this.template =
	        '<div class="pluso-box-wrapper">' +
	        '<div class="pluso-box {{css}}">' +
	        '<div class="pluso-box__header">' +
	        '<div class="pluso-box__search">' +
	        '<input type="text" class="search-social">' +
	        '</div>' +
	        '<div class="pluso-box__close"></div>' +
	        '</div>' +
	        '<div class="pluso-box__content">' +
	        '{{each social}}<a data-id="{{this.id}}"><i data-id="{{this.id}}" class="{{this.cls}}" style="{{this.style}}"></i><span>{{this.name}}</span></a>{{/each}}' +
	        '</div>' +
	        '</div>' +
	        '</div>';

	    this.themeCss = ['', sharer.config.style.theme, sharer.config.style.shape, 'medium', 'horizontal', (sharer.config.multiline ? 'multiline' : 'line')].join(' pluso--');

	    var html = this.createButtons(shareLinks);
	    var dom = $('#pluso-share-box');
	    if (!dom.length){
	        var dom = pluso.EE('div', {
	            '@id': 'pluso-share-box',
	            '@style' : 'display:none'
	        });
	        $('body').add(dom);
	    } 
	    dom.fill(html);
	    this.dom = dom;
	    dom.on('click', _.bind(this.click, this));
	    $('.search-social').on('keyup', function(){
	        self.searchByName(this.get('value'));
	    });

	    function createButtons(shareLinks){
	          
	    }
	};

	ShareBox.prototype = {
	    show: function() {
	        pluso.$('.search-social').set('value', '');
	        pluso.$('a', this.dom).set('-hidden_button');
	        pluso.$(this.dom).show();
	        pluso.$('body').set('+pluso-box-open');

	    },
	    hide: function() {
	        pluso.$(this.dom).hide();
	        pluso.$('body').set('-pluso-box-open');

	    },
	    /* 
	    * creating buttons in box
	    */
	    createButtons: function(){
	        var _ = pluso._,
	            HTML = pluso.HTML;

	        var templateData = {
	            css: this.themeCss,
	            style: '',
	            social: []
	        };

	        _.eachObj(shareLinks, function(id, link) {
	            if (id === 'more') {
	                return;
	            }
	            var socialButton = {
	                id: id,
	                cls: 'pluso__' + id + ' pluso_link ',
	                style: '',
	                name: link.title
	            }
	            templateData.social.push(socialButton);
	        });

	        var html = HTML(this.template, templateData);
	        return html;     
	    },
	    /**
	     * click social buttons handler
	     */
	    click: function(event) {
	        //to do refactor >>
	        var elem = event.target || event.srcElement;
	        var isClose = elem.className === 'pluso-box__close' || elem.id === 'pluso-share-box' || elem.className === 'pluso-box-wrapper';
	        if (isClose) {
	            this.hide();
	            return;
	        }
	        if (elem.tagName === 'SPAN') {
	            elem = elem.parentNode.getElementsByTagName('i')[0];
	        }
	        if (elem.tagName === 'A') {
	            elem = elem.getElementsByTagName('i')[0];
	        }
	        var id = elem.getAttribute('data-id');
	        if (!id) {
	            return;
	        }
	        this.sharer.shareLink(id);
	        this.hide();
	    },
	    /* 
	    * search social net by name
	    */
	    searchByName: function(name){
	        pluso.$('a', this.dom).each(function(link) {
	            var $link = pluso.$(link);
	            var socialNet = this.sharer.shareLinks[$link.get('@data-id')];
	            var match = socialNet.title.match(new RegExp(name, "i"));
	            if (match) {
	                $link.set('-hidden_button');
	            } else{
	                $link.set('+hidden_button');
	            }
	        }, this);

	    }

	}

	exports.ShareBox = ShareBox;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(12)
		// The css code:
		(__webpack_require__(7))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/*  square corners */\n/* */\n\n.pluso--medium.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/01.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/02.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/03.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/04.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/05.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/06.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/07.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/08.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/09.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/10.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/11.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/12.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/13.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/14.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/30/15.png);\n}\n\n/* */\n\n.pluso--big.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/01.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/02.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/03.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/04.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/05.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/06.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/07.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/08.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/09.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/10.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/11.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/12.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/13.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/14.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/15.png);\n}\n/* */\n\n.pluso--small.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/01.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/02.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/03.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/04.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/05.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/06.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/07.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/08.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/09.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/10.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/11.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/12.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/13.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/14.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/20/15.png);\n}\n\n\n\n\n\n\n/*   */\n.pluso--medium.pluso--round.pluso--theme01 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/01.png);\n}\n.pluso--medium.pluso--round.pluso--theme02 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/02.png);\n}\n.pluso--medium.pluso--round.pluso--theme03 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/03.png);\n}\n.pluso--medium.pluso--round.pluso--theme04 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/04.png);\n}\n.pluso--medium.pluso--round.pluso--theme05 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/05.png);\n}\n.pluso--medium.pluso--round.pluso--theme06 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/06.png);\n}\n.pluso--medium.pluso--round.pluso--theme07 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/07.png);\n}\n.pluso--medium.pluso--round.pluso--theme08 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/08.png);\n}\n.pluso--medium.pluso--round.pluso--theme09 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/09.png);\n}\n.pluso--medium.pluso--round.pluso--theme10 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/10.png);\n}\n.pluso--medium.pluso--round.pluso--theme11 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/11.png);\n}\n.pluso--medium.pluso--round.pluso--theme12 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/12.png);\n}\n.pluso--medium.pluso--round.pluso--theme13 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/13.png);\n}\n.pluso--medium.pluso--round.pluso--theme14 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/14.png);\n}\n.pluso--medium.pluso--round.pluso--theme15 a[class^='pluso__'],\n.pluso--medium.pluso--round.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/30/15.png);\n}\n.pluso--medium.pluso--square.pluso--theme01 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/01.png);\n}\n.pluso--medium.pluso--square.pluso--theme02 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/02.png);\n}\n.pluso--medium.pluso--square.pluso--theme03 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/03.png);\n}\n.pluso--medium.pluso--square.pluso--theme04 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/04.png);\n}\n.pluso--medium.pluso--square.pluso--theme05 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/05.png);\n}\n.pluso--medium.pluso--square.pluso--theme06 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/06.png);\n}\n.pluso--medium.pluso--square.pluso--theme07 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/07.png);\n}\n.pluso--medium.pluso--square.pluso--theme08 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/08.png);\n}\n.pluso--medium.pluso--square.pluso--theme09 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/09.png);\n}\n.pluso--medium.pluso--square.pluso--theme10 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/10.png);\n}\n.pluso--medium.pluso--square.pluso--theme11 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/11.png);\n}\n.pluso--medium.pluso--square.pluso--theme12 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/12.png);\n}\n.pluso--medium.pluso--square.pluso--theme13 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/13.png);\n}\n.pluso--medium.pluso--square.pluso--theme14 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/14.png);\n}\n.pluso--medium.pluso--square.pluso--theme15 a[class^='pluso__'],\n.pluso--medium.pluso--square.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/30/15.png);\n}\n\n/*   */\n.pluso--big.pluso--round.pluso--theme01 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/01.png);\n}\n.pluso--big.pluso--round.pluso--theme02 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/02.png);\n}\n.pluso--big.pluso--round.pluso--theme03 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/03.png);\n}\n.pluso--big.pluso--round.pluso--theme04 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/04.png);\n}\n.pluso--big.pluso--round.pluso--theme05 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/05.png);\n}\n.pluso--big.pluso--round.pluso--theme06 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/06.png);\n}\n.pluso--big.pluso--round.pluso--theme07 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/07.png);\n}\n.pluso--big.pluso--round.pluso--theme08 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/08.png);\n}\n.pluso--big.pluso--round.pluso--theme09 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/09.png);\n}\n.pluso--big.pluso--round.pluso--theme10 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/10.png);\n}\n.pluso--big.pluso--round.pluso--theme11 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/11.png);\n}\n.pluso--big.pluso--round.pluso--theme12 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/12.png);\n}\n.pluso--big.pluso--round.pluso--theme13 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/13.png);\n}\n.pluso--big.pluso--round.pluso--theme14 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/14.png);\n}\n.pluso--big.pluso--round.pluso--theme15 a[class^='pluso__'],\n.pluso--big.pluso--round.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/40/15.png);\n}\n.pluso--big.pluso--square.pluso--theme01 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/01.png);\n}\n.pluso--big.pluso--square.pluso--theme02 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/02.png);\n}\n.pluso--big.pluso--square.pluso--theme03 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/03.png);\n}\n.pluso--big.pluso--square.pluso--theme04 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/04.png);\n}\n.pluso--big.pluso--square.pluso--theme05 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/05.png);\n}\n.pluso--big.pluso--square.pluso--theme06 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/06.png);\n}\n.pluso--big.pluso--square.pluso--theme07 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/07.png);\n}\n.pluso--big.pluso--square.pluso--theme08 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/08.png);\n}\n.pluso--big.pluso--square.pluso--theme09 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/09.png);\n}\n.pluso--big.pluso--square.pluso--theme10 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/10.png);\n}\n.pluso--big.pluso--square.pluso--theme11 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/11.png);\n}\n.pluso--big.pluso--square.pluso--theme12 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/12.png);\n}\n.pluso--big.pluso--square.pluso--theme13 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/13.png);\n}\n.pluso--big.pluso--square.pluso--theme14 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/14.png);\n}\n.pluso--big.pluso--square.pluso--theme15 a[class^='pluso__'],\n.pluso--big.pluso--square.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/40/15.png);\n}\n\n\n.pluso--small.pluso--round.pluso--theme01 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/01.png);\n}\n.pluso--small.pluso--round.pluso--theme02 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/02.png);\n}\n.pluso--small.pluso--round.pluso--theme03 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/03.png);\n}\n.pluso--small.pluso--round.pluso--theme04 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/04.png);\n}\n.pluso--small.pluso--round.pluso--theme05 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/05.png);\n}\n.pluso--small.pluso--round.pluso--theme06 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/06.png);\n}\n.pluso--small.pluso--round.pluso--theme07 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/07.png);\n}\n.pluso--small.pluso--round.pluso--theme08 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/08.png);\n}\n.pluso--small.pluso--round.pluso--theme09 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/09.png);\n}\n.pluso--small.pluso--round.pluso--theme10 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/10.png);\n}\n.pluso--small.pluso--round.pluso--theme11 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/11.png);\n}\n.pluso--small.pluso--round.pluso--theme12 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/12.png);\n}\n.pluso--small.pluso--round.pluso--theme13 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/13.png);\n}\n.pluso--small.pluso--round.pluso--theme14 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/14.png);\n}\n.pluso--small.pluso--round.pluso--theme15 a[class^='pluso__'],\n.pluso--small.pluso--round.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/round/20/15.png);\n}\n.pluso--small.pluso--square.pluso--theme01 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/01.png);\n}\n.pluso--small.pluso--square.pluso--theme02 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/02.png);\n}\n.pluso--small.pluso--square.pluso--theme03 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/03.png);\n}\n.pluso--small.pluso--square.pluso--theme04 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/04.png);\n}\n.pluso--small.pluso--square.pluso--theme05 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/05.png);\n}\n.pluso--small.pluso--square.pluso--theme06 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/06.png);\n}\n.pluso--small.pluso--square.pluso--theme07 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/07.png);\n}\n.pluso--small.pluso--square.pluso--theme08 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/08.png);\n}\n.pluso--small.pluso--square.pluso--theme09 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/09.png);\n}\n.pluso--small.pluso--square.pluso--theme10 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/10.png);\n}\n.pluso--small.pluso--square.pluso--theme11 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/11.png);\n}\n.pluso--small.pluso--square.pluso--theme12 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/12.png);\n}\n.pluso--small.pluso--square.pluso--theme13 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/13.png);\n}\n.pluso--small.pluso--square.pluso--theme14 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/14.png);\n}\n.pluso--small.pluso--square.pluso--theme15 a[class^='pluso__'],\n.pluso--small.pluso--square.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square/20/15.png);\n}\n\n\n/*  positions */\n.pluso--small .pluso__facebook {\n  background-position: 0 0;\n}\n.pluso--small .pluso__twitter {\n  background-position: -21px 0;\n}\n.pluso--small .pluso__tumblr {\n  background-position: -42px 0;\n}\n.pluso--small .pluso__odnoklassniki {\n  background-position: -63px 0;\n}\n.pluso--small .pluso__vkontakte {\n  background-position: -84px 0;\n}\n.pluso--small .pluso__pinterest {\n  background-position: -105px 0;\n}\n.pluso--small .pluso__google {\n  background-position: -126px 0;\n}\n.pluso--small .pluso__moimir {\n  background-position: -147px 0;\n}\n.pluso--small .pluso__livejournal {\n  background-position: -168px 0;\n}\n.pluso--small .pluso__liveinternet {\n  background-position: -189px 0;\n}\n.pluso--small .pluso__springpad {\n  background-position: -210px 0;\n}\n.pluso--small .pluso__stumbleupon {\n  background-position: -231px 0;\n}\n.pluso--small .pluso__myspace {\n  background-position: -252px 0;\n}\n.pluso--small .pluso__formspring {\n  background-position: -273px 0;\n}\n.pluso--small .pluso__blogger {\n  background-position: -294px 0;\n}\n.pluso--small .pluso__digg {\n  background-position: -315px 0;\n}\n.pluso--small .pluso__surfingbird {\n  background-position: -336px 0;\n}\n.pluso--small .pluso__bobrdobr {\n  background-position: -357px 0;\n}\n.pluso--small .pluso__readability {\n  background-position: -378px 0;\n}\n.pluso--small .pluso__instapaper {\n  background-position: -399px 0;\n}\n.pluso--small .pluso__evernote {\n  background-position: -420px 0;\n}\n.pluso--small .pluso__bookmarks {\n  background-position: -441px 0;\n}\n.pluso--small .pluso__email {\n  background-position: -462px 0;\n}\n.pluso--small .pluso__print {\n  background-position: -483px 0;\n}\n.pluso--small .pluso__vkrugu {\n  background-position: -504px 0;\n}\n.pluso--small .pluso__delicious {\n  background-position: -525px 0;\n}\n.pluso--small .pluso__pinme {\n  background-position: -546px 0;\n}\n.pluso--small .pluso__yandex {\n  background-position: -567px 0;\n}\n.pluso--small .pluso__yazakladki {\n  background-position: -588px 0;\n}\n.pluso--small .pluso__moikrug {\n  background-position: -609px 0;\n}\n.pluso--small .pluso__googlebookmark {\n  background-position: -630px 0;\n}\n.pluso--small .pluso__yahoo {\n  background-position: -651px 0;\n}\n.pluso--small .pluso__moemesto {\n  background-position: -672px 0;\n}\n.pluso--small .pluso__memori {\n  background-position: -693px 0;\n}\n.pluso--small .pluso__diary {\n  background-position: -714px 0;\n}\n.pluso--small .pluso__juick {\n  background-position: -735px 0;\n}\n.pluso--small .pluso__linkedin {\n  background-position: -756px 0;\n}\n.pluso--small .pluso__itutby {\n  background-position: -777px 0;\n}\n.pluso--small .pluso__webdiscover {\n  background-position: -798px 0;\n}\n.pluso--small .pluso__pikabu {\n  background-position: -819px 0;\n}\n.pluso--small .pluso__reddit {\n  background-position: -840px 0;\n}\n.pluso--small .pluso__dudu {\n  background-position: -861px 0;\n}\n.pluso--small .pluso__friendfeed {\n  background-position: -882px 0;\n}\n.pluso--small .pluso__misterwong {\n  background-position: -903px 0;\n}\n.pluso--small .pluso__webmoney {\n  background-position: -924px 0;\n}\n.pluso--small .pluso__more {\n  background-position: -945px 0;\n}\n.pluso--medium .pluso__facebook {\n  background-position: 0 0;\n}\n.pluso--medium .pluso__twitter {\n  background-position: -31px 0;\n}\n.pluso--medium .pluso__tumblr {\n  background-position: -62px 0;\n}\n.pluso--medium .pluso__odnoklassniki {\n  background-position: -93px 0;\n}\n.pluso--medium .pluso__vkontakte {\n  background-position: -124px 0;\n}\n.pluso--medium .pluso__pinterest {\n  background-position: -155px 0;\n}\n.pluso--medium .pluso__google {\n  background-position: -186px 0;\n}\n.pluso--medium .pluso__moimir {\n  background-position: -217px 0;\n}\n.pluso--medium .pluso__livejournal {\n  background-position: -248px 0;\n}\n.pluso--medium .pluso__liveinternet {\n  background-position: -279px 0;\n}\n.pluso--medium .pluso__springpad {\n  background-position: -310px 0;\n}\n.pluso--medium .pluso__stumbleupon {\n  background-position: -341px 0;\n}\n.pluso--medium .pluso__myspace {\n  background-position: -372px 0;\n}\n.pluso--medium .pluso__formspring {\n  background-position: -403px 0;\n}\n.pluso--medium .pluso__blogger {\n  background-position: -434px 0;\n}\n.pluso--medium .pluso__digg {\n  background-position: -465px 0;\n}\n.pluso--medium .pluso__surfingbird {\n  background-position: -496px 0;\n}\n.pluso--medium .pluso__bobrdobr {\n  background-position: -527px 0;\n}\n.pluso--medium .pluso__readability {\n  background-position: -558px 0;\n}\n.pluso--medium .pluso__instapaper {\n  background-position: -589px 0;\n}\n.pluso--medium .pluso__evernote {\n  background-position: -620px 0;\n}\n.pluso--medium .pluso__bookmarks {\n  background-position: -651px 0;\n}\n.pluso--medium .pluso__email {\n  background-position: -682px 0;\n}\n.pluso--medium .pluso__print {\n  background-position: -713px 0;\n}\n.pluso--medium .pluso__vkrugu {\n  background-position: -744px 0;\n}\n.pluso--medium .pluso__delicious {\n  background-position: -775px 0;\n}\n.pluso--medium .pluso__pinme {\n  background-position: -806px 0;\n}\n.pluso--medium .pluso__yandex {\n  background-position: -837px 0;\n}\n.pluso--medium .pluso__yazakladki {\n  background-position: -868px 0;\n}\n.pluso--medium .pluso__moikrug {\n  background-position: -899px 0;\n}\n.pluso--medium .pluso__googlebookmark {\n  background-position: -930px 0;\n}\n.pluso--medium .pluso__yahoo {\n  background-position: -961px 0;\n}\n.pluso--medium .pluso__moemesto {\n  background-position: -992px 0;\n}\n.pluso--medium .pluso__memori {\n  background-position: -1023px 0;\n}\n.pluso--medium .pluso__diary {\n  background-position: -1054px 0;\n}\n.pluso--medium .pluso__juick {\n  background-position: -1085px 0;\n}\n.pluso--medium .pluso__linkedin {\n  background-position: -1116px 0;\n}\n.pluso--medium .pluso__itutby {\n  background-position: -1147px 0;\n}\n.pluso--medium .pluso__webdiscover {\n  background-position: -1178px 0;\n}\n.pluso--medium .pluso__pikabu {\n  background-position: -1209px 0;\n}\n.pluso--medium .pluso__reddit {\n  background-position: -1240px 0;\n}\n.pluso--medium .pluso__dudu {\n  background-position: -1271px 0;\n}\n.pluso--medium .pluso__friendfeed {\n  background-position: -1302px 0;\n}\n.pluso--medium .pluso__misterwong {\n  background-position: -1333px 0;\n}\n.pluso--medium .pluso__webmoney {\n  background-position: -1364px 0;\n}\n.pluso--medium .pluso__more {\n  background-position: -1395px 0;\n}\n.pluso--big .pluso__facebook {\n  background-position: 0 0;\n}\n.pluso--big .pluso__twitter {\n  background-position: -42px 0;\n}\n.pluso--big .pluso__tumblr {\n  background-position: -84px 0;\n}\n.pluso--big .pluso__odnoklassniki {\n  background-position: -126px 0;\n}\n.pluso--big .pluso__vkontakte {\n  background-position: -168px 0;\n}\n.pluso--big .pluso__pinterest {\n  background-position: -210px 0;\n}\n.pluso--big .pluso__google {\n  background-position: -252px 0;\n}\n.pluso--big .pluso__moimir {\n  background-position: -294px 0;\n}\n.pluso--big .pluso__livejournal {\n  background-position: -336px 0;\n}\n.pluso--big .pluso__liveinternet {\n  background-position: -378px 0;\n}\n.pluso--big .pluso__springpad {\n  background-position: -420px 0;\n}\n.pluso--big .pluso__stumbleupon {\n  background-position: -462px 0;\n}\n.pluso--big .pluso__myspace {\n  background-position: -504px 0;\n}\n.pluso--big .pluso__formspring {\n  background-position: -546px 0;\n}\n.pluso--big .pluso__blogger {\n  background-position: -588px 0;\n}\n.pluso--big .pluso__digg {\n  background-position: -630px 0;\n}\n.pluso--big .pluso__surfingbird {\n  background-position: -672px 0;\n}\n.pluso--big .pluso__bobrdobr {\n  background-position: -714px 0;\n}\n.pluso--big .pluso__readability {\n  background-position: -756px 0;\n}\n.pluso--big .pluso__instapaper {\n  background-position: -798px 0;\n}\n.pluso--big .pluso__evernote {\n  background-position: -840px 0;\n}\n.pluso--big .pluso__bookmarks {\n  background-position: -882px 0;\n}\n.pluso--big .pluso__email {\n  background-position: -924px 0;\n}\n.pluso--big .pluso__print {\n  background-position: -966px 0;\n}\n.pluso--big .pluso__vkrugu {\n  background-position: -1008px 0;\n}\n.pluso--big .pluso__delicious {\n  background-position: -1050px 0;\n}\n.pluso--big .pluso__pinme {\n  background-position: -1092px 0;\n}\n.pluso--big .pluso__yandex {\n  background-position: -1134px 0;\n}\n.pluso--big .pluso__yazakladki {\n  background-position: -1176px 0;\n}\n.pluso--big .pluso__moikrug {\n  background-position: -1218px 0;\n}\n.pluso--big .pluso__googlebookmark {\n  background-position: -1260px 0;\n}\n.pluso--big .pluso__yahoo {\n  background-position: -1302px 0;\n}\n.pluso--big .pluso__moemesto {\n  background-position: -1344px 0;\n}\n.pluso--big .pluso__memori {\n  background-position: -1386px 0;\n}\n.pluso--big .pluso__diary {\n  background-position: -1428px 0;\n}\n.pluso--big .pluso__juick {\n  background-position: -1470px 0;\n}\n.pluso--big .pluso__linkedin {\n  background-position: -1512px 0;\n}\n.pluso--big .pluso__itutby {\n  background-position: -1554px 0;\n}\n.pluso--big .pluso__webdiscover {\n  background-position: -1596px 0;\n}\n.pluso--big .pluso__pikabu {\n  background-position: -1638px 0;\n}\n.pluso--big .pluso__reddit {\n  background-position: -1680px 0;\n}\n.pluso--big .pluso__dudu {\n  background-position: -1722px 0;\n}\n.pluso--big .pluso__friendfeed {\n  background-position: -1764px 0;\n}\n.pluso--big .pluso__misterwong {\n  background-position: -1806px 0;\n}\n.pluso--big .pluso__webmoney {\n  background-position: -1848px 0;\n}\n.pluso--big .pluso__more {\n  background-position: -1890px 0;\n}\n\n/*  retina buttons */\n@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n  .pluso--small {\n    /* ########## SQUARE ########## */\n  }\n  .pluso--small a,\n  .pluso--small i {\n    background-size: 965px 20px;\n  }\n  .pluso--small.pluso--round.pluso--theme01 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/01.png);\n  }\n  .pluso--small.pluso--round.pluso--theme02 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/02.png);\n  }\n  .pluso--small.pluso--round.pluso--theme03 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/03.png);\n  }\n  .pluso--small.pluso--round.pluso--theme04 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/04.png);\n  }\n  .pluso--small.pluso--round.pluso--theme05 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/05.png);\n  }\n  .pluso--small.pluso--round.pluso--theme06 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/06.png);\n  }\n  .pluso--small.pluso--round.pluso--theme07 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/07.png);\n  }\n  .pluso--small.pluso--round.pluso--theme08 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/08.png);\n  }\n  .pluso--small.pluso--round.pluso--theme09 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/09.png);\n  }\n  .pluso--small.pluso--round.pluso--theme10 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/10.png);\n  }\n  .pluso--small.pluso--round.pluso--theme11 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/11.png);\n  }\n  .pluso--small.pluso--round.pluso--theme12 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/12.png);\n  }\n  .pluso--small.pluso--round.pluso--theme13 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/13.png);\n  }\n  .pluso--small.pluso--round.pluso--theme14 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/14.png);\n  }\n  .pluso--small.pluso--round.pluso--theme15 a[class^='pluso__'],\n  .pluso--small.pluso--round.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/40/15.png);\n  }\n  .pluso--small.pluso--square.pluso--theme01 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/01.png);\n  }\n  .pluso--small.pluso--square.pluso--theme02 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/02.png);\n  }\n  .pluso--small.pluso--square.pluso--theme03 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/03.png);\n  }\n  .pluso--small.pluso--square.pluso--theme04 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/04.png);\n  }\n  .pluso--small.pluso--square.pluso--theme05 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/05.png);\n  }\n  .pluso--small.pluso--square.pluso--theme06 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/06.png);\n  }\n  .pluso--small.pluso--square.pluso--theme07 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/07.png);\n  }\n  .pluso--small.pluso--square.pluso--theme08 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/08.png);\n  }\n  .pluso--small.pluso--square.pluso--theme09 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/09.png);\n  }\n  .pluso--small.pluso--square.pluso--theme10 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/10.png);\n  }\n  .pluso--small.pluso--square.pluso--theme11 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/11.png);\n  }\n  .pluso--small.pluso--square.pluso--theme12 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/12.png);\n  }\n  .pluso--small.pluso--square.pluso--theme13 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/13.png);\n  }\n  .pluso--small.pluso--square.pluso--theme14 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/14.png);\n  }\n  .pluso--small.pluso--square.pluso--theme15 a[class^='pluso__'],\n  .pluso--small.pluso--square.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/40/15.png);\n  }\n  .pluso--medium {\n    /* ########## SQUARE ########## */\n  }\n  .pluso--medium a,\n  .pluso--medium i {\n    background-size: 1448px 30px;\n  }\n  .pluso--medium.pluso--round.pluso--theme01 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/01.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme02 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/02.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme03 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/03.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme04 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/04.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme05 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/05.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme06 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/06.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme07 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/07.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme08 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/08.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme09 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/09.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme10 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/10.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme11 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/11.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme12 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/12.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme13 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/13.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme14 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/14.png);\n  }\n  .pluso--medium.pluso--round.pluso--theme15 a[class^='pluso__'],\n  .pluso--medium.pluso--round.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/60/15.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme01 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/01.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme02 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/02.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme03 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/03.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme04 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/04.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme05 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/05.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme06 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/06.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme07 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/07.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme08 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/08.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme09 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/09.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme10 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/10.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme11 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/11.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme12 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/12.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme13 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/13.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme14 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/14.png);\n  }\n  .pluso--medium.pluso--square.pluso--theme15 a[class^='pluso__'],\n  .pluso--medium.pluso--square.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/60/15.png);\n  }\n  .pluso--big {\n    /* ########## SQUARE ########## */\n  }\n  .pluso--big a,\n  .pluso--big i {\n    background-size: 1930px 40px;\n  }\n  .pluso--big.pluso--round.pluso--theme01 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/01.png);\n  }\n  .pluso--big.pluso--round.pluso--theme02 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/02.png);\n  }\n  .pluso--big.pluso--round.pluso--theme03 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/03.png);\n  }\n  .pluso--big.pluso--round.pluso--theme04 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/04.png);\n  }\n  .pluso--big.pluso--round.pluso--theme05 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/05.png);\n  }\n  .pluso--big.pluso--round.pluso--theme06 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/06.png);\n  }\n  .pluso--big.pluso--round.pluso--theme07 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/07.png);\n  }\n  .pluso--big.pluso--round.pluso--theme08 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/08.png);\n  }\n  .pluso--big.pluso--round.pluso--theme09 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/09.png);\n  }\n  .pluso--big.pluso--round.pluso--theme10 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/10.png);\n  }\n  .pluso--big.pluso--round.pluso--theme11 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/11.png);\n  }\n  .pluso--big.pluso--round.pluso--theme12 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/12.png);\n  }\n  .pluso--big.pluso--round.pluso--theme13 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/13.png);\n  }\n  .pluso--big.pluso--round.pluso--theme14 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/14.png);\n  }\n  .pluso--big.pluso--round.pluso--theme15 a[class^='pluso__'],\n  .pluso--big.pluso--round.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/round/80/15.png);\n  }\n  .pluso--big.pluso--square.pluso--theme01 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme01 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/01.png);\n  }\n  .pluso--big.pluso--square.pluso--theme02 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme02 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/02.png);\n  }\n  .pluso--big.pluso--square.pluso--theme03 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme03 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/03.png);\n  }\n  .pluso--big.pluso--square.pluso--theme04 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme04 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/04.png);\n  }\n  .pluso--big.pluso--square.pluso--theme05 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme05 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/05.png);\n  }\n  .pluso--big.pluso--square.pluso--theme06 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme06 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/06.png);\n  }\n  .pluso--big.pluso--square.pluso--theme07 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme07 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/07.png);\n  }\n  .pluso--big.pluso--square.pluso--theme08 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme08 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/08.png);\n  }\n  .pluso--big.pluso--square.pluso--theme09 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme09 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/09.png);\n  }\n  .pluso--big.pluso--square.pluso--theme10 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme10 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/10.png);\n  }\n  .pluso--big.pluso--square.pluso--theme11 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme11 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/11.png);\n  }\n  .pluso--big.pluso--square.pluso--theme12 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme12 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/12.png);\n  }\n  .pluso--big.pluso--square.pluso--theme13 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme13 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/13.png);\n  }\n  .pluso--big.pluso--square.pluso--theme14 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme14 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/14.png);\n  }\n  .pluso--big.pluso--square.pluso--theme15 a[class^='pluso__'],\n  .pluso--big.pluso--square.pluso--theme15 i {\n    background-image: url(http://x.pluso.ru/images/pluso/square/80/15.png);\n  }\n\n  /* */\n\n.pluso--small.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/01.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/02.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/03.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/04.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/05.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/06.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/07.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/08.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/09.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/10.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/11.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/12.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/13.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/14.png);\n}\n.pluso--small.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--small.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/40/15.png);\n}\n\n/* */\n\n.pluso--medium.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/01.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/02.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/03.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/04.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/05.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/06.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/07.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/08.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/09.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/10.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/11.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/12.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/13.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/14.png);\n}\n.pluso--medium.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--medium.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/60/15.png);\n}\n\n/* */\n\n.pluso--big.pluso--square-corner.pluso--theme01 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme01 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/01.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme02 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme02 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/02.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme03 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme03 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/03.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme04 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme04 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/04.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme05 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme05 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/05.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme06 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme06 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/06.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme07 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme07 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/07.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme08 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme08 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/08.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme09 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme09 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/09.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme10 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme10 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/10.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme11 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme11 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/11.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme12 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme12 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/12.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme13 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme13 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/13.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme14 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme14 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/14.png);\n}\n.pluso--big.pluso--square-corner.pluso--theme15 a[class^='pluso__'],\n.pluso--big.pluso--square-corner.pluso--theme15 i {\n  background-image: url(http://x.pluso.ru/images/pluso/square-corner/80/15.png);\n}\n\n\n  .pluso--medium .pluso__facebook {\n    background-position: 0 0;\n  }\n  .pluso--medium .pluso__twitter {\n    background-position: -31.5px 0;\n  }\n  .pluso--medium .pluso__tumblr {\n    background-position: -63px 0;\n  }\n  .pluso--medium .pluso__odnoklassniki {\n    background-position: -94.5px 0;\n  }\n  .pluso--medium .pluso__vkontakte {\n    background-position: -126px 0;\n  }\n  .pluso--medium .pluso__pinterest {\n    background-position: -157.5px 0;\n  }\n  .pluso--medium .pluso__google {\n    background-position: -189px 0;\n  }\n  .pluso--medium .pluso__moimir {\n    background-position: -220.5px 0;\n  }\n  .pluso--medium .pluso__livejournal {\n    background-position: -252px 0;\n  }\n  .pluso--medium .pluso__liveinternet {\n    background-position: -283.5px 0;\n  }\n  .pluso--medium .pluso__springpad {\n    background-position: -315px 0;\n  }\n  .pluso--medium .pluso__stumbleupon {\n    background-position: -346.5px 0;\n  }\n  .pluso--medium .pluso__myspace {\n    background-position: -378px 0;\n  }\n  .pluso--medium .pluso__formspring {\n    background-position: -409.5px 0;\n  }\n  .pluso--medium .pluso__blogger {\n    background-position: -441px 0;\n  }\n  .pluso--medium .pluso__digg {\n    background-position: -472.5px 0;\n  }\n  .pluso--medium .pluso__surfingbird {\n    background-position: -504px 0;\n  }\n  .pluso--medium .pluso__bobrdobr {\n    background-position: -535.5px 0;\n  }\n  .pluso--medium .pluso__readability {\n    background-position: -567px 0;\n  }\n  .pluso--medium .pluso__instapaper {\n    background-position: -598.5px 0;\n  }\n  .pluso--medium .pluso__evernote {\n    background-position: -630px 0;\n  }\n  .pluso--medium .pluso__bookmarks {\n    background-position: -661.5px 0;\n  }\n  .pluso--medium .pluso__email {\n    background-position: -693px 0;\n  }\n  .pluso--medium .pluso__print {\n    background-position: -724.5px 0;\n  }\n  .pluso--medium .pluso__vkrugu {\n    background-position: -756px 0;\n  }\n  .pluso--medium .pluso__delicious {\n    background-position: -787.5px 0;\n  }\n  .pluso--medium .pluso__pinme {\n    background-position: -819px 0;\n  }\n  .pluso--medium .pluso__yandex {\n    background-position: -850.5px 0;\n  }\n  .pluso--medium .pluso__yazakladki {\n    background-position: -882px 0;\n  }\n  .pluso--medium .pluso__moikrug {\n    background-position: -913.5px 0;\n  }\n  .pluso--medium .pluso__googlebookmark {\n    background-position: -945px 0;\n  }\n  .pluso--medium .pluso__yahoo {\n    background-position: -976.5px 0;\n  }\n  .pluso--medium .pluso__moemesto {\n    background-position: -1008px 0;\n  }\n  .pluso--medium .pluso__memori {\n    background-position: -1039.5px 0;\n  }\n  .pluso--medium .pluso__diary {\n    background-position: -1071px 0;\n  }\n  .pluso--medium .pluso__juick {\n    background-position: -1102.5px 0;\n  }\n  .pluso--medium .pluso__linkedin {\n    background-position: -1134px 0;\n  }\n  .pluso--medium .pluso__itutby {\n    background-position: -1165.5px 0;\n  }\n  .pluso--medium .pluso__webdiscover {\n    background-position: -1197px 0;\n  }\n  .pluso--medium .pluso__pikabu {\n    background-position: -1228.5px 0;\n  }\n  .pluso--medium .pluso__reddit {\n    background-position: -1260px 0;\n  }\n  .pluso--medium .pluso__dudu {\n    background-position: -1291.5px 0;\n  }\n  .pluso--medium .pluso__friendfeed {\n    background-position: -1323px 0;\n  }\n  .pluso--medium .pluso__misterwong {\n    background-position: -1354.5px 0;\n  }\n  .pluso--medium .pluso__webmoney {\n    background-position: -1386px 0;\n  }\n  .pluso--medium .pluso__more {\n    background-position: -1417.5px 0;\n  }\n}\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(12)
		// The css code:
		(__webpack_require__(9))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		".pluso-engine {\n  display: inline;\n}\n.pluso-sharer {\n  display: inline-block;\n  line-height: 0;\n  font-size: 0;\n  position: relative;\n  padding: 5px;\n  border-radius: 6px;\n}\n.pluso-sharer.pluso--small {\n  padding: 3px;\n}\n.pluso-sharer.pluso--vertical.pluso--multiline {\n  padding-bottom: 0px;\n}\n.pluso-sharer.pluso--horizontal.pluso--multiline {\n  padding-right: 0px;\n}\n.pluso-sharer .pluso_link{\n  float: left;\n  display: inline-block;\n  cursor: pointer;\n  margin:0 5px 0 0;\n}\n.pluso--small .pluso_link {\n  width: 20px;\n  height: 20px;\n}\n.pluso--medium .pluso_link{\n  width: 30px;\n  height: 30px;\n}\n.pluso--big .pluso_link{\n  width: 40px;\n  height: 40px;\n}\n\n.pluso-sharer .pluso_link.second-line {\n  margin-top: 5px;\n}\n\n.pluso--vertical .pluso_link{\n  display: block;\n  margin: 0 0 5px 0;\n}\n.pluso--vertical.pluso--multiline :nth-child(odd).pluso_link{\n  margin-right: 5px;\n}\n.pluso--small.pluso--vertical {\n  width: 20px;\n}\n.pluso--medium.pluso--vertical {\n  width: 30px;\n}\n.pluso--big.pluso--vertical {\n  width: 40px;\n}\n\n.pluso--small.pluso--vertical.pluso--multiline {\n  width: 45px;\n}\n.pluso--medium.pluso--vertical.pluso--multiline {\n  width: 65px;\n}\n.pluso--big.pluso--vertical.pluso--multiline {\n  width: 85px;\n}\n\n\n\n/*  more button*/\n.pluso-sharer .pluso__more {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n\n.pluso--small.pluso--horizontal.pluso--multiline :nth-child(odd).pluso__more{\n  margin-top: -7.5px;\n  margin-right: -10px;\n}\n.pluso--medium.pluso--horizontal.pluso--multiline :nth-child(odd).pluso__more{\n  margin-top: -12.5px;\n  margin-right: -13px;\n}\n.pluso--big.pluso--horizontal.pluso--multiline :nth-child(odd).pluso__more {\n  margin-top: -17.5px;\n  margin-right: -18px;\n}\n.pluso--small.pluso--vertical.pluso--multiline :nth-child(odd).pluso__more {\n  margin-bottom: -10px;\n  margin-left: 12.5px;\n}\n.pluso--medium.pluso--vertical.pluso--multiline :nth-child(odd).pluso__more{\n  margin-bottom: -12px;\n  margin-left: 17.5px;\n}\n.pluso--big.pluso--vertical.pluso--multiline :nth-child(odd).pluso__more{\n  margin-bottom: -18px;\n  margin-left: 22.5px;\n}\n\n\n\n\n.pluso-btns-hover {\n  display: none;\n  width: 100%;\n  height: 100%;\n  background: rgba(255,255,255,0.3);\n  \n}\n\na:hover.pluso_link .pluso-btns-hover{\n  display: inline-block;\n}\n\n.pluso--small.pluso--round .pluso-btns-hover {\n  border-radius: 10px;\n}\n.pluso--medium.pluso--round .pluso-btns-hover{\n border-radius: 15px;\n}\n.pluso--big.pluso--round .pluso-btns-hover{\n  border-radius: 20px;\n}\n\n.pluso--small.pluso--square .pluso-btns-hover {\n  border-radius: 3px;\n}\n.pluso--medium.pluso--square .pluso-btns-hover{\n border-radius: 3px;\n}\n.pluso--big.pluso--square .pluso-btns-hover{\n  border-radius: 3px;\n}\n\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(12)
		// The css code:
		(__webpack_require__(11))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"#pluso-share-box {\n  background-color: rgba(0, 0, 0, 0.6);\n  background-color: #000 \\9; \n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  vertical-align: middle;\n  width: 100%;\n  z-index: 999;\n}\n.pluso-box {\n  width: 744px;\n  height: 555px;\n  background: #fff;\n  margin: 20px auto;\n  border-radius: 40px 40px 40px 40px;\n  background-clip: padding-box;\n  border: 10px solid rgba(2, 2, 2, 0.1);\n  overflow: hidden;\n  text-align: left;\n  font-family: Helvetica;\n}\n.pluso-box__header {\n  height: 88px;\n  overflow: hidden;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid #dcdcdc;\n}\n.pluso-box__search {\n  margin: 20px 40px;\n  width: 582px;\n  height: 48px;\n  overflow: hidden;\n  -webkit-border-radius: 10px;\n  -webkit-background-clip: padding-box;\n  -moz-border-radius: 10px;\n  -moz-background-clip: padding;\n  border-radius: 10px;\n  background-clip: padding-box;\n  background: #fff;\n  float: left;\n}\n.pluso-box__search input[type=text] {\n  width: 562px;\n  outline: none;\n  font-size: 20px;\n  padding: 0 10px;\n  height: 48px;\n  line-height: 48px;\n  border: none;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAABdElEQVQ4y43TPUsDQRCA4Y1XaeEn8S8IpjGKgqnEMqQQW1FbsYwpRP0PJrwoaJo04heohZWgSGwElRSmiYgg2EmINmkkjkWWZHN7dx7THDf7MLs7swrVii5SFKhQp84LFyzTa2SNaH/OUkZc8ckqjj/aoGGRZlwz4I3W9YIGZywSI0aSbWr67z09NprRVSqMdyQHOdXsyI0iPCEIr0St3UfY0WyuE6UQhF+mPG/K4RZBKHWiAoJw7n25KMZ0rbiJmhe94IuU3v6aiaoIwkQAyiEIeRP9IAijAWgLQTgw0QeCkAxAWQRh30SXCAIB6A5BSJtoBUGoMeRDRnTrJ03Ur8flmIhnn64QhLKZVSgyuhNYE+2wq3NL7tlz9LmEotlCRnSVZqWoe8r7eGilH8mxSZai67GUGXa/p24Ofd6TBzNPME/JteyZDN82s8czQ54T9kjr0UrYTPF/WCwMcrObcEiR4KuF3sOiNqsSD48U07xRIY76AyovYVq+S7fIAAAAAElFTkSuQmCC);\n  background-repeat: no-repeat;\n  background-position: 532px center;\n  color: #717171;\n}\n.pluso-box__content {\n  background: #fff;\n  height: 420px;\n  padding: 10px 10px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.pluso-box__content:before,\n.pluso-box__content:after {\n    content: \" \";\n    /* 1 */\n    display: table;\n    /* 2 */\n}\n.pluso-box__content:after {\n    clear: both;\n}\n\n.pluso-box__content a {\n  display: block;\n  float: left;\n  color: #717171;\n  cursor: pointer;\n  width: 210px;\n  padding: 10px;\n  -webkit-border-radius: 5px;\n  -webkit-background-clip: padding-box;\n  -moz-border-radius: 5px;\n  -moz-background-clip: padding;\n  border-radius: 5px;\n  background-clip: padding-box;\n  margin: 0 !important;\n}\n.pluso-box__content a:hover {\n  background-color: #e8e8e8;\n}\n.pluso-box__content i {\n  display: block;\n  float: left;\n}\n.pluso-box__content .hidden_button {\n  display: none\n}\n.pluso-box__content span {\n  display: block;\n  float: left;\n  line-height: 30px !important;\n  margin-left: 10px;\n}\n.pluso-box__close {\n  width: 81px;\n  height: 88px;\n  cursor: pointer;\n  display: block;\n  float: left;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAnUlEQVQoz3XROw6DMBBF0Se5Za2wBUgT+iuRDRDShawBFuYUjr9DNJWfjjQfCyF6ZhwyNYRciBGPZzVsirno8b+q2ZTyRczpUbKpSN/C8TSsJCedsOxWkzB4yxoSkXCshhyBZGRZIiWqx/Vs+SCZjKZdOsh/UjDb6OTVMks6HFvNxHCxUX23h7hfLV2xPd+nJCU74t8tfBoS850OfQFjeWNnnuhrfgAAAABJRU5ErkJggg==);\n  border-left: 1px solid #dcdcdc;\n}\n.pluso-box__close:hover {\n  background-color: #ededed;\n}\n.pluso-box__close:active {\n  background-color: #dfdfdf;\n}\n\n.pluso-box-open {\n  overflow: hidden !important;\n}";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		return function() {
			head.removeChild(styleElement);
		};
	}


/***/ }
/******/ ])