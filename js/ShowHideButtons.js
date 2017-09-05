class SH_Switch{
    constructor(visiblePanel, name, withLock = false){
        this._b = document.querySelector('#SH-'+name.toString().toLowerCase());
        this._v = visiblePanel;
        this._n = name;
        this._withLock = withLock;
        this._unlocked = true;
        this._running = false;
    }

    _switchWithLock(){
        if(this._unlocked){
            this._switchWithoutLock();
            this._unlocked = false;
        }
        else{
            if(!this.running){
                this.running = true;
                setTimeout(function(){
                    this.unlocked = true;
                    this.running = false;
                },0.5);
            }
        }
    }

    _switchWithoutLock(){
        if(this._v.visible){
            this._b.innerHTML = 'Show '+this._n;
        }
        else{
            this._b.innerHTML = 'Hide '+this._n;
        }
        this._v.visible = !this._v.visible;
    }

    switch(){
        if(this._withLock){
            this._switchWithLock();
        }
        else{
            this._switchWithoutLock();
        }
    }

    addToEvent(){
        this._b.addEventListener('click', () => this.switch());
    }
}

class SH_Factory{
    static create(visiblePanel, name, withLock){
        let sh = new SH_Switch(visiblePanel, name, withLock);
        sh.addToEvent();
        sh._withLock = false;
        setTimeout( () => {
        sh.switch();
        sh.switch();
        sh._withLock = withLock;
        },1500);
        return sh;
    }
}

SH_Factory.create(filter, 'Filter', false);
SH_Factory.create(chHist, 'History', false);
SH_Factory.create(pTable, 'Parts', false);