import React from 'react';

class NumberService {
  numberSeparator(value) {
    var convertedNum;
    if (value == Math.floor(value)) {
    } else {
      convertedNum = Math.round(value);
    }
    var x = convertedNum ? convertedNum : value;
    x = x?.toString();
    var lastThree = x?.substring(x.length - 3);
    var otherNumbers = x?.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    var res = otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return res;
  }
}
const NumberSeparatorInstance = new NumberService();
export default NumberSeparatorInstance;
