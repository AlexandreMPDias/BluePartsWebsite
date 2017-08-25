let undoButton = document.querySelector('#history-undo');

function getPartInTable(last_added_row){
    let hPart = new Part(last_added_row);
    for(let i = 0; i < pTable.parts.length; i++){
        let tPart = new Part(pTable.parts[i]);
        if(hPart.id == tPart.id){
            return tPart;
        }
    }
    throw new Error("Part not found inside the Table. Please reload the page.");
}

undoButton.addEventListener("click", function(event){
    event.preventDefault();
    let last_added_row = chHist.undo();
    if(last_added_row != null){
        try{
        let part = getPartInTable(last_added_row);
        part.changeState();
        part.paint();
        }
        catch(error){
            alert(error.message);
        }
    }
});