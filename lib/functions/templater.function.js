'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.templater = undefined;

var _using = require('./using.function');

/** do some simple template parsing/value replacing */
function templater(template, data) {
	/** get the html */
	var html = template.innerHTML;

	/** set the pattern for replacement */
	var re = /{{\s?([\w\W]*?)\s?}}/gmi;

	/** cycle over matches */
	var match = void 0;
	while ((match = re.exec(html)) !== null) {
		/** catch exceptions */
		try {
			/** replace the values in the html and reset the lastIndex of the regex */
			html = html.replace(match[0], (0, _using.using)(data, match[1]));
			re.lastIndex = 0;
		} catch (ex) {
			console.log(ex);
		}
	}

	/** reset the innerHTML */
	template.innerHTML = html;
}

/** export function */
/** import functions */
exports.templater = templater;
//# sourceMappingURL=templater.function.js.map