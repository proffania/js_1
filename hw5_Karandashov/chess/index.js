var chessTable = document.createElement('div');
chessTable.className = "table";
document.body.appendChild(chessTable);

function ch() {
    var m = [],
        lets = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
        blackFigs = ['&#9823;', '&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;', ''],
        whiteFigs = ['&#9817;', '&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;', ''];
    for (var i = 0; i < 10; i++) {
        m[i] = [];
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell' + i + j;
            cell.classList.add('cells');
            m[i][j] = cell;
            if ((i > 0 && i < 9 && (i % 2) && j > 0 && j < 9 && (j % 2) == 0) || (i > 0 && i < 9 && (i % 2) == 0 && j > 0 && j < 9 && (j % 2))) {
                cell.classList.add('dark');
            } else if ((j == 0 && i > 0 && i < 9) || (j == 9 && i > 0 && i < 9)) {
                cell.innerHTML = (9-i);
            } // else if ((i == 0 && j > 0 && j < 9) || (i == 9 && j > 0 && j < 9)) {
            //                cell.innerHTML = lets[j]
            //            }
            //            if (i == 1 && j > 0 && j < 9) {
            //                cell.innerHTML = lets[j]
            //            }
            if (j > 0 && j < 9) {
                switch (i) {
                    case 0:
                        cell.innerHTML = lets[j];
                        break;
                    case 1:
                        cell.innerHTML = blackFigs[j];
                        break;
                    case 2:
                        cell.innerHTML = blackFigs[0];
                        break;
                    case 7:
                        cell.innerHTML = whiteFigs[0];
                        break;
                    case 8:
                        cell.innerHTML = whiteFigs[j];
                        break;
                    case 9:
                        cell.innerHTML = lets[j];
                        break;
                }
            }
            chessTable.appendChild(cell)
        }
    }
}
ch();
