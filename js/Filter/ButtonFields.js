class Mapper{
    constructor(key){
        this.key = key;
        this.value = [];
    }
    
    add(val){
        for(let i = 0; i < this.value.length; i++){
            if(this.value[i] == val){
                return;
            }
        }
        this.value.push(val);
    }
    
    size(){
        return this.value.length;
    }
}

class ButtonFields{
    
    constructor(){
        this.map = [];
    }
        
    create(origin, originID, field1, field2, field3){
        let tr = document.getElementById(originID);
        let name = `${origin}:`;
        let lowerCaseName = origin.toString().toLowerCase();
        this.map.push(new Mapper(lowerCaseName));
        let mapper = this.map[this._findOriginIndex(lowerCaseName)];
        let a = this._createCell(mapper,lowerCaseName, field1);
        let b = this._createCell(mapper,lowerCaseName, field2);
        let all = this._createCell(mapper,lowerCaseName,field3);
        tr.innerHTML = `<tr class="filter-row" id="${originID}">
        <td class="filterLineTitle">${name}</td>
        <td class="filterTd">${a.innerHTML}</td>
        <td class="filterTd">${b.innerHTML}</td>
        <td class="filterTd">${all.innerHTML}</td>
        </tr>`;
    }
    
    
    
    _createCell(mapper, origin, name){
        let id = origin + '_' + name.toString().toLowerCase() + '_button';
        let td = document.createElement('td');
        td.innerHTML = "<button id=\"" + id +"\" class=\"filter_button\"></button>";
        let button = td.querySelector('#' + id);
        mapper.add(id);
        button.innerHTML = name;
        return td;
    }
            
    switchState(origin, button){
        let deselect = this._getDeselect(origin, button.id);
        if(!button.classList.contains('pressed')){
            button.classList.add('pressed');
        }
        else{
            button.classList.remove('pressed');
        }
        for(let i = 0; i < deselect.length; i++){
            let desButton = document.getElementById(deselect[i]);
            desButton.classList.remove('pressed');
        }
    }
    
    select(origin,button){
        if(!button.classList.contains('pressed')){
            this.switchState(origin,button);
        }
    }
        
    _getDeselect(origin, buttonID){
        let array = [];
        let index = this._findOriginIndex(origin);
        for(let i = 0; i < this.map[index].size(); i++){
            if(buttonID != this.map[index].value[i]){
                array.push(this.map[index].value[i]);
            }
        }
        return array;
    }
    
    _findOriginIndex(origin){
        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].key == origin){
                return i;
            }
        }
        throw new Error('Index not found');
    }
}