class Table{

    constructor(){
        this._table = document.querySelector('#part-table');
        this._parts = this._table.querySelectorAll('.part');
    }

    _firstPaint(){
        let p = this._parts;
        p.forEach(function(tr){
            let state = tr.querySelector('.state');
            if(state.textContent === 'Printed') {
                tr.classList.add('printed');
            } else {
                tr.classList.add('not-printed');
            }
        });
    }

    _addEventListener(){
        this._table.addEventListener("click", function (event) {
            event.preventDefault();
            if(event.target.parentNode.id != "part-table" && event.target.id != "part-table"){
                let part = new Part(event.target.parentNode);
                part.changeState();
                part.paint();
                chHist.add(part.tr);
            }
        });
    }

    get parts(){
        return this._parts;
    }

    get table(){
        return this._table;
    }
}

var chHist = new ChangesHistory(10);
var pTable = new Table();
pTable._firstPaint();
pTable._addEventListener();