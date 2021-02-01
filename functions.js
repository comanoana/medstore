let allDrugs = []; 

function loadList(){
    fetch("store.json")
    .then(res => res.json())
    .then (data => {
    allDrugs = data;
    insertDrugs(data);
    verifyIfDrugIsExpired(allDrugs);
    });
};

function insertDrugs(drugs) {
    const tbody = document.querySelector('#table-list tbody');
    tbody.innerHTML= getDrugsHTML(drugs);
}

function getDrugsHTML(drugs){
    return drugs.map(getDrugHTML).join("");
}

function getDrugHTML(drug) {
        
        return `<tr>
        <td>${drug.drugName}</td>
        <td>${drug.category}</td>
        <td>${drug.expirationDay}</td>
        <td><a target="_blanck" href="${drug.link}">Prospectus</a></td>
        <td>${drug.amount}</td>
        <td>
            <a href="#" class="delete-row">&#10006;</a>
            <a href="#" class="edit-row">&#9998;</a>
        </td>`
}

function getExpiredDrugHTML(){
    let expiredDrugs = allDrugs.filter(drug => drug.isExpired == true)
    insertDrugs(expiredDrugs)
}

function getUnexpiredDrugHTML() {
    let unexpiredDrugs = allDrugs.filter(drug => drug.isExpired == false)
    insertDrugs(unexpiredDrugs)
}

function addEventListeners() {
    const expiredBtn = document.getElementById("expiredBtn")
    expiredBtn.addEventListener("click", (e) => {
        getExpiredDrugHTML()   
    })

    const unexpiredBtn = document.getElementById("unexpiredBtn")
    unexpiredBtn.addEventListener("click", (e) => {
        getUnexpiredDrugHTML()   
    })

    const allBtn = document.getElementById("allBtn")
    allBtn.addEventListener("click", (e) => {
        insertDrugs(allDrugs)   
    })
}

function verifyIfDrugIsExpired(allDrugs) {
    let currentTime = new Date();
    currentTime.getTime();
    allDrugs.forEach(element => {
        var expDate = new Date(element.expirationDay);
        var curentDate = new Date();
        if (expDate.getTime() < curentDate.getTime()){
            element.isExpired = true
        }
    });
}

function setCurrentDayAsMinForDateInput() {
     var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date-input")[0].setAttribute('min', today);
}

loadList();
addEventListeners();
setCurrentDayAsMinForDateInput();

