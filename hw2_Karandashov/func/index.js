"use strict";

function plus(x, y) {
    var result = x + y;
    return (result);
}

function minus(x, y) {
    var result = x - y;
    return (result);
}

function multiply(x, y) {
    var result = x * y;
    return (result);
}

function divide(x, y) {
    var result = x / y;
    return (result);
}
var z = plus(10, 5);
alert(z);
z = minus(10, 5);
alert(z);
z = multiply(10, 5);
alert(z);
z = divide(10, 5);
alert(z);

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case plus:
            plus = plus(arg1, arg2);
            return (plus);
            break;
        case minus:
            minus = minus(arg1, arg2);
            return (minus);
            break;
        case multiply:
            multiply = multiply(arg1, arg2);
            return (multiply);
            break;
        case divide:
            divide = divide(arg1, arg2);
            return (divide);
            break;
    }
}

var z = mathOperation(5, 10, plus);
alert(z);
var z = mathOperation(5, 10, minus);
alert(z);
var z = mathOperation(5, 10, multiply);
alert(z);
var z = mathOperation(5, 10, divide);
alert(z);
