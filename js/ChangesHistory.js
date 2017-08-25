class ChangesHistory{

    constructor(size){
        this._table = document.querySelector('#history-table');
        this._body = this._table.querySelector('#history');
        this._queue = [];
        this._showSize = size;
        this._maxSize = size * 100;
        Object.freeze(this);
    }

    lastChange(){
        if(this._queue.length > 0){
            return this._queue[this._queue.length - 1];
        }
        else{
            throw new Error("Empty History");
        }
    }

    undo(){
        try{
            let chg = this.lastChange();
            if(this._queue.length > 0){
                this._queue.pop();
                this._deleteFirstRow();
            }
            this._updatePosition();
            return chg;
        } catch (error){
            alert("Can't undo with Empty History");
        }
    }

    hasChanges(){
        if(this._queue.length > 0){
            return true;
        }
        return false;
    }


    add(row){
        this._queue.push(row);
        if(this._queue.length >= this._maxSize){
            this._queue.shift();
        }
        this._createTr(row);
    }

    _createTr(lastchg){
        if(this._queue.length >= this._showSize) {
            this._deleteLastRow();
        }
        let part = new Part(lastchg);

        let tr = this._body.insertRow(0);
        let td_pos = tr.insertCell(0);
        let td_part = tr.insertCell(1);

        tr.classList.add('history_entry');
        td_pos.classList.add('position');
        td_part.classList.add('change');

        td_part.textContent = part.id ;
        td_pos.textContent = this._queue.length;
        this._updatePosition();
    }

    _deleteLastRow(){
        this._table.deleteRow(this._table.getElementsByTagName("tr").length - 1);
    }

    _deleteFirstRow(){
        this._table.deleteRow(1);
    }

    _updatePosition(){
        let array = this._table.querySelectorAll('.history_entry');
        for(var i = 0; i < array.length; i++){
            let elem = array[i];
            let pos = elem.querySelector('.position');
            pos.textContent = i + 1;
        }
    }
}