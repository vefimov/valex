/*
Copyright (c) 2012, Valex! Inc. All rights reserved.
Code licensed under the License:
--- here should be a link to license info
version: 1.0
*/

/**
 * Define application namespace
 * VX is short name of VALEX
 */
if(typeof VX =="undefined" || !VX) {
	var VX = {};
}


/**
 * Provides a simple mechanism for setting up the prototype, constructor, 
 * and superclass properties for objects that are extending other objects.
 * 
 * @param child {Function} child class
 * @param parent {Function} parent (base) class
 */
VX.extend = function(child, parent) { 
	var hasProp = {}.hasOwnProperty;
	
	for (var key in parent) { 
		if (hasProp.call(parent, key)) 
			child[key] = parent[key]; 
	} 

	function ctor() {
		this.constructor = child;
	} 
	
	ctor.prototype = parent.prototype; 
	child.prototype = new ctor(); 
	child.__super__ = parent.prototype; 
	return child; 
};


// Define namespace for form
if(typeof VX.Form =="undefined" || !VX.Form){
	VX.Form = {};
}

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * TextField class for the VX Form widget.
 *
 * @namespace VX.Form
 * @class TextField
 * @extends YAHOO.util.Element
 * @constructor
 * @param element {String} container element for the input.
 * @param aColumnDefs {Object[]} Array of object literal Column definitions.
 */
VX.Form.TextField = (function() {

	function TextField(element, config) {
		// jQuery instance of input or textarea
		this.el = $(element).eq(0);
		var elementId = this.el.attr("id"), cfg;
		
		// default settings
		var defaults = {
			parentClassName		: false,
			placeholderAttr		: 'value',
			placeholderEvent	: 'onenter', // Possible values : onfocus, onenter  
			inputFocusClass		: 'focus',
			inputHoverClass		: 'hover',
			inputActiveClass	: 'text-active',
			parentFocusClass	: 'parent-focus',
			parentHoverClass	: 'parent-hover',
			parentActiveClass	: 'parent-active',
			labelFocusClass		: 'label-focus',
			labelHoverClass		: 'label-hover',
			labelActiveClass	: 'label-active',
			
			labelEl				: null,
			parentEl			: null
		}
		
		this.config = cfg = $.extend(defaults, config);			
		// init selector for label
		if(!cfg.labelEl) {
			cfg.labelEl = "label[for=" + elementId + "]";
		}
		// init selector|element for parent
		if(!cfg.parentEl){
			
			if(cfg.parentClassName){
				cfg.parentEl = "." + cfg.parentClassName + ":has(#'" + elementId + "')";
			}
			else {
				cfg.parentEl = this.el.parent();
			}
		}
		
		this.init();
	}
	
	TextField.prototype = {
		/**
		 * Object reference for the input or textarea
		 *
		 * @property el
		 * @type {jQuery}
		 * @public
		 */
		el : null,
	
		/**
		 * Object reference for the parent element
		 *
		 * @property parentEl
		 * @type {jQuery}
		 * @public
		 */
		parentEl : null,
		
		/**
		 * Object reference for the label
		 *
		 * @property labelEl
		 * @type {jQuery}
		 * @public
		 */
		labelEl : null,
	
		/**
		 * Flag to determine that the element got the focus
		 *
		 * @property _isFocused
		 * @type Bool
		 * @protected
		 */
		_isFocused : false,
		
		/**
		 * Array of object literal Column definitions.
		 *
		 * @property config
		 * @type Object
		 * @protected
		 */
		config : {},
	
		// Initialization
		init : function() {		
			this.parentEl = $(this.config.parentEl);
			this.labelEl = $(this.config.labelEl);
			
			// subscrive on events
			this.el.bind("focus.vx", $.proxy(this._onFocus, this))
				.bind("blur.vx", $.proxy(this._onBlur, this));
		},
		
		/**
		 * Refreshes CSS classes
		 * 
		 * @method refreshCSSClasses
		 */
		refreshCSSClasses : function(){
			var cfg = this.config;
			this.setStateCSSClasses(this.el, cfg.inputFocusClass	, this._isFocused);
		},
		
		/**
		 * Appends or removes state-specific CSS classes
		 * 
		 * @method setStateCSSClasses
		 * @param element {HTMLElement} - HTML element or jQuery instance
		 * @param className {String} - Class name
		 * @param state {Bool} - True if you want to add class and False if remove
		 */
		setStateCSSClasses: function(element, className, state) {
			
			if(state) {
				// Appends CSS class
				$(element).addClass(className); 
			}
			else {
				$(element).removeClass(className);
			}
		},	
		
		/**
		 * Handles focus events on the elements.
		 *
		 * @method _onFocus
		 * @param event {HTMLEvent} The focus event.
		 * @protected
		 */		
		_onFocus : function(event) {
			this._isFocused = true;
			this.refreshCSSClasses();
		},
		
		/**
		 * Handles blur events on the elements.
		 *
		 * @method _onFocus
		 * @param event {HTMLEvent} The blur event.
		 * @protected
		 */	
		_onBlur : function(event) {
			this._isFocused = false;
			this.refreshCSSClasses();
		}
	}

	return TextField;

})();