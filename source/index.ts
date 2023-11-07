/** A simple function that returns a RegExp object if the input is a valid regular expression, or the input itself if it is not.
 *
 * @param input The input to be tested.
 * @returns A RegExp object if the input is a valid regular expression, or the input itself if it is not.
 * @example
 * ```ts
 * import regexpOrStringFallback from 'regexp-or-string-fallback'
 *
 * // A valid regular expression
 * regexpOrStringFallback('abc') // /abc/
 * // An regular expression with a syntax error
 * regexpOrStringFallback("[a-z") // "[a-z"
 * ```
 *
 * */
function regexpOrStringFallback(input: RegExp | string) {
	if (input instanceof RegExp) {
		return input
	} else {
		try {
			return new RegExp(input)
		} catch (e) {
			return input
		}
	}
}

export default regexpOrStringFallback
