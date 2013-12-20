/*************************************************
**  jQuery lazy form version 1.0
**  Copyright Nao Fujimoto, licensed MIT
**************************************************/

jQuery(function() {
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;
});

(function($){
	$.fn.lazyForm = function(options) {
	
		var ngCode  = [
				' ',  // --------------
				'0',  // ???
				'9',  // tab
				'16', // shift
				'17', // ctrl
				'32', // space
				'27', // esc
				'37', // left
				'38', // up
				'39', // right
				'40', // down
				'91', // Cmd(L), Win(L)
				'92', // Win(R)
				'93', // Cmd(R)
				'112',// F1
				'113',// F2
				'114',// F3
				'115',// F4
				'116',// F5
				'117',// F6
				'118',// F7
				'119',// F8
				'120',// F9
				'121',// F10
				'122',// F11
				'123',// F12
				' '   // ---------------
				].join('@'),
				keyCatch = (function(){
					if ( document.all ) {
						return function(e){return e.keyCode;};
					} else if ( document.getElementById ) {
						return function(e){return (e.keyCode)? e.keyCode: e.charCode;};
					} else if ( document.layers ) {
						return function(e){return e.which;};
					}
				})();
				
		var target = this;
		var defaults = {
			inputType : 'text',
			style : {
				width: 100,
				height: 20
			}
		}

		opt = $.extend({}, defaults, options);	
		
		// for the browsers not supporting attribut 'placeholder'
		var placeholder = function(target){
			var _self = $(target);
			var _obj = {};
			
			_self.keydown(function(e){
				var key = keyCatch(e);
				if (_self.val() == _self.attr('placeholder')) {
					
					if (this.originalType) {
						this.type = this.originalType;
						delete this.originalType;
					}
					
					if ( ngCode.indexOf('@'+key+'@') !== -1 ) {
						// tabの入力は認める		
						return ( key === 9 );
					} else {
						_self.val('');
						_self.removeClass('placeholder');
					}
					
				} 
			}).blur(function() {
				if (_self.val() == '') {
					if (this.type == 'password') {
						this.originalType = this.type;
						this.type = 'text';
					}
					_self.addClass('placeholder');
					_self.val(_self.attr('placeholder'));
				}
			}).blur().closest('form').submit(function(){
				
					if(_self.attr('placeholder') == _self.val()){
						_self.val('');
					}
			
				return true;
			});
		}

		target.each(function(){
			var myNodeName = $(this)[0].nodeName;
			if(myNodeName == 'SELECT'){
				$(this).css({opacity: 0});
				$(this).wrap('<span class="lazy_form_select_wrap"></span>');
				$('.lazy_form_select_wrap').prepend(
					'<span class="lazy_form_select clearfix">'+
						'<span class="lazy_form_select_text"></span><span class="lazy_form_select_trigger"></span>'+
					'</span>');

				if($('option:selected', this).length){
					var value = $('option:selected', this).text();
					$(this).parent().find('.lazy_form_select_text').html(value);				
				}
				$(this).on('change', function(){
					var value = $('option:selected', this).text();
					$(this).parent().find('.lazy_form_select_text').html(value);			
				});
			} else if (myNodeName == 'INPUT'){
				var type = $(this).attr('type');
				
				if(type == 'checkbox'){
					$(this).css({opacity: 0});
					$(this).wrap('<span class="lazy_form_checkbox_wrap"></span>');
					$('.lazy_form_checkbox_wrap').prepend('<span class="lazy_form_checkbox"></span>');
					if($(this).attr('checked') == 'checked'){
						$(this).parent().find('.lazy_form_checkbox').addClass('checked');		
					}
					$(this).on('change', function(){
						if($(this).is(":checked")){
							$(this).parent().find('.lazy_form_checkbox').addClass('checked');		
						} else {
							$(this).parent().find('.lazy_form_checkbox').removeClass('checked');		
						}		
					});					
				} else if(type == 'text' || type == 'password'){
				//	if($(this).attr('placeholder') && !$.support.placeholder){
						placeholder(this);
					//}
				}
			}
			
		});
	}
	
})(jQuery);