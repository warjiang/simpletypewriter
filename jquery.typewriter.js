;(function($){
	//默认配置
	var defaults = {
        'selector': this,
        'delay' :    100,
        'str_arr': ['每段時刻的選擇影響','往往造就了無法想像的結局','也謝謝當下的選擇造就了這段愛情',]
    };
	$.fn.typewriter = function(options){
		 //if (options) 
		 options = $.extend({length:this.length}, defaults, options);

		 //对一行不断打印0～i之间的字符串
		function type_next_character(element,str,i){
			//console.log(element instanceof $);
			//element.html(str.substr(0, i));
			//console.log(element[0]);
			var dfd = $.Deferred();
			var t = setInterval(function(){
				if(str.length >= i){
					//console.log(str.substr(0, i));
					element.html(str.substr(0, i));
				}
				else{
					//console.log('clear timer');
					clearInterval(t);
					dfd.resolve();
				}
				i++;
			},options['delay'])
			return dfd.promise();
		}

		function type_next_element($element,i){
			//console.log($element);
			//console.log(options['str_arr'][i]);
			type_next_character($element,options['str_arr'][i],0)
			.then(function(){
				options['length']--; 
				if(options['length'] > 0){
					return type_next_element($element.next(),i+1);
				}
			});
		}
		
		type_next_element(this.first(),0)
	}
})(jQuery);