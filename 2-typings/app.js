"use strict";
var makeOrdinal = require("./makeOrdinal");
var isFinite = require("./isFinite");
var isSafeNumber = require("./isSafeNumber");
var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000; //         1.000.000.000 (9)
var ONE_TRILLION = 1000000000000; //     1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992; // 9.007.199.254.740.992 (15)
var LessTwenty;
(function (LessTwenty) {
    LessTwenty["ZERO"] = "zero";
    LessTwenty["ONE"] = "one";
    LessTwenty["TWO"] = "two";
    LessTwenty["THREE"] = "three";
    LessTwenty["FOUR"] = "four";
    LessTwenty["FIVE"] = "five";
    LessTwenty["SIX"] = "six";
    LessTwenty["SEVEN"] = "seven";
    LessTwenty["EIGHT"] = "eight";
    LessTwenty["NINE"] = "nine";
    LessTwenty["TEN"] = "ten";
    LessTwenty["ELEVEN"] = "eleven";
    LessTwenty["TWELVE"] = "twelve";
    LessTwenty["THIRTEEN"] = "thirteen";
    LessTwenty["FOURTEEN"] = "fourteen";
    LessTwenty["FIFTEEN"] = "fifteen";
    LessTwenty["SIXTEEN"] = "sixteen";
    LessTwenty["SEVENTEEN"] = "seventeen";
    LessTwenty["EIGHTTEEN"] = "eighteen";
    LessTwenty["NINETEEN"] = "nineteen";
})(LessTwenty || (LessTwenty = {}));
var Tenths;
(function (Tenths) {
    Tenths["ZERO"] = "zero";
    Tenths["TEN"] = "ten";
    Tenths["TWENTY"] = "twenty";
    Tenths["THIRTY"] = "thirty";
    Tenths["FORTY"] = "forty";
    Tenths["FIFTY"] = "fifty";
    Tenths["SIXTY"] = "sixty";
    Tenths["SEVENTY"] = "seventy";
    Tenths["EIGHTY"] = "eighty";
    Tenths["NINETY"] = "ninety";
})(Tenths || (Tenths = {}));
var LESS_THAN_TWENTY = [...Object.values(LessTwenty)];
var TENTHS_LESS_THAN_HUNDRED = [...Object.values(Tenths)];
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    var words;
    var num = parseInt(number, 10);
    if (!isFinite(num)) {
        throw new TypeError("Not a finite number: " + number + " (" + typeof number + ")");
    }
    if (!isSafeNumber(num)) {
        throw new RangeError("Input is not a safe number, it’s either too large or too small.");
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, words = []) {
    var remainder, word, words = arguments[1];
    // We’re done
    if (number === 0) {
        return !words ? "zero" : words.join(" ").replace(/,$/, "");
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push("minus");
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += "-" + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + " hundred";
    }
    else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + " thousand,";
    }
    else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = generateWords(Math.floor(number / ONE_MILLION)) + " million,";
    }
    else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = generateWords(Math.floor(number / ONE_BILLION)) + " billion,";
    }
    else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = generateWords(Math.floor(number / ONE_TRILLION)) + " trillion,";
    }
    else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word =
            generateWords(Math.floor(number / ONE_QUADRILLION)) + " quadrillion,";
    }
    else {
        // добавил это условие т.к. видимо в коде есть ошибка и не получается строго типизировать word и remainder, ts видит варианты когда одно из этих значений undefined
        throw new Error();
    }
    words.push(word);
    return generateWords(remainder, words);
}
module.exports = toWords;
