/*
    see test-spec for usecases
*/

function filterAwayNonDigits(str) {
	/* filter away all but 0-9 */
	const nonDigitStr = ((str && str.replace) ? str.replace(/[^(0-9)]/g, '') : '');
	return nonDigitStr;
}

function removeSpace(str) {
	// TODO add unit test to confirm functionality!!
	// remove one or more spaces from beginning and end
	// const trailspace = new RegExp(/^[\s]+|[\s]+$/g);
	const trailspace = new RegExp(/[\s]/g);
	return ((str && str.replace) ? str.replace(trailspace, '') : '');
}

// function stringWithDotsToDecimal(str) {
// 	/* the string is split on decimalpoint,
// 	and its two first values are filtered all
// 	 but digits. This acts as a conversion
// 	 from some input to a two decimal number
// 	 in string format, '0.00'*/
// 	const arr = (str && str.split) && str.split('.');
// 	let first = (arr && arr[0]);
// 	let second = (arr && arr[1]);
// 	first = removeSpace(first);
// 	second = removeSpace(second);
// 	first = filterAwayNonDigits(first);
// 	second = filterAwayNonDigits(second);
// 	first = (first || '0');
// 	second = (second || '00');
// 	second = ((second.length < 2) ? `${second}0` : second);
// 	second = ((second.length > 2) ? `${second[0]}${second[1]}` : second);
// 	const asdecimal = `${first}.${second}`;
// 	return asdecimal;
// }

function hasDecimalPoint(t) {
	const str = (((t || t === 0) && t.toString) ? t.toString() : null);
	return ((str && str.match) ? str.match(/[.]+/g) : false);
}

function restrictMaxLength(t) {
	// '234' gives '23'
	// '2' gives 2
	// null gives ''
	const str = (((t || t === 0) && t.toString) ? t.toString() : null);
	const first = ((str && str[0]) ? str[0] : '');
	const second = ((str && str[1]) ? str[1] : '');
	const twoDigitStr = (`${first}${second}`);
	return twoDigitStr;
}

function toDigitsAndDecimalPoint(t) {
	// filter away all but a decimal number from a string
	// append the period if it was input
	// if '23.' is input, return 23.
	// if '23' is input, return 23
	const str = (((t || t === 0) && t.toString) ? t.toString() : null);
	const containsDecimal = hasDecimalPoint(t);
	const arr = (str && str.split) && str.split('.');
	const first = (arr && arr[0]);
	const second = (arr && arr[1]);
	const nospaceFirst = removeSpace(first);
	const nospaceSecond = removeSpace(second);
	const onlyDigitsFirst = filterAwayNonDigits(nospaceFirst);
	const onlyDigitsSecond = filterAwayNonDigits(nospaceSecond);
	const secondOnlyTwo = restrictMaxLength(onlyDigitsSecond);
	let noLeadingZeros = (parseInt(onlyDigitsFirst, 10) || 0);
	noLeadingZeros = (noLeadingZeros.toString ? noLeadingZeros.toString() : '0');
	const asdecimal = (containsDecimal ? `${noLeadingZeros}.${secondOnlyTwo}` : `${noLeadingZeros}`);
	return asdecimal;
}

export default {
	keepDigits(t) {
		return toDigitsAndDecimalPoint(t);
	},
	__testRemoveSpace(str) {
		return removeSpace(str);
	},
	__testFilterAwayNonDigits(str) {
		return filterAwayNonDigits(str);
	},
	__testRestrictMaxLength(str) {
		return restrictMaxLength(str);
	},
	__testHasDecimalPoint(str) {
		return hasDecimalPoint(str);
	}
};

// function validAmount() {
// 	const theInput = core.trailspace(elements.inputamount.value || null);
// 	return ((validateCreditcard.amount(theInput) && !containsWord(elements.inputamount.className, errorClass)) ? theInput : null);
// }
