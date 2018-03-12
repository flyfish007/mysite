
	(function(g, d, s, t) {
		g['_cts'] = g['_cts'] || {};
		g['_cts'][t] = g['_cts'][t] || {};
		g[t] = g[t] || function() {
			(g[t].c = g[t].c || []).push(arguments);
		}
		var c = d.createElement(s),
			h = d.getElementsByTagName(s)[0];
		c.src = '//c.saicmaxus.com/dmp/t.js';
		//h.parentNode.insertBefore(c, h);
	})(window, document, 'script', 'pilot');

	pilot('set', 'siteId', 'CCS81158');
	pilot('set', 'accountId', 'pilot');
	pilot('set', 'baseUrl', 'https://trk.maxuscloud.com/');
	pilot('track', 'pageview');
