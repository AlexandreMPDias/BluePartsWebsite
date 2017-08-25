class Part{

    constructor(tr){
        this._part = tr;
        this._state = tr.querySelector('.state');
    }

    hasClass(cls) {
        return (' ' + this._part.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    _removePaint(){
        if(this.hasClass('printed')){
            this._part.classList.remove('printed'); 
         }
        else if(this.hasClass('not-printed')){
            this._part.classList.remove('not-printed');
        }
    }

    isPrinted() {
        if (this._state.textContent === "Printed") {
            return true;
        }
        return false;
    }

    paint(){
        this._removePaint();
        if(this.isPrinted()) {
            this._part.classList.add('printed');
        }
        else{
            this._part.classList.add('not-printed');
        }
    }

    changeState(){
        if (this.isPrinted()) {
            this._state.textContent = 'NOT YET PRINTED';
            this._part.classList.remove('printed');
        } else {
            this._state.textContent = 'Printed';
            this._part.classList.add('.printed');
        }
    }

    get nameContent(){
        return this._part.querySelector('.name').textContent;
    }

    get stateContent(){
        return this._state.textContent;
    }

    get sideContent(){
        return this._part.querySelector('.side').textContent;
    }

    get locationContent(){
        return this._part.querySelector('.location').textContent;
    }

    get tr(){
        return this._part;
    }

    get id(){
        return this._simpleSide() + ", " + this.locationContent + ", " + this.nameContent;
    }

    _simpleSide(){
        if(this.sideContent == "Right"){
            return 'R';
        }
        else{
            return 'L';
        }
    }

    hide(){
        if(!this.hasClass('invisible')){
            this._part.classList.add('invisible');
        }
    }

    unhide(){
        this._part.classList.remove('invisible');
    }

    isHidden(){
        return (this.hasClass('invisible'));
    }

    textContent(field){
        if(field == 'status'){
            return this._state.textContent;
        } else if(field == 'name'){
            return this.nameContent;
        } else if(field == 'location'){
            return this.locationContent;
        } else if(field == 'side'){
            return this.sideContent;
        } else {
            throw new Error('Invalid Field. Valid fields: [side][location][name][status]');
        }
    }
}