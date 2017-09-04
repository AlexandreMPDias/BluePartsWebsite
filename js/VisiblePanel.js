class VisiblePanel{
    constructor(element){
        if(element == null){
            throw new Error('Parameters can\'t be null');
        }
        this._element = element;
        this._visible = true;
        this._delay = 1000;
    }
        
    _show(ele){
        ele.classList.add('show');
        setTimeout( () => {
            //ele.classList.remove('invisible');
            ele.classList.remove('hide');
        },this._delay);        
    }
    
    _hide(ele){
        ele.classList.add('hide');
        setTimeout( () => {
            ele.classList.remove('show');
            //ele.classList.add('invisible');
        },this._delay);
    }
    
    set visible(isVisible = true){
        this._visible = isVisible;
        this._changeVisibility(isVisible, this._element);
        let a = this._element.classList;
        console.log(`s:${a.contains('show')} - h:${a.contains('hide')} - i:${a.contains('invisible')}`);
    }
    
    _changeVisibility(visible, element){
        this._changeVisibilityForElement(visible, element);
        if(element.hasChildNodes()){
            Array.from(element.childNodes).forEach( (child) => {
                console.log(child);
                this._changeVisibility(visible, child);
            });
        }
    }
    
    _changeVisibilityForElement(visible, element){
        if(visible){
            this._show(this._element);
        }
        else {
            this._hide(this._element);
        }
    }
    
    get visible(){
        return this._visible;
    }
    
    updatePanel(updateMethod){
        if(this._visible){
            updateMethod();
        }
    }
}