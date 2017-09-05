class Table extends VisiblePanel{

    constructor(){
        super(document.querySelector('#parts'),'h');
        this.printedStringValue = 'Printed';
        this.notprintedStringValue = 'NOT YET PRINTED';
        this._table = document.querySelector('#part-table');
    }

    _firstPaint(){
        for(let i = 0, tr; tr = this._table.rows[i]; i++){
            let state = tr.querySelector('.state');
            if(state.textContent === 'Printed') {
                tr.classList.add('printed');
            } else {
                tr.classList.add('not-printed');
            }
        };
    }

    getPartsFromDB(){
        firebase.database().ref("/").on("child_added", data => {
            if(data.val().name != undefined){
                //let part = new PartFactoryFromDB(data.val()).generateTr();
                let part = new PartFactoryFromDB(data.val()).genAndAppend(this._table);
                this._table.appendChild(part);
                this.updateSize(this._table.rows.length * 29);
                /*console.log(part.offsetHeight);
                console.log(this._table.rows.length);
                let state = part.querySelector('.state');
                if(state.textContent === 'Printed') {
                    part.classList.add('printed');
                } else {
                    part.classList.add('not-printed');
                }*/
            }
        });
    }

    listParts(){
        this._parts.forEach(item => console.log(item));
    }
    
    _addEventListener(){
        this._table.addEventListener("click", event => {
            this.updatePanel(() => {
                event.preventDefault();
                if(event.target.parentNode.id != "part-table" && event.target.id != "part-table"){
                    let part = new Part(event.target.parentNode);
                    part.changeState();
                    part.paint();
                    chHist.add(part.tr);
                }
            });
        });
    }

    get _parts(){
        return this._table.querySelectorAll('.part');
    }

    get parts(){
        return this._parts;
    }

    get table(){
        return this._table;
    }
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

var DB_DELAY = 5000;
var chHist = new ChangesHistory(10);
var pTable = new Table();
pTable.getPartsFromDB();
pTable._addEventListener()
pTable._firstPaint();
