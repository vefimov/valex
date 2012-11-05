/*
Copyright (c) 2012, Valex! Inc. All rights reserved.
Code licensed under the License:
--- here should be a link to license info
version: 1.0
*/

/**
 * define application namespace
 * VX is short name of VALEX
 */
if(typeof VX =="undefined" || !VX)
{
	var VX={};
}


/**
 * Provides a simple mechanism for setting up the prototype, constructor, 
 * and superclass properties for objects that are extending other objects.
 * 
 * @param child {Function} child class
 * @param parent {Function} parent (base) class
 */
VX.extend = function(child, parent) 
{ 
	var hasProp = {}.hasOwnProperty;
	
	for (var key in parent) 
	{ 
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
if(typeof VX.Form =="undefined" || !VX.Form)
{
	VX.Form = {};
}

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * TextField class for the VX Form widget.
 *
 * @namespace VX.Form
 * @class TextFields
 * @extends YAHOO.util.Element
 * @constructor
 * @param selector {String} container element for the input.
 * @param aColumnDefs {Object[]} Array of object literal Column definitions.
 */
VX.Form.TextFields = (function() {

	function TextField(selector, config) 
	{
		// default settings
		var defaults = {
			inputFocusClass: 'focus'
		}
		
		this.config = $.extend(defaults, config);
		// jQuery instance of input or textarea
		this.els = $(selector);
		this.init();
	}
	
	TextField.prototype = 
	{
		/**
		 * Flag to determine that the element got the focus
		 *
		 * @property _isFocused
		 * @type Bool
		 * @protected
		 */
		_isFocused : false,
	
		// Initialization
		init : function()
		{
			this.els.bind("focus.vx", $.proxy(this._onFocus, this))
				.bind("blur.vx", $.proxy(this._onFocus, this));
		},
		
		/**
		 * Handles focus events on the elements.
		 *
		 * @method _onFocus
		 * @param event {HTMLEvent} The focus event.
		 * @protected
		 */		
		_onFocus : function(event)
		{
			this._isFocused = true;
			this.els.addClass(this.config.inputFocusClass);
		},
		
		/**
		 * Handles blur events on the elements.
		 *
		 * @method _onFocus
		 * @param event {HTMLEvent} The blur event.
		 * @protected
		 */	
		_onBlur : function()
		{
			this._isFocused = false;
			this.els.removeClass(this.config.inputFocusClass);
		}
	}

	return TextField;

})();