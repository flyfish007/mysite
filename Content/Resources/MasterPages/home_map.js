	
			
			$(function(){
			var _w = parseInt($(window).width());
			var _pc = _w / 650;
			if(_w < 650){
				$("area").each(function(e){
				var _cd = $(this).attr("coords");
				var _carr = _cd.split(",");
				for(var i=0;i<_carr.length;i++){
				_carr[i] = Math.ceil(_carr[i] * _pc);
				}
				$(this).attr("coords",_carr.join(","));
				});
				}
				});
	
