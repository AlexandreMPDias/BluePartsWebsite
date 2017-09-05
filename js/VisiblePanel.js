class VisiblePanel{
    constructor(element, orientation = "width", ratio = 1.0){
        if(element == null){
            throw new Error('Parameters can\'t be null');
        }
        this._element = element;
        this._visible = true;
        this._delay = 0.5;
        this._orientation = orientation;
        this._w0 = element.offsetWidth + "px";
        this._h0 = element.offsetHeight + "px";
        //console.log(element + ": [" + this._w0 + "," + this._h0 + "]");
    }
    
    _heightChg(newValue, transitionSpeed = 0){
        this._element.style.transition = `all ${transitionSpeed}s`;
        this._element.style.height = newValue;
    }

    _widthChg(newValue, transitionSpeed = 0){
        this._element.style.transition = `all ${transitionSpeed}s`;
        this._element.style.width = newValue;
    }

    set visible(isVisible = true){
        this._visible = isVisible;
        this._element.style.overflow = "hidden";
        if(this._orientation == "width"){
            if(this._element.style.width == "0px"){
                this._widthChg(this._w0);
                this._heightChg(this._h0, this._delay);
            }
            else{
                this._widthChg("0px");
                this._heightChg("0px", this._delay);
            }
        }
        else{
            if(this._element.style.height == "0px"){
                this._heightChg(this._h0, 0);
                this._widthChg(this._w0,this._delay);
            }
            else{
                this._heightChg("0px", 0);
                this._widthChg("0px",this._delay);              
            }
        }
    }

    updateSize(height){
        this._w0 = this._element.offsetWidth + "px";
        this._h0 = (height+200) + "px";
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