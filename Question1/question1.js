function findResult(string) {
  for (var i = 0; i < string.length; i++) {
    var c = string.charAt(i);
    if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
      return c;
    }
  }
  return null;
}

//call the function with some string, here the string passed just for an instance, you can pass any string
findResult('abbAcadAMam');