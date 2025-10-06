const filtres = document.getElementById('filtres')
const valeurInput = document.getElementById('valeurInput')
const affichage = document.getElementById('affichage')
const btn = document.getElementById('ajouter')


function creeTache(tache, done = false){
       return {
          tache, 
          done, 
            afficheDetail :  function(){
                return `Tache : ${this.tache}, Statue : ${this.done ? 'faire' :  'A faire'}`
            }
       }
}
const gestionnaireTache = {
       
    taches : [], 
    save(){
        localStorage.setItem("taches", JSON.stringify(this.taches)); 
    },
    filtre  : 'all', 

    setFiltre(nouveau){
        this.filtre = nouveau
        this.afficheTache()
    }, 
    getTacheFiltre(){
        if(this.filtre === 'todo') return  this.taches.filter(t => !t.done)
        if(this.filtre === 'done') return  this.taches.filter(t => t.done)
        return  this.taches
    }, 

    addTache(tache){
      this.taches.push(tache)
      this.save()
    }, 

    deleteTache(tache){
    this.taches =  this.taches.filter(t=> t !== tache)
    this.save()
    }, 
     afficheTache(){
        affichage.innerHTML = ''
        this.taches.forEach((tache)=>{
         const li = document.createElement('li')
         li.textContent = tache.afficheDetail()

         const checkbox =  document.createElement('input')
         checkbox.type =  "checkbox"

          checkbox.checked = tache.done
         checkbox.addEventListener('change', ()=>{
             tache.done = checkbox.checked
             this.save()
             this.afficheTache()

         })

         const btnDelete  = document.createElement('button')
         btnDelete.textContent = "Delete"
         
         btnDelete.addEventListener('click', ()=>{
              this.deleteTache(tache)
              this.afficheTache()
         })
      
         li.appendChild(checkbox)
         li.appendChild(btnDelete)
         affichage.appendChild(li)
     })
     }
   
    }


//  On écoute les clics dans la zone qui contient les boutons de filtres
filtres.addEventListener('click', (e)=>{

    //  Vérifie si l’élément sur lequel on a cliqué est un <button>
    //    qui possède un attribut "data-filter"
    if(e.target.matches('button[data-filter]')){
  
      //  On récupère la valeur du "data-filter" du bouton cliqué
      //    (par exemple "all", "todo" ou "done")
      const f = e.target.dataset.filter
  
      // ⚙️ On appelle la fonction qui change le filtre actif
      //    et qui met à jour l’affichage des tâches
      gestionnaireTache.setFiltre(f)
    }
  
  })

btn.addEventListener('click', ()=>{
        const currentTache = valeurInput.value.trim()
        if(currentTache !==""){
            const newTache = creeTache(currentTache)
            gestionnaireTache.addTache(newTache)
            gestionnaireTache.afficheTache()
            valeurInput.value = " "
        }
})

const saved = JSON.parse(localStorage.getItem('taches') )|| []
gestionnaireTache.taches = saved.map((t) => creeTache(t.tache, t.done))
gestionnaireTache.afficheTache()