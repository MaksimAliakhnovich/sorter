class Sorter {
  constructor() {
    this.mainArray = [];
    this.compareFunction;
    this.compareFunctionName = "NUMERIC_COMPARATOR";
  }

  add(element) {
    this.mainArray.push(element);
  }

  at(index) {
    return this.mainArray[index];
  }

  get length() {
    return this.mainArray.length;
  }

  toArray() {
    return this.mainArray;
  }

  sort(indices) {

    const NUMERIC_COMPARATOR = (left, right) => left - right; // компаратор для сравнения чисел
    let sortedTmpArray = []; // временный массив чисел для сортировки
    let sortedIndices = indices.sort(NUMERIC_COMPARATOR); // массив отсортированных индексов

    /* Во временный массив заносим элементы уже добавленные элементы
    с запрашиваемыми индексами*/
    for(let i = 0; i < sortedIndices.length; i++) {
      sortedTmpArray.push(this.at(sortedIndices[i]));
    }

    /* Выбор сортировки */
    switch (this.compareFunctionName) {
      case "NUMERIC_COMPARATOR":        
        sortedTmpArray.sort(NUMERIC_COMPARATOR);
        break;
      case this.compareFunctionName:
        sortedTmpArray.sort(this.compareFunction);
        break;
      default:        
        sortedTmpArray.sort(NUMERIC_COMPARATOR); // на всякий случай
    }  

    /* Замена не сортированных элементов в основном массиве отсортированными
    из временного массива */
    for(let n = 0; n < sortedIndices.length; n++) {
      this.mainArray.splice(sortedIndices[n], 1, sortedTmpArray[n]);
    }
  }

  setComparator(compareFunction) {
    this.compareFunction = compareFunction;
    this.compareFunctionName = compareFunction.name;
  }
}

module.exports = Sorter;
