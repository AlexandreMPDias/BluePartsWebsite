class InvisibleCheck{
    constructor(){
        this.side = false;
        this.loc = false;
        this.name = false;
        this.status = false;
    }

    reset(){
        this.side = false;
        this.loc = false;
        this.name = false;
        this.status = false;
    }

    makingInvisible(field){
        if(field == 'status'){
            this.status = true;
            return;
        }
        if(field == 'location'){
            this.loc  = true;
            return;
        }
        if(field == 'name'){
            this.name  = true;
            return;
        }
        if(field == 'side'){
            this.side  = true;
            return;
        } else{
            throw new Error('invalid field input');
        }
    }

    isInvisible(field){
        if(field == 'status'){
            return this.status;
        }
        if(field == 'location'){
            return this.loc;
        }
        if(field == 'name'){
            return this.name;
        }
        if(field == 'side'){
            return this.side;
        } else{
            throw new Error('invalid field input: ' + field);
        }
    }

    isInvisibleForOthers(field){
        let ar = ['status','location','name','side'];
        let others = [];
        for(let i = 0; i < ar.length; i++){
            if(field != ar[i]){
                others.push(ar[i]);
            }
        }
        return ( this.isInvisible(others[0]) || this.isInvisible(others[1]) || this.isInvisible(others[2]) );
    }
}

class Wrap{
    constructor(first, second, inv){
        this.filter = first;
        this.field = second;
        this.invClass = inv;
    }
}

class Filter {
    constructor() {
      let S = document.querySelector.bind(document);
      this._side = new Wrap(S('#filter_side'), 'side');
      this._location = new Wrap(S('#filter_location'), 'location');
      this._name = new Wrap(S('#filter_name'), 'name');
      this._status = new Wrap(S('#filter_status'), 'status');
      this._invCheck = [];
      for(let i = 0; i < pTable.parts.length; i++){
          this._invCheck.push(new InvisibleCheck());
      }
    }

    _updateTable(wrap){
        if(this._areAllFieldsClear()){
            console.log("All Fields are Clear");
            for(let i = 0; i < pTable.parts.length; i++){
                let part = new Part(pTable.parts[i]);
                part.unhide();
                //this._invCheck[i].reset();
            }
        }
        else{
            /*
            for(let i = 0; i < pTable.parts.length; i++){
                let part = new Part(pTable.parts[i]);
                let regExp = new RegExp(wrap.filter.value, 'i');
                if(!regExp.test(part.textContent(wrap.field))){
                    part.hide();
                    this._invCheck[i].makingInvisible(wrap.field);
                }
                else{
                    if(this._invCheck[i].isInvisibleForOthers(wrap.field)){
                        part.unhide();
                    }
                }
            }*/
            
            console.log("Not all Fields are Clear");
            for(let i = 0; i < pTable.parts.length; i++){
                let part = new Part(pTable.parts[i]);
                let b = this._compareAll(part);
                console.log(b);
                if(b){
                    part.unhide();
                }
                else{
                    part.hide();
                }
            }
            
        }
    }

    _compareOne(wrap, part){
        if(wrap.filter.value.length > 0){
            let reg = new RegExp(wrap.field.value, 'i');
            //console.log(part.textContent(wrap.field) + " -- " + wrap.filter.value);
            let b = reg.test(part.textContent(wrap.field));
            return b;
        } else {
            return false;
        }
    }

    _compareAll(part){
        if(this._compareOne(this._side, part)){
            return true;
        }
        if(this._compareOne(this._location, part)){
            return true;
        }
        if(this._compareOne(this._name, part)){
            return true;
        }
        if(this._compareOne(this._status, part)){
            return true;
        }
        console.log('ret false');
        return false;
    }
  
    _addEventListener(wrap) {
        let dis = this;
        wrap.filter.addEventListener("input", function () {
            console.log('updating table');
            dis._updateTable(wrap);
        });
    }

    _addAllEvents(){
        this._addEventListener(this._side);
        this._addEventListener(this._location);
        this._addEventListener(this._name);
        this._addEventListener(this._status);
    }

    _isClear(wrap){
        if(wrap.filter.value.length == 0){
            return true;
        }
        else{
            return false;
        }
    }

    _areAllFieldsClear(){
        return (this._isClear(this._side) && this._isClear(this._location) && this._isClear(this._name) && this._isClear(this._status));
    }

    _clearFields(){
        this._side.value = "";
        this._location.value = "";
        this._name.value = "";
        this._status.value = "";
    }
  }

  let filter = new Filter();
  filter._addAllEvents();

  let filterButton = document.querySelector('#clear-filter');
  filterButton.addEventListener('click', function(event){
      event.preventDefault();
      //filter._clearFields();

  });
  
  