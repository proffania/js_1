"use strict";
var i = 0;
while (i <= 100) {
    var count = 0;
    var j = 0;
    while (j < i) {
        var x = i % j;
        j++;
        if (x > 0)
            count++;
    }
    if (count == (i - 2))
        console.log(i)
    i++;
}
