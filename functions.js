


function insertDrugs(drugs){
    const tbody= document.querySelector('#table-list tbody');
    tbody.innerHTML= getDrugsHTML(drugs);
}

function getDrugsHTML(drugs){
    return drugs.map(getDrugHTML).join("");
}


function getDrugHTML(drug){
    return `<tr>
    <td>${drug.drugName}</td>
    <td>${drug.category}</td>
    <td>${drug.expirationDay}</td>
    <td><a target="_blanck" href="${drug.link}">Prospectus</a></td>
    <td>${drug.quantity}</td>
    <td>
        <a href="#" class="delete-row">&#10006;</a>
        <a href="#" class="edit-row">&#9998;</a>
    </td>`
}
let allDrugs = []; 

function loadList(){
    fetch("store.json")
    .then(res => res.json())
    .then (data => {
    allDrugs = data;
    insertDrugs(data);
});
};
loadList();
