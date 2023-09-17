// var z = 0
// var cur = (x) => {
//    return function inner(y) {
//     if (y === undefined) {
//       return x;
//     }
//    x = x * y;
//    z = x
//    return inner
//   }
// };

// var x = cur(2)(4)(2)
// console.log(z)
// console.log(x());

let calc = () => {
  return {
    sum: (x, y) => x + y,
    sub: (x, y) => x - y,
  };
};
var cal = calc();
console.log(cal.sum(3, 10));
console.log(cal.sub(3, 10));
