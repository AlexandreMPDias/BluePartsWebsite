class ButtonFilter{
    constructor(button0, button1, button2){
        this.bs = [button0, button1, button2];
    }
    
    whichButtonIsSelected(){
        for(let i = 0; i < this.bs.length; i++){
            if(this.bs[i].classList.contains('pressed')){
                return this.bs[i];
            }
        }
        return null;
    }
}