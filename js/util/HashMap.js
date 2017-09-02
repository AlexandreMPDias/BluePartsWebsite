class Entry{
    constructor(key,value){
        this.key = key;
        this.value = value;
    }
}

class HashMap{
    constructor(){
        this._map = {};
    }
    
    put(key, value){
        this._map.key = new Entry(key, value);
    }
    
    forEach(func){
        for(let entry in this._map){
            func(entry);
        }
    }
    
    key(value){
        this._map.forEach(entry => {
            if(entry.value == value){
                return entry.key;
            }
        })
    }
    
    value(key){
        this._map.forEach(entry => {
            if(entry.key == key){
                return entry.value;
            }
        })
    }
    
    get keys(){
        let ar = [];
        this._map.forEach(entry => ar.push(entry.key));
        return ar;
    }
    
    get values(){
        let ar = [];
        this._map.forEach(entry => ar.push(entry.value));
        return ar;
    }
}