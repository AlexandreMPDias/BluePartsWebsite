class PartFactoryFromDB{
    constructor(jsonData){
        this.name = jsonData.name;
        this.side = jsonData.side;
        this.location = jsonData.location;
        this.status = (jsonData.status == "PRINTED") ? "Printed" : "NOT YET PRINTED";
    }

    generateTr(){
        let tr = document.createElement('tr');
        tr.classList.add('part');
        tr.innerHTML = `
            ${this.generateTdInStr("side",this.side)}
            ${this.generateTdInStr("location",this.location)}
            ${this.generateTdInStr("name",this.name)}
            ${this.generateTdInStr("state",this.status)}
        `;
        return tr;
    }

    generateTdInStr(klass, value){
        return `<td class="${klass}">${value}</td>`;
    }

    create(){
        return new Part(this.generateTr());
    }

    genAndAppend(table){
        let tr = table.insertRow();
        tr.classList.add('part');
        tr.innerHTML = `
            ${this.generateTdInStr("side",this.side)}
            ${this.generateTdInStr("location",this.location)}
            ${this.generateTdInStr("name",this.name)}
            ${this.generateTdInStr("state",this.status)}
        `;
        return tr;
    }


}