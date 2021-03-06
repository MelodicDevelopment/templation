'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.crIfDirective = undefined;

var _directive = require('../classes/directive.class');

var _functions = require('../functions');

/** create the directive */
/** import dependencies */
var crIfDirective = new _directive.Directive('crIf', ifCheck);

/** export the directive */
exports.crIfDirective = crIfDirective;

/** define the directive parser function */

function ifCheck(details, ifElement, data) {
	/** evaluate the expression */
	if ((0, _functions.using)(data, details.value) === false) {
		ifElement.parentNode.removeChild(ifElement);
	}
}
//# sourceMappingURL=crif.directive.js.map