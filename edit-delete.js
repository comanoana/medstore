function updateDrugs(){
    const drugName = document.querySelector("#table-list input[name=drugName]").value;
    const drugCategory = document.querySelector("input[name=drugCategory]").value;
    const dateInput = document.querySelector("input[name=dateInput]").value;
    const drugInfo = document.querySelector("input[name=drugInfo]").value;
    const anount = document.querySelector("input[name=anount]").value;

    const durg = {
        id,
        drugName,
        drugCategory,
        dateInput,
        drugInfo,
        anount
    };
    fetch(API.UPDATE.URL, { 
        method: API.UPDATE.METHOD,
        headers: {
            "Content-Type": "application/json"
       },
          body: API.UPDATE.METHOD === "GET" ? null: JSON.stringify(person)
      }).then(res => res.json())
         .then(r => { 
             console.warn(r);  
             if (r.success){
              loadList();
            }
          }
         )};

         function deleteDurgs(id){
            fetch(API.DELETE.URL,{
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

function addEventListener(){

}
   