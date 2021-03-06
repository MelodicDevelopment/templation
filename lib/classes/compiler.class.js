'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Compiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** import dependencies */


var _observer2 = require('./observer.class');

var _functions = require('../functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Compiler
 * Compile the given template and push into the container
 * @param {string | element} container The container for the compiled html
 * @param {string | element} template The template to use for compilation
 * @param {object} data The object used for binding data and methods
 */
var Compiler = function () {
	function Compiler(container, template, data) {
		var _this = this;

		_classCallCheck(this, Compiler);

		/** check container for string id, or element */
		if (typeof container === 'string') container = document.getElementById(container);

		/** check template for string id, or element */
		if (typeof template === 'string') template = document.getElementById(template);

		/** check the template for one and only one child */
		if (template.nodeName !== 'TEMPLATE') throw 'The template should be a template element (<template>)';
		if (template.content.children.length !== 1) throw 'The template must contain one root element.';

		/** public properties */

		/** @public {element} The container element */
		this.container = container;

		/** @public {element} The template element */
		this.template = template;

		/** @public {object} The data object that is used for binding data values and methods */
		this.data = data;

		/** private properties */

		/** @private {boolean} A boolean indicating whether compilation has been initiated once */
		var _initd = false;
		this.setInitd = function (initd) {
			_initd = initd;
			return _this;
		};
		this.initd = function () {
			return _initd;
		};

		/** @private {Observer} An instance of Observer that is watching data for us */
		var _observer = new _observer2.Observer(this.data, this.render, this);
		this.getObserver = function () {
			return _observer;
		};

		/** @private {DirectiveContainer} The DirectiveContainer object */
		var _directiveContainer = null;
		this.setDirectiveContainer = function (directiveContainer) {
			_directiveContainer = directiveContainer;
		};
		this.getDirectiveContainer = function () {
			return _directiveContainer;
		};

		/** empty the container */
		(0, _functions.emptyElement)(this.container);
	}

	/** public methods */

	/** render out the processed template */


	_createClass(Compiler, [{
		key: 'render',
		value: function render() {
			/** get the template and inner html */
			var tempDOM = (0, _functions.createTemporaryDOM)(this.template, this.data, this.getDirectiveContainer().getDirectives());

			/** set the app */
			(0, _functions.updateDOM)(this.container, (0, _functions.virtualizeDOM)(tempDOM.content.children[0]), this.initd() ? (0, _functions.virtualizeDOM)(this.container.children[0]) : undefined);

			/** cycle through post directives */
			(0, _functions.parseDirectives)(this.getDirectiveContainer().getDirectives().filter(function (dir) {
				return dir.isPost();
			}), this.container, this.data);

			/** set initd to true */
			this.setInitd(true);
		}
	}]);

	return Compiler;
}();

/** export Compiler */


exports.Compiler = Compiler;
//# sourceMappingURL=compiler.class.js.map