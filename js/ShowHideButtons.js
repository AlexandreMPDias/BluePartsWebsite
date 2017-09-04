let button = document.querySelector('#SH-filter');
let unlocked = true;
let running = false;
button.addEventListener('click', () => {
    if(unlocked){
        let visible = filter.visible;
        console.log('Visible: ' + filter.visible);
        if(filter.visible){
            button.innerHTML = 'Show Filter';
        }
        else{
            button.innerHTML = 'Hide Filter';
        }
        filter.visible = !filter.visible;
        unlocked = false;
    }
    else{
        running = true;
        unlocked = true;
        if(!running){
            running = true;
            setTimeout(function(){
                unlocked = true;
                running = false;
            },0.5);
        }
    }
});
