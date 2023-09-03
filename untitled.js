var longestCommonPrefix = function (strs) {
  var stri = strs.sort((a, b) => a.length - b.length);

  var arr = [...stri[0]];
  var arr1 = new Array(arr.length);
  for (var i = 1; i < strs.length; i++) {
    for (var j in arr) {
      if (arr[j] == strs[i][j]) {
        arr1[j] = strs[i][j];
      } else {
        arr1.fill(0, j);
      }
    }
  }
  var str = ""
  if(arr1.length == 0){
    return '""'
  }
  for (i of arr1) {
    if (i != 0) {
      str += i
    }
  }
  console.log(str)
};

var strs = [""];
const arr = longestCommonPrefix(strs);
console.log(arr)
