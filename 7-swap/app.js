"use strict";
function swapKeysAndValues(inputObj) {
    return Object.entries(inputObj).reduce((acc, el) => {
        let [key, value] = el;
        Object.assign(acc, { [value]: key });
        return acc;
    }, {});
}
// если реализовывать с помощью Map то можно использовать дженерики т.к. ключом в Мар может быть любой тип
function swapKeysAndValuesInMap(input) {
    const res = new Map();
    for (let [key, value] of input) {
        res.set(value, key);
    }
    return res;
}
const test = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};
const objSwapped = swapKeysAndValues(test);
console.log(objSwapped);
const mapSwapped = swapKeysAndValuesInMap(new Map(Object.entries(test)));
console.log(mapSwapped);
