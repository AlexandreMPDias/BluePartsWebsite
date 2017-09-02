class FieldFilter{
    constructor(part){
        this._part = part;
        this.visibility = true;
    }
    
    update(){
        throw new Error('This class cant call any methods');
    }
}

class SynchronizedFilter{
    constructor(part){
        this.part = part;
        this.side = new SideFilter(part);
        this.status = new StatusFilter(part);
        this.location = new LocationFilter(part);
        this.name = new NameFilter(part);
    }
    
    updateField(field){
        if(field == 'side'){
            this.side.update();
        }
        else if(field == 'status'){
            this.status.update();
        }
        else if(field == 'location'){
            this.location.update();
        }
        else if(field == 'name'){
            this.name.update();
        }
    }
    
    areAllFieldsVisible(){
        return (this.side.visibility && this.status.visibility && this.location.visibility && this.name.visibility);
    }
}

class LocationFilter extends FieldFilter{
    constructor(part){
        super(part);
        this._input = document.getElementById('filter_location');
    }
    
    update(){
        let regex = new RegExp(this._input.value,'i');
        this.visibility = regex.test(this._part.locationContent);
    }
}

class NameFilter extends FieldFilter{
    constructor(part){
        super(part);
        this._input = document.getElementById('filter_name');
    }
    
    update(){
        let regex = new RegExp(this._input.value,'i');
        this.visibility = regex.test(this._part.nameContent);
    }
}

class SideFilter extends FieldFilter{
    constructor(part){
        super(part);
        let S = document.querySelector.bind(document);
        this._left = S('#side_left_button'); //origin + '_' + name.toString().toLowerCase() + '_button';
        this._right = S('#side_right_button');
        this._all = S('#side_all_button');
        this._selection = new ButtonFilter(this._left, this._right, this._all);
    }
    
    update(){
        if(this._selection.whichButtonIsSelected() == null){
            this.visibility = false;
            
        }else{
            if(this._selection.whichButtonIsSelected().id == this._all.id){
                this.visibility = true;
            }
            else if(this._selection.whichButtonIsSelected().id == this._left.id){
                this.visibility = (this._part.sideContent == 'Left');
            }
            else if(this._selection.whichButtonIsSelected().id == this._right.id){
                this.visibility = (this._part.sideContent == 'Right');
            } else {
                this.visibility = false;
            }
        }
    }    
}

class StatusFilter extends FieldFilter{
    constructor(part){
        super(part);
        let S = document.querySelector.bind(document);
        this._left = S('#status_printed_button');
        this._right = S('#status_not-printed_button');
        this._all = S('#status_all_button');
        this._selection = new ButtonFilter(this._left, this._right, this._all);
    }
    
    update(){
        if(this._selection.whichButtonIsSelected() == null){
            this.visibility = false;
            
        }else{
            if(this._selection.whichButtonIsSelected().id == this._all.id){
                this.visibility = true;
            }
            else if(this._selection.whichButtonIsSelected().id == this._left.id){
                this.visibility = (this._part.stateContent == 'Printed');
            }
            else if(this._selection.whichButtonIsSelected().id == this._right.id){
                this.visibility = (this._part.stateContent == pTable.notprintedStringValue);
            } else {
                this.visibility = false;
            }
        }
    }    
}