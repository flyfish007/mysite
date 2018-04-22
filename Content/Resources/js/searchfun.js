
function GetPathName () {
    var cp = document.location.pathname;
    var p = cp.split('/');
    return p.length <= 0 ? "" : p[p.length-1];
}
function GetRPath(level = 3) {
    var cp = document.location.pathname;
    var p = cp.split('/');
    var c = p.length - level;
    var rp = "";
    for (var i = 0 ; i < c ; i++)
        rp += '../';
    return rp;
}

if(GetPathName().toLowerCase() != 'search.htm')
require([
  'mustache',
    'search_suggestion.json',], function (Mustache, suggestionwords){
		$.ajax({
		  type: "POST",
		  url: GetRPath(2) + "Php/GetTop5.php?force=true",
		  success: function(res){ 
		  	topWord = res;
		  }
		});

		  var topWord = [];
		  suggestionwords = suggestionwords.dict;

		  var hotTemplete = '<ul class="hot">{{#hot}}<li><span class="value">{{keyword}}</span><span class="sign">{{sign}}</span></li>{{/hot}}</ul>';
		  var suggestionTemplete = '<ul class="searchResult">{{#suggestion}}<li><span class="value">{{keyword}}</span></li>{{/suggestion}}</ul>';

		  var renderHotList = function (ss) {
		    $(".search_slide")
		      .empty()
		      .append(Mustache.to_html(hotTemplete, {hot: ss}));

		        $(".search_slide").show();
		        $(".search_slide .hot").show();
		    	$(".search_slide li").click(function () {
		    	var kw = $(this).find(".value").html();
		    	$('.search-field').val(kw);
		        $(".search_slide").hide();
			    query(kw);
		    })
		  }
		  var query = function(qword){
  			window.location.href=GetRPath() + "Search.htm#search-" + qword;
		  }

		  var renderSuggestionList = function (ss) {
		    $(".search_slide")
		      .empty()
		      .append(Mustache.to_html(suggestionTemplete, {suggestion: ss}));

		        $(".search_slide").show();
		        $(".search_slide .searchResult").show();
		    $(".search_slide li").click(function () {
		    	var kw = $(this).find(".value").html();
		    	$('.search-field').val(kw);
		        $(".search_slide").hide();
			    query(kw);
		    })
		  }  

		   var sideFixManueHide = function () {
		        $(".sideFixManueWrap").hide();
		        $(".MCBreadcrumbsBox_0 .arrow_down").removeClass("trun_up");
		        $(".screenShadow").hide();
		    }

		    $(".search-submit").click(function (e) {
		        e.stopPropagation();
		        if($(".search-field").val() != '')
		        {
			  		var s = $('.search-field').val();
			    	if (s.length < 2) return
			    	if (s.length > 10) {
			    		s = s.substring(0, 10);
			    		$('.search-field').val(s)
			    	} 
			    	var q = s
			    	query(q);
		        }
		    })

		    $('.search-field').bind('keyup',function (event) {
			  	if(event.keyCode == 13){
			  		var s = $('.search-field').val();
			    	if (s.length < 2) return
			    	if (s.length > 10) {
			    		s = s.substring(0, 10);
			    		$('.search-field').val(s)
			    	} 
			    	var q = s
			    	query(q);
			    	return;
				}

				var s = $('.search-field').val()
				var sl = s.toLowerCase();
				if(s.length > 0){
					var result = [];
					suggestionwords.map(function(suggestion){
						if(suggestion.toLowerCase().indexOf(sl) >= 0)
							result.push({ keyword : suggestion});
					})
					renderSuggestionList(result);
				}else {

					var idx = 1;
					var result = topWord.map(function(hotword){
						return {keyword : hotword, sign : "top"+idx++};
					})

					renderHotList(result);

		        	// $(".search_slide .searchResult").hide();
		    	}
			});

		    $('.search-field').click(function (e) {
		        e.stopPropagation();
		    	var s = $('.search-field').val();

				if(s.length <= 0){
					var idx = 1;
					var result = topWord.map(function(hotword){
						return {keyword : hotword, sign : "top"+idx++};
					})

					renderHotList(result);
				  }
			});

		    $(document).click(function(){
		        $(".search_slide").hide();
		        var _w = parseInt($(window).width());
		        if(_w<650){
		            sideFixManueHide()
		        }
		    });

		  	if( window.location.hash != ""){
		  	  	var qi = window.location.hash.substr(1);
		  	  	if(qi.indexOf('search-') == 0)
		  	  	{
		  	  		var q = qi.replace('search-','');
		  	  		query(decodeURI(q));
		  	  	}
		  	}


    })
