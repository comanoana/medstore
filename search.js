import { allDrugs, insertDrugs, loadList } from './functions.js';
import{ editId, updateDrugs } from './edit-delete.js';

export const API = {
    CREATE: {
        URL:"http://localhost:3000/medstore/create",
        METHOD: "POST"
    },
    READ:{
        URL:"http://localhost:3000/medstore/",
        METHOD: "GET"
    },
    UPDATE:{
        URL:"http://localhost:3000/medstore/update",
        METHOD: "PUT"
    },
    DELETE:{
        URL:"http://localhost:3000/medstore/delete",
        METHOD: "DELETE"
    }
};

const search = document.getElementById('search');
search.addEventListener("input", e => {
    const text = e.target.value;
    

    const filtrate = searchDrugs(text);

    insertDrugs(filtrate);
})

function searchDrugs(text) {
    text = text.toLowerCase();
    console.warn("search", text);
    return allDrugs.filter(drug => {

         console.log("!!!!", drug);
        return drug.drugName.toLowerCase().indexOf(text) > -1;
    });
  }

  function saveDrug() {
    const drugName = document.querySelector("input[name=drugName]").value;
    const category = document.querySelector("input[name=drugCategory]").value;
    const expirationDay = document.querySelector("input[name=dateInput]").value;
    const link = document.querySelector("input[name=drugInfo]").value;
    const amount = document.querySelector("input[name=amount]").value;
    const isExpired = checkIfDrugIsExpired(expirationDay)

    console.log("IS EXPIRED", isExpired)
    console.log("EXPIRATION DAY", expirationDay)
    
    const drug = {
        drugName,
        category,
        expirationDay,
        link,
        amount,
        isExpired
    };
    console.info('saving...', drug, JSON.stringify(drug));

    fetch(API.CREATE.URL, {
        method:API.CREATE.METHOD,
        headers:{ "Content-Type": "application/json"},
        body: API.CREATE.METHOD === 'GET' ? null : JSON.stringify(drug)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.success) {
                loadList();
            }
        });
}

function checkIfDrugIsExpired(expirationDay) {
    var isExpired = false;
    var expDate = new Date(expirationDay);
    var curentDate = new Date();
    if (expDate.getTime() < curentDate.getTime()){
        isExpired = true 
    }

    return isExpired;
}

const saveBtn = document.querySelector("#addDrug");
saveBtn.addEventListener("click", () => {
    if(editId){
        updateDrugs();
    } else {
         saveDrug();
    }
}); 

  