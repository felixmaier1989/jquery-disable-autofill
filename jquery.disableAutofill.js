(function($) {

	$.fn.disableAutoFill = function() {

		"use strict";

		var self = {

			/**
			 * Disable autofill for one input
			 * @param {Object} $input jQuery element
			 */
			disableAutoFill: function($input) {
				if (self.isBrowser('safari')) {
					self.alterLabel($input);
					self.alterName($input);
					self.alterId($input);
				}
				$input.attr('autocomplete', 'off');
			},

			/**
			 * Change input's name
			 * Make sure Safari wont detect the word "name" in the name attribute
			 * otherwise Safari will enable autofill
			 * @param {Object} $input jQuery element
			 */
			alterName: function ($input) {
				$input.attr('data-original-name', $input.attr('name'));

				// Find unique name attribute value
				var new_name = false;
				var iteration = 0;
				while (iteration < 10 && !new_name) {
					new_name = self.random();
					if (self.checkAttributeExists('name', new_name)) {
						new_name = false;
					}
				}

				if (new_name) {
					$input.attr('name', new_name);
					self.setFormSubmitHandler($input);
				}
			},

			/**
			 * Change input's id
			 * Make sure Safari wont detect the word "name" in the id attribute
			 * otherwise Safari will enable autofill
			 * @param {Object} $input jQuery element
			 */
			alterId: function ($input) {
				$input.attr('data-original-id', $input.attr('id'));

				// Find unique id attribute value
				var new_id = false;
				var iteration = 0;
				while (iteration < 10 && !new_id) {
					new_id = self.random();
					if (self.checkAttributeExists('id', new_id)) {
						new_id = false;
					}
				}

				if (new_id) {
					$input.attr('id', new_id);
					self.setFormSubmitHandler($input);
				}
			},

			/**
			 * Reset input's name and id to its initial values before submitting the form
			 * @param {Object} $input jQuery element
			 */
			setFormSubmitHandler: function ($input) {
				var $form = $input.closest('form');
				if ($form.length > 0) {
					$form.submit(function() {
						var id = $input.attr('data-original-id');
						if (id) {
							$input.attr('id', id);
						}
						var name = $input.attr('data-original-name');
						if (name) {
							$input.attr('name', name);
						}
					});
				}
			},

			/**
			 * Make sure Safari wont detect the word "name" in the label
			 * otherwise Safari will enable autofill
			 * @param {Object} $input jQuery element
			 */
			alterLabel: function ($input) {
				var $label = self.findLabel($input);
				if ($label && $label.length > 0) {
					var text = $label.text();
					var array = text.split('');
					text = array.join('<span></span>');
					$label.html(text);
				}
			},

			/**
			 * Find label element of an input
			 * see http://stackoverflow.com/questions/4844594/jquery-select-the-associated-label-element-of-a-input-field
			 * @param $input
			 * @returns {*}
			 */
			findLabel: function ($input) {
				var $label = $('label[for="'+$input.attr('id')+'"]');

				if ($label.length > 0) {
					return $label;
				}
				var $parentElem = $input.parent();
				var $parentTagName = parentElem.get(0).tagName.toLowerCase();

				if ($parentTagName == "label") {
					return $parentElem;
				}
				return null;
			},

			/**
			 * Generate a random string
			 * @returns {string}
			 */
			random: function () {
				var text = '';
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for (var i=0; i < 5; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			},

			/**
			 * Check if there is an existing DOM element with a given attribute matching a given value
			 * @param {string} attributeName
			 * @param {string} attributeValue
			 * @returns {boolean}
			 */
			checkAttributeExists: function (attributeName, attributeValue) {
				return $('['+attributeName+'='+attributeValue+']').length > 0;
			},

			/**
			 * Detect current Web browser
			 * @param {string} browser
			 * @returns {boolean}
			 */
			isBrowser: function (browser) {
				// http://stackoverflow.com/questions/5899783/detect-safari-using-jquery
				var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
				var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
				var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
				var is_safari = navigator.userAgent.indexOf("Safari") > -1;
				var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
				if ((is_chrome)&&(is_safari)) {is_safari=false;}
				if ((is_chrome)&&(is_opera)) {is_chrome=false;}

				if (browser === 'chrome') {
					return is_chrome;
				}
				if (browser === 'explorer') {
					return is_explorer;
				}
				if (browser === 'firefox') {
					return is_firefox;
				}
				if (browser === 'safari') {
					return is_safari;
				}
				if (browser === 'opera') {
					return is_opera;
				}
				return false;
			}

		};

		self.disableAutoFill(this);

		return this;
	};



}(jQuery));