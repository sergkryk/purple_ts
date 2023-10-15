// Не придимул ничего более подходящего под задачу, чем интерфейс с дженериком для значения
// Типизировать ключ не получается т.к. он в любом случае он должен быть или строкой или числом или символом
interface IInput<T> {
  [key: string]: T
}

function swapKeysAndValues(inputObj: IInput<number>): IInput<string> {
  return Object.entries(inputObj).reduce((acc, el) => {
    let [key, value] = el;
    Object.assign(acc, { [value]: key });
    return acc;
  }, {});
}
// если реализовывать с помощью Map то можно использовать дженерики т.к. ключом в Мар может быть любой тип
function swapKeysAndValuesInMap<T, U>(input: Map<T, U>): Map<U, T> {
  const res: Map<U,T>= new Map();
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
