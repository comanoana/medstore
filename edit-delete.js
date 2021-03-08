import { API } from './search-save.js';
import { loadList } from './functions.js';
import {allDrugs} from './functions.js';

export let editId;

export function updateDrugs(){
    const drugName = document.querySelector("#table-list input[name=drugName]").value;
    const category = document.querySelector("input[name=drugCategory]").value;
    const expirationDay = document.querySelector("input[name=dateInput]").value;
    const link = document.querySelector("input[name=drugInfo]").value;
    const amount = document.querySelector("input[name=amount]").value;

    const drug = {
        id:editId,
        drugName,
        category,
        expirationDay,
        link,
        amount,
    };

    fetch(API.UPDATE.URL, { 
        method: API.UPDATE.METHOD,
        headers: {
            "Content-Type": "application/json"
       },
          body: JSON.stringify(drug)
      })
      .then(res => res.json())
        .then(r => { 
             console.warn(r);  
            if (r.success){
            loadList();
        }
    }
)};

export function deleteDrugs(id){
    fetch(API.DELETE.URL, {
        method:API.DELETE.METHOD,
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
        })
        .then(r => r.json())
        .then( r => {
            console.warn(r);
            if (r.success) {
               loadList();
            }
        });
};

export function populateCurrentDrug(id){
    var drug = allDrugs.find(drug => drug.id == id);

    editId = id;
    const drugName = document.querySelector("#table-list input[name=drugName]");
    const category = document.querySelector("input[name=drugCategory]");
    const expirationDay = document.querySelector("input[name=dateInput]");
    const link = document.querySelector("input[name=drugInfo]");
    const amount = document.querySelector("input[name=amount]");

 drugName.value =drug.drugName;
 category.value =drug.category;
 expirationDay.value = drug.expirationDay;
 link.value=drug.link;
 amount.value= drug.amount;
}
   