/*******************************************************************************
 * @license
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors: IBM Corporation - initial API and implementation
 *******************************************************************************/
define(['require'], function(require) {
	
	function formatMessage(msg) {
		var args = arguments;
		return msg.replace(/\$\{([^\}]+)\}/g, function(str, index) { return args[(index << 0) + 1]; });
	}
	
	function urlExists(url)
	{
		var http = new XMLHttpRequest();
		http.open('GET', url, false);
		try {
		        http.send();
		} catch(e) {
		}
		return http.status!=404;
	}
	
	function getNlsBundle(bundlePath){
		var ret= {root:true};
		var locale;
		locale = locale ||	navigator.language || navigator.userLanguage;
		if(locale){
			locale = locale.toLowerCase();
			var parts = locale.split("-");
			var urlSegments = bundlePath.split("/");
			var nlsModule = urlSegments[urlSegments.length-1];
			var baseNls = bundlePath.substring(0, bundlePath.length - nlsModule.length);
			var nlsUrl = require.toUrl(baseNls + locale + "/" + nlsModule);
			if( urlExists(nlsUrl) ){
				ret[locale] = true;
			} else if(parts.length>1){
			        var nlsUrl = require.toUrl(baseNls + parts[0] + "/" + nlsModule);
				if(urlExists(nlsUrl)){
					ret[parts[0]] = true;
				}
			}
		}
		return ret;
	}
	
	//return module exports
	return {
		formatMessage: formatMessage,
		getNlsBundle: getNlsBundle
	};
});