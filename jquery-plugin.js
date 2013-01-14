/*
 * On the head set the plugin's name, version, author details and license
 * for example, for example:
 *
 * ------------------------------------------------------------------------
 * 
 * jquery-plugin.js Version 0.1
 * jQuery Plugin Boilerplate code helps creating your custom jQuery plugins.
 *  
 * Licensed under MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (c) 2013 Antonio Santiago
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 */
(function($, window, document, undefined) {

    /**
     * Store the plugin name in a variable. It helps you if later decide to 
     * change the plugin's name
     * @type {String}
     */
    var pluginName = 'jqueryPlugin';
 
    /**
     * The plugin constructor
     * @param {DOM Element} element The DOM element where plugin is applied
     * @param {Object} options Options passed to the constructor
     */
    function Plugin(element, options) {

        // Store a reference to the source element
        this.el = element;

        // Store a jQuery reference  to the source element
        this.$el = $(element);

        // Set the instance options extending the plugin defaults and
        // the options passed by the user
        this.options = $.extend({}, $.fn[pluginName].defaults, options);

        // Initialize the plugin instance
        this.init();
    }

    /**
     * Set up your Plugin protptype with desired methods.
     * It is a good practice to implement 'init' and 'destroy' methods.
     */
    Plugin.prototype = {
        
        /**
         * Initialize the plugin instance.
         * Set any other attribtes, store any other element reference, register 
         * listeners, etc
         *
         * When bind listerners remember to name tag it with your plugin's name.
         * Elements can have more than one listener attached to the same event
         * so you need to tag it to unbind the appropriate listener on destroy:
         * 
         * @example
         * this.$someSubElement.on('click.' + pluginName, function() {
         *      // Do something
         * });
         *
         
         */
        init: function() {

            console.log("init");
            console.log(this);

            this.somePublicMethod();


        },

        /**
         * The 'destroy' method is were you free the resources used by your plugin:
         * references, unregister listeners, etc.
         *
         * Remember to unbind for your event:
         *
         * @example
         * this.$someSubElement.off('.' + pluginName);
         *
         * Above example will remove any listener from your plugin for on the given
         * element.
         */
        destroy: function() {

            // Remove any attached data from your plugin
            this.$el.removeData();
        },

        /**
         * Write public methods within the plugin's prototype. They can 
         * be called with:
         *
         * @example
         * $('#element').jqueryPlugin('somePublicMethod','Arguments', 'Here', 1001);
         *  
         * @param  {[type]} foo [some parameter]
         * @param  {[type]} bar [some other parameter]
         * @return {[type]}
         */
        somePublicMethod: function(foo, bar) {
            console.log("somePublicMethod");
            console.log(this);

            // This is a call to a pseudo private method
            this._pseudoPrivateMethod();

            // This is a call to a real private method. You need to use 'call' or 'apply'
            privateMethod.call(this);

            privateMethod();
        },

        /**
         * You can use the name convention functions started with underscore are
         * private. Really calls to functions starting with underscore are 
         * filtered, for example:
         * 
         *  @example
         *  $('#element').jqueryPlugin('_pseudoPrivateMethod');  // Will not work
         */
        _pseudoPrivateMethod: function() {
            console.log("_pseudoPrivateMethod");
            console.log(this);
        }
    };

    /**
     * This is a real private method. A plugin instance has access to it
     * @return {[type]}
     */
    var privateMethod = function() {
        console.log("privateMethod");
        console.log(this);
    };

    //
    // Plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (whose name doesn't start with an underscore) to be 
    // called via the jQuery plugin:
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    //

    /**
     * [ description]
     * @param  {[type]} options [description]
     * @return {[type]}
     */
    $.fn[pluginName] = function(options) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            // Create a plugin instance for each selected element.
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            // Call a pluguin method for each selected element.
            if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
                // If the user does not pass any arguments and the method allows to
                // work as a getter then break the chainability
                var instance = $.data(this[0], 'plugin_' + pluginName);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                // Invoke the speficied method on each selected element
                return this.each(function() {
                    var instance = $.data(this, 'plugin_' + pluginName);
                    if (instance instanceof Plugin && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

    //
    // Names of the pluguin methods that can act as a getter method.
    //
    $.fn[pluginName].getters = ['tags'];

    //
    // Default options
    //
    $.fn[pluginName].defaults = {
        fieldSeparator: ",",
        readOnly: false,
        // Callback invoked when user calls the 'tags' method
        onTagsAdded: function() {
        },
        // Callback invoked when user calls the 'remove' method
        onTagsRemoved: function() {
        },
        // Callback invoked when user calls the 'clear' method. 
        // Note: Internally the 'clear' method uses the 'remove'.
        onClear: function() {
        },
        // Callback invoked when the user click a tag label
        onClick: function() {
        }
    };

})(jQuery, window, document);