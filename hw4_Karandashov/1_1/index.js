"USE STRICT";

var obj = {
    'единицы': 0,
    'десятки': 0,
    'сотни': 0,
};

function x(chislo) {
    obj.единицы = chislo % 10;
    obj.десятки = (parseInt(chislo / 10)) % 10;
    obj.сотни = parseInt(chislo / 100);
}

var chislo = +prompt('Введите число от 0 до 999');
if (chislo > 999) {
    console.log('Число больше 999!!!');
    console.log(obj)
} else if (chislo < 0) {
    console.log('Число меньше 0 !!!');
    console.log(obj)
} 
else {
    x(chislo);
    console.log(obj);
}
