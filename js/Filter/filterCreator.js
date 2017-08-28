let buttonFields = new ButtonFields();
buttonFields.create('Side','filter_side_tr','Left','Right','All');

document.querySelector('#filter_location_tr').innerHTML = `
    <td class="filterLineTitle">Location:</td>
    <td colspan=3  class=\"filterTd\"><input class="filterInput" type="text" name="filtro" id="filter_location"></td>
`;

document.querySelector('#filter_name_tr').innerHTML = `
    <td class="filterLineTitle">Name:</td>
    <td colspan=3 class=\"filterTd\"><input class="filterInput" type="text" name="filtro" id="filter_name"></td>
`;

buttonFields.create('Status', 'filter_status_tr', 'Printed','Not-Printed','All');


document.querySelector('#filter_table').addEventListener('click',function(event){
    let regex = event.target.id.split('_');
    if(regex.length == 3 && regex[2] == 'button'){
        buttonFields.switchState(regex[0],event.target);
    }
});

