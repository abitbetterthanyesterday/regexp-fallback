import test from 'ava'
import regexpOrStringFallback from './index.js'

const invalidRegexScenarios = [
	'([a-z', // Missing closing bracket in character class
	'(abc', // Missing closing parenthesis in a group
	'a{2,1}', // Range minimum is greater than maximum
	'(abc|def', // Missing closing parenthesis in a group
	'a**b', // Double asterisk is not allowed
	'[a-z', // Missing closing bracket in character class
	'abc|def)', // Missing opening parenthesis in a group
	'a\\', // Unescaped backslash at the end
	'.*[a-z', // Missing closing bracket in character class
	'(abc|def|ghi))', // Extra closing parenthesis
]

test('invalid scenarios', (t) => {
	for (const invalidRegex of invalidRegexScenarios) {
		t.is(regexpOrStringFallback(invalidRegex), invalidRegex)
	}
})

const validRegexScenarios = [
	'/^\\d{4}$/', // Matches a 4-digit number.
	'/^[A-Z][a-z]+$/', // Matches a capitalized word.
	'/\\d{3}-\\d{2}-\\d{4}/', // Matches a social security number (SSN).
	'/\\b\\d{5}\\b/', // Matches a 5-digit ZIP code.
	'/^[A-Fa-f0-9]{6}$/', // Matches a hexadecimal color code.
	'/^\\d+(\\.\\d+)?$/', // Matches a decimal number.
	'/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$/', // Matches an email address.
	'/\\bhttps?:\\/\\/\\S+/', // Matches a URL starting with http:// or https://.
	'/^([01]?[0-9]|2[0-3]):[0-5][0-9]/', // Matches a 24-hour time format (HH:MM).
	'/(19|20)\\d{2}/', // Matches a 4-digit year between 1900 and 2099.
	'/^([0-9]{1,3}\\.){3}[0-9]{1,3}/', // Matches an IPv4 address.
	'/^[A-Z]{3}$/', // Matches an all-uppercase 3-letter abbreviation.
	'/^[A-Za-z\\s]+$/', // Matches a string containing only letters and spaces.
	'/\\b\\d{2}/\\d{2}/\\d{4}\\b/', // Matches a date in MM/DD/YYYY format.
	'/^[A-Za-z0-9]+$/', // Matches an alphanumeric string.
	'/^[A-Z]\\d[A-Z]\\s?\\d[A-Z]\\d$/', // Matches a Canadian postal code.
	'/^(\\d{1,3}\\.){3}\\d{1,3}/\\d{1,2}$/', // Matches an IP address with a subnet mask.
	'/^(0[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/', // Matches a 12-hour time format with AM/PM.
	'/^#[0-9A-Fa-f]{3,6}$/', // Matches a CSS color code in both short and long forms.
	'/^(?!.*\\.\\.|.*\\/\\/)[^\\/\\.\0]+\\/[^\\/\\0]+$/', // Matches a valid URL path without double dots or double slashes.
]

test('valid scenarios', (t) => {
	for (const validRegexp of validRegexScenarios) {
		t.deepEqual(regexpOrStringFallback(validRegexp), new RegExp(validRegexp))
	}
})
