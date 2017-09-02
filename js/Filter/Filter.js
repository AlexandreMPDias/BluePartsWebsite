class Pair{
    constructor(first){
        this.first = first;
        this.second = new SynchronizedFilter(this.first);
    }
    
    get key(){
        return this.first.id;
    }
}

class FilterMap extends Map{
    constructor(){
        super();
    }
    
    set(part){
        if(this.has(part.id)){
            throw new Error('Key already inside the Map - [' + part.id + ']');
        }
        super.set(part.id,new Pair(part));
    }
}

class Filter {
    constructor() {
        this._map = new FilterMap();
    }
    
    _populateMap(){
        pTable.parts.forEach(item => this._map.set(new Part(item)));
    }
    
    updateTable(target){
        this._map.forEach(entry => {
            let parent = target.parentNode.parentNode.id;
            if(parent == 'filter_side_tr'){
                entry.second.updateField('side');
            } else if(parent == 'filter_status_tr'){
                entry.second.updateField('status');
            } else if(parent == 'filter_location_tr'){
                entry.second.updateField('location');
            } else if(parent == 'filter_name_tr'){
                entry.second.updateField('name');
            } else {
                return;
            }
            if(entry.second.areAllFieldsVisible()){
                entry.first.tr.classList.remove('invisible');
            }
            else{
                if(!entry.first.tr.classList.contains('invisible')){
                    entry.first.tr.classList.add('invisible');
                }
            }
        });
    }
    
    resetTable(){
        this._map.forEach(entry => {
            entry.second = new SynchronizedFilter(entry.first);
            entry.first.tr.classList.remove('invisible');
        })
    }
}

let filter = new Filter();
let filterTable = document.querySelector('#filter-table');
filter._populateMap();
filterTable.addEventListener('click', event => filter.updateTable(event.target));
document.getElementById('filter_location').addEventListener('input',  event => filter.updateTable(event.target));
document.getElementById('filter_name').addEventListener('input',  event => filter.updateTable(event.target));

let filterButton = document.querySelector('#clear-filter');
filterButton.addEventListener('click', event => {
    event.preventDefault();
    resetFilter();
    filter.resetTable();
});