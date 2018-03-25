"use strict"
var a = parseInt(prompt("Введите число а"));
var b = parseInt(prompt("Введите число b"));
if (a >= 0 && b >= 0) {
    alert(a - b);
} else if (a < 0 && b < 0){
    alert(a * b);
} else
    alert(a+b);