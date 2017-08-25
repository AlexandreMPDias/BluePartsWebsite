class KeyListener{

    constructor(){
        this.list = [];
    }

    addCommand(command){
        this.list.push(command);
    }

    _runCommands(event){
        this.list.forEach(function(element){
            element(event);
        })
    }

    setListener(doc,keystate){
        if(keystate == "onkeydown"){
            doc.onkeydown = this._runCommands;
        }
    }

}