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
            //throw new Error('Key already inside the Map - [' + part.id + ']');
            console.log('Key already inside the Map - [' + part.id + ']');
        }
        else{
        super.set(part.id,new Pair(part));
        }
    }
}

class Filter extends VisiblePanel{
    constructor() {
        super(document.querySelector('#filter'),'width', 0.8);
        this._map = new FilterMap();
    }
    
    _populateMap(){
        pTable.parts.forEach(item => this._map.set(new Part(item)));
    }
    
    updateTable(target){
        this.updatePanel( () => {
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
        });
    }
    
    _updateAll(){
        this.updatePanel( () => {
            this._map.forEach(entry => {
                entry.second.updateField('side');
                entry.second.updateField('status');
                entry.second.updateField('location');
                entry.second.updateField('name');
            });
        });
    }
    
    resetTable(){
        this.updatePanel( () => {
            this._map.forEach(entry => {
                entry.second = new SynchronizedFilter(entry.first);
                entry.first.tr.classList.remove('invisible');
            });
        });
    }

    addEvents(){
        let filterTable = document.querySelector('#filter-table');
        filter._populateMap();
        setTimeout( () => {
        filterTable.addEventListener('click', event => filter.updateTable(event.target));
        document.getElementById('filter_location').addEventListener('input',  event => filter.updateTable(event.target));
        document.getElementById('filter_name').addEventListener('input',  event => filter.updateTable(event.target));
        }, DB_DELAY);
    }

    list(){
        console.log(this._map.size)
        this._map.forEach(entry => {
            console.log(entry);
        });
    }
}

let filter = new Filter();
filter.addEvents();
filter.list();

let filterButton = document.querySelector('#clear-filter');
filterButton.addEventListener('click', event => {
    event.preventDefault();
    resetFilter();
    filter.resetTable();
});