else
require([
  //'jquery.min',
  'mustache',
  'lunr',
    'search_data.json',
    'search_index.json',
    'search_combo.json',
    'search_suggestion.json',
], function (Mustache, lunr,  data, indexDump, combowords, suggestionwords) {

	$.ajax({
	  type: "POST",
	  url: GetRPath(2) + "Php/GetTop5.php?force=true",
	  success: function(res){ 
	  	topWord = res;
	  }
	});

  var topWord = [];

  var resultTemplete = '<ul id="resultList">{{#questions}}<li><h3 class="title"><a href="{{location}}?Highlight={{hl}}">{{title}}</a></h3><div class="description">{{body}}</div><div class="url"><cite>{{location}}</cite></div></li>{{/questions}}</ul>';
  /// search_slide
  var hotTemplete = '<ul class="hot">{{#hot}}<li><span class="value">{{keyword}}</span><span class="sign">{{sign}}</span></li>{{/hot}}</ul>';
  var suggestionTemplete = '<ul class="searchResult">{{#suggestion}}<li><span class="value">{{keyword}}</span></li>{{/suggestion}}</ul>';

  var renderHotList = function (ss) {
    $(".search_slide")
      .empty()
      .append(Mustache.to_html(hotTemplete, {hot: ss}));

        $(".search_slide").show();
        $(".search_slide .hot").show();
    	$(".search_slide li").click(function () {
    	var kw = $(this).find(".value").html();
    	$('.search-field').val(kw);
        $(".search_slide").hide();
	    query(kw);
    })
  }

  var renderSuggestionList = function (ss) {
    $(".search_slide")
      .empty()
      .append(Mustache.to_html(suggestionTemplete, {suggestion: ss}));

        $(".search_slide").show();
        $(".search_slide .searchResult").show();
    $(".search_slide li").click(function () {
    	var kw = $(this).find(".value").html();
    	$('.search-field').val(kw);
        $(".search_slide").hide();
	    query(kw);
    })
  }

  var renderResultList = function (qs, q) {
    $("#result-list-container")
      .empty()
      .append(Mustache.to_html(resultTemplete.replace('{{hl}}', q), {questions: qs}));
    $('.total-results').html(qs.length);
    $('.space').hide();
  }

   var sideFixManueHide = function () {
        $(".sideFixManueWrap").hide();
        $(".MCBreadcrumbsBox_0 .arrow_down").removeClass("trun_up");
        $(".screenShadow").hide();
    }

  var query = function (qword) {
  	console.time('query');
  	var comboitem = null;
  	for (var comboidx = 0; comboidx < combowords.length; comboidx++)
  	{
  		var iscombo = false;
  		var combo = combowords[comboidx];
  		for (var wordidx = 0; wordidx < combo.length; wordidx++)
  		{
  			var wordss = combo[wordidx];
  			if(wordss == qword) { iscombo = true; comboitem = combo; break; }
  			if(iscombo) break;
  		}
  	}

    var results = null;
  	if(comboitem == null)
  		results = idx.search(qword).map(function (result) {
	      return questions.filter(function (q) { return q.id === parseInt(result.ref, 10) })[0]
	    })
  	else
  	{
  		var r = [];
  		for (var wordidx = 0; wordidx < comboitem.length; wordidx++)
  		{
  			var word = comboitem[wordidx];
  			idx.search(word).map(function (result){
  				if(r.indexOf(result.ref) < 0) r.push(result.ref);
  			})
  		}
  		results = r.map(function(r) {
  			return questions.filter(function(q) { return q.id === parseInt(r ,10)})[0]
  		})

  	}

  	console.timeEnd('query');  	
  	$.ajax({
	  type: "POST",
	  url: GetRPath(2) + "Php/UpDateKeyword.php?keyword="+qword+"&resultcount="+results.length,
	  success: function(res){ 
	  	// alert(res);
	  }
//	  dataType: dataType
	});

    renderResultList(results, qword)
  }

  var checkSuggestionWord = function(){
   var t = suggestionwords.map(function (word) {
  	var rest = idx.search(word);
  	return {k:word, c:rest.length};
  })
  console.log(JSON.stringify(t));
  var tt = [];
  t.map(function (w) {
  	if(w.c == 0) console.log(w.k);
  	else tt.push(w.k);
  })
   console.log(JSON.stringify(tt)); 	
  }

  combowords = combowords.combos
  suggestionwords = suggestionwords.dict
  console.time('load')
  window.idx = lunr.Index.load(indexDump)
  console.timeEnd('load')

	// checkSuggestionWord();


  var questions = data.docs.map(function (raw) {
    return {
      id: raw.id,
      title: raw.title,
      body: raw.body.substring(0,50),
      location: 'D90产品使用手册-左舵中文/' + raw.location
    }
  })

    $(".search-submit").click(function (e) {
        e.stopPropagation();
        if($(".search-field").val() != '')
        {
	  		var s = $('.search-field').val();
	    	if (s.length < 2) return
	    	if (s.length > 10) {
	    		s = s.substring(0, 10);
	    		$('.search-field').val(s)
	    	} 
	    	var q = s
	    	query(q);
        }
    })

    $('.search-field').bind('keyup',function (event) {
	  	if(event.keyCode == 13){
	  		var s = $('.search-field').val();
	    	if (s.length < 2) return
	    	if (s.length > 10) {
	    		s = s.substring(0, 10);
	    		$('.search-field').val(s)
	    	} 
	    	var q = s
	    	query(q);
	    	$(".search_slide").hide();
	    	return;
		}

		var s = $('.search-field').val()
		var sl = s.toLowerCase();
		if(s.length > 0){
			var result = [];
			suggestionwords.map(function(suggestion){
				if(suggestion.toLowerCase().indexOf(sl) >= 0)
					result.push({ keyword : suggestion});
			})
			renderSuggestionList(result);
		}else {

			var idx = 1;
			var result = topWord.map(function(hotword){
				return {keyword : hotword, sign : "top"+idx++};
			})

			renderHotList(result);

        	// $(".search_slide .searchResult").hide();
    	}
	});

    $('.search-field').click(function (e) {
        e.stopPropagation();
    	var s = $('.search-field').val();

		if(s.length <= 0){
			var idx = 1;
			var result = topWord.map(function(hotword){
				return {keyword : hotword, sign : "top"+idx++};
			})

			renderHotList(result);
		  }
	});

    // $(document).click(function(){
    //     $(".search_slide").hide();
    //     var _w = parseInt($(window).width());
    //     if(_w<650){
    //         sideFixManueHide()
    //     }
    // });

  	if( window.location.hash != ""){
  	  	var qi = window.location.hash.substr(1);
  	  	if(qi.indexOf('search-') == 0)
  	  	{
  	  		var q = qi.replace('search-','');
  	  		query(decodeURI(q));
  	  	}
  	}

})