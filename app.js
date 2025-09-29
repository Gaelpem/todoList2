let valeurInput = document.getElementById('valeurInput')
let affichage = document.getElementById('affichage')
let btnAjouter = document.getElementById('ajouter')

function creeTache(tache){
   return{
       tache, 
       afficheInfo : function(){
           return `Tache : ${tache}`
       }
   }
}

const gestionnaire = {
   taches : [],
   save (){
    localStorage.setItem("taches", JSON.stringify(this.taches))
   }, 
   addTache(tache){
    this.taches.push(tache)
    this.save()
   },  
   removeTache(tache){
     this.taches = this.taches.filter((t)=>t !== tache)
     this.save()
     this.afficheTache()
   }, 
   afficheTache(){
    affichage.innerHTML = ""
      this.taches.forEach((tache)=>{
        
        const li = document.createElement('li')
        li.textContent =  tache.afficheInfo()
        const btnSup = document.createElement('button')
        btnSup.textContent = "Supprimer"
        btnSup.addEventListener('click', ()=>{
            this.removeTache(tache)
        })
        
      li.append(btnSup)
      affichage.append(li)
      })
   }
}

const saved = JSON.parse(localStorage.getItem("taches")) || []
gestionnaire.taches  = saved.map((t)=> creeTache(t.tache))
gestionnaire.afficheTache()

btnAjouter.addEventListener('click', ()=>{
        const tache = valeurInput.value.trim()
        if(tache!== ''){
            const newTache = creeTache(tache)
            gestionnaire.addTache(newTache)
            gestionnaire.afficheTache()
            valeurInput.value = ''
        }
})



// Bonus: valider avec "Enter"
valeurInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') btnAjouter.click()
})
