// Vukajlija poster loader
// version 0.1
// 08.06.2011
// Copyright (c) 2011, Goran Gajic design4q.com
// ==UserScript==
// @name          Vukajlija poster loader
// @namespace     http://www.design4q.com/vukajlija
// @description   Automatsko iscitavanje vukajlija postera
// @include       http://vukajlija.com/*
// @include       http://www.vukajlija.com/
// ==/UserScript==



	// Add desing4q.com/vukajlija.js
    (function(){
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_Script = document.createElement('script');
			console.log(GM_Head);
            GM_Script.src = 'https://raw.github.com/feroc1ty/Vukajlija-extension/master/vukajlija.js';
            GM_Script.type = 'text/javascript';
            GM_Script.async = true;
            GM_Head.insertBefore(GM_Script, GM_Head.firstChild);
	})();