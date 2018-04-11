var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;
var snake = [];
var direction = 'y-';
var gameIsRunning = false;
var score = 0;
var snake_timer;
var food_timer;
var scoreField;

window.onload = init;

//Инициализация
function init() {
    prepareGameField(); //отрисовка поля
    scoreField = document.getElementById('score-field');
    scoreField.innerHTML = score;

    //Вешаем обработчики на кнопки старт и новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    //Добавляем прослушиватель клавиатуры
    addEventListener('keydown', changeDirection);
}

//При нажатии на 'новая игра', у нас произойдет перезагрузка ресурсов из url
function refreshGame() {
    location.reload();
}


//при нажатии на 'Старт' запускается функция эта.
function startGame() {
    gameIsRunning = true;
    respawn(); //Располагаем змейку на игровом поле

    snake_timer = setInterval(move, SNAKE_SPEED); //запускаем движение змейки

    setTimeout(createFood, 500); //Создаем еду
    setInterval(createBlockage, 5000);
}


function move() {
    //Собираем классы головы змейки, чтобы узнать ее положение в табоице
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');
    var snake_coords = snake_head_classes[1].split('-');

    var coord_x = parseInt(snake_coords[2]);
    var coord_y = parseInt(snake_coords[1]);

    var new_unit; //Переменная для новой точки

    if (direction == 'y-') { //змейка идет вверх
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + "-" + coord_x)[0];
    } else if (direction == 'y+') { //змейка идет вниз
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + "-" + coord_x)[0];
    } else if (direction == 'x+') { //змейка движется вправо
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + "-" + (coord_x + 1))[0];

    } else if (direction == 'x-') { //змейка движется вправо
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + "-" + (coord_x - 1))[0];
    }

    //Проверяем, является ли новая ячейка частью змейки
    //Проверяем дошла ли змейка до границы
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);


        //если змейка не ела, то удаляется последняя её ячейка, а если поела, то не удаляется
        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0];

            var classes = removed.getAttribute('class').split(' ');

            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
        if (haveBlockage(new_unit)) {
            finishGame();
        }

    } else finishGame();


}

function finishGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('GAME_OVER score=' + score);
}

function isSnakeUnit(unit) {
    var check = false;
    if (snake.includes(unit)) {
        check = true;
    }

    return check
}

//проверка поела ли змейка
function haveFood(unit) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');

    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        scoreField.innerHTML = ++score;
    }

    return check;
}

//Создание еды
function createFood() {
    var foodCreated = false;

    while (!foodCreated) {
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_x + '-' + food_y)[0];

        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        //если тут нет змейки
        if (!food_cell_classes.includes('snake-unit')) {
            //ставим сюда еду
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

//Ф-ия для расположения змейки на игровом поле
function respawn() {
    //змейка - это массив элменетов
    //Стартовая длина длина - 2

    //Стартовые координаты из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    //Достаем ячейки из таблицы и добавляем класс unit, чтобы понять, где наша змейка.
    var snake_head = document.getElementsByClassName('cell-' + start_coord_x + '-' + start_coord_y)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_x - 1) + '-' + start_coord_y)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake = [];
    snake.push(snake_head);
    snake.push(snake_tail);
}

/*
 * Отрисовка игрового поля
 * Игровое поле- это таблица
 * */
function prepareGameField() {
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    //в цикле генерируем ячейки игровой таблицы
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_X; j++) {
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }

        game_table.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(game_table);
}

function changeDirection(e) {
    console.log(e);
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 38: //клавиша вверх нажата
            if (direction != 'y+') {
                direction = 'y-'
            }

            break;
        case 37: //клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            };
            break;
        case 39: //клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            };
            break;
        case 40: //клавиша вниз
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
    }
}

function createBlockage() {
    var blockCreated = false;
    while (!blockCreated) {
        var blockX = Math.floor(Math.random() * FIELD_SIZE_X);
        var blockY = Math.floor(Math.random() * FIELD_SIZE_Y);
        var blockCell = document.getElementsByClassName('cell-' + blockY + '-' + blockX)[0];
        var blockCellClasses = blockCell.getAttribute('class').split(' ');
        if (!blockCellClasses.includes('snake-unit')) {
            var classes = '';
            for (var i = 0; i < blockCellClasses.length; i++) {
                classes += blockCellClasses[i] + ' ';
            }
            blockCell.setAttribute('class', classes + 'block-unit');
            blockCreated = true;
        }
    }
}

function haveBlockage(unit) {
    var check = false;
    var unitClasses = unit.getAttribute('class').split(' ');
    if (unitClasses.includes('block-unit')) {
        check = true;
    }
    return check;
}
