/*
	* Radiocharm jQuery Plugin
	*
	* @file: jquery-radiocharm.js
	* @author: Mark Coyne
	* @site: www.coynem.com
	* @license: MIT License
*/

(function($) {
	$.fn.radiocharm = function(options) {
		/*
			* default settings
		*/
		var settings = $.extend({
			// development mode
			// this will activate console debug messages
			'development': false,

			// uncheckable
			// this will allow radio boxes to be uncheckable
			'uncheckable': false
		}, options);



		/*
			* core function
			* main bulk of the code to loop through all of the items
		*/
		return this.each(function() {
			var $object = $(this);
			var selected = $object.is(':checked');
			var input_id = $object.attr('id');
			var input_class = $object.attr('class');
			var input_name = $object.attr('name');
			var input_label = $object.attr('data-radiocharm-label');
			var input_value = $object.val();
			var input_icon = $object.attr('data-radiocharm-icon');
			var input_background_color = $object.attr('data-radiocharm-background-color');
			var input_text_color = $object.attr('data-radiocharm-text-color');



			// input_id
			// if there is no input_id, then generate a random one
			if (input_id == null || input_id.trim() === '') {
				var random_number = 1 + Math.floor(Math.random() * 1024000);
				input_id = random_number;

				while ($('input#radiocharm-' + input_id).length !== 0) {
					random_number++;
					input_id = random_number;
					debug(settings.development, 'Random number was already used, trying again.');
				};
			};



			// input_icon
			// if there is no input_icon, set default icon
			if (input_icon == null || input_icon.trim() === '') {
				input_icon = 'check';
			};



			// input_background_color
			// if there is no input_background_color, set default color
			if (input_background_color == null || input_background_color.trim() === '') {
				input_background_color = '';
			};



			// input_text_color
			// if there is no input_text_color, set default color
			if (input_text_color == null || input_text_color.trim() === '') {
				input_text_color = '';
			};



			// create
			// pass all values to create function, return back block to replace on page with
			var element = jQuery(create(selected, input_id, input_class, input_name, input_label, input_value, input_icon, input_background_color, input_text_color));
			$object.replaceWith(element);



			// on click - element
			// when element is clicked add / remove class and check / uncheck radio
			element.click(function(e){
				e.preventDefault();

				if (settings.uncheckable) {
					if (element.hasClass('active')) {
						element.removeClass('active');
						$('input#radiocharm-' + input_id).prop('checked', false);
					} else {
						$('input[name=' + input_name + ']').parent('label').removeClass('active');
						$('input[name=' + input_name + ']').prop('checked', false);
						
						$(element).addClass('active');
						$('input#radiocharm-' + input_id).prop('checked', true);
					};

					$('input#radiocharm-' + input_id).trigger('change');
				} else {
					if (!element.hasClass('active')) {
						$('input[name=' + input_name + ']').parent('label').removeClass('active');
						$('input[name=' + input_name + ']').prop('checked', false);
						
						$(element).addClass('active');
						$('input#radiocharm-' + input_id).prop('checked', true);
					};

					$('input#radiocharm-' + input_id).trigger('change');
				};
			});
		});
	};



	/*
		* debug function
		* send console messages if development setting is turned on
	*/
	function debug(debug, message) {
		if (debug && window.console && window.console.log) {
			window.console.log('jQuery-Radiocharm: ' + message);
		};
	};



	/*
		* create function
		* create the block of code and return back
	*/
	function create(selected, input_id, input_class, input_name, input_label, input_value, input_icon, input_background_color, input_text_color) {	
		var block;
		var style = '';
		var selected = selected ? 'active' : '';

		if ((input_background_color !== null && input_background_color.trim() !== '') || (input_text_color !== null && input_text_color.trim() !== '')) {
			style = '<style type="text/css">label#label-radiocharm-' + input_id + '.active {';

			if (input_background_color !== null && input_background_color.trim() !== '') {
				style += 'background: #' + input_background_color + ';';
			};

			if (input_text_color !== null && input_text_color.trim() !== '') {
				style += 'color: #' + input_text_color + ';';
			};

			style += '</style>';
		};

		block = '\
			<label class="label-radiocharm ' + selected + '" id="label-radiocharm-' + input_id + '">\
				<em class="fa fa-fw fa-circle-o inactive"></em><em class="fa fa-fw fa-' + input_icon + ' active"></em> ' + input_label + '\
				<input class="' + input_class + '" id="radiocharm-' + input_id + '" name="' + input_name + '" type="radio" value="' + input_value + '" />\
				' + style + '\
			</label>\
		';

		return block;
	};
}(jQuery));