const valeurInput = document.getElementById('valeurInput')
const affichage  = document.getElementById('affichage')
const btn = document.getElementById('ajouter')

const filtres = document.getElementById('filtres')

function creeTache(tache, done  = false){
       return {
         tache,
         done,
         afficheDetail : function(){
            return ` Tache : ${this.tache} , statue : ${ this.done ? "fait" : "A faire "}`
         }
       }
}

const gestionnaireTache = {
    taches : [], 
    filtre: 'all', // 'all' | 'todo' | 'done'

  setFiltre(nouveau){
    this.filtre = nouveau// il va permettre d'inserer le filtre qu'on 
    this.afficheTache()
  },

  getTachesFiltrees(){
    if(this.filtre === 'todo')  return this.taches.filter(t => !t.done)
    if(this.filtre === 'done')  return this.taches.filter(t =>  t.done)
    return this.taches // 'all'
  },

   addTache(tache){
        this.taches.push(tache)
        this.save()
    }, 
    save(){
      localStorage.setItem('tache', JSON.stringify(this.taches))
    }, 
    deleteTache(tache){
        this.taches = this.taches.filter(t => t !== tache)
        this.save()
    }, 
    afficheTache(){
        affichage.innerHTML = ''
        const aAfficher = this.getTachesFiltrees()   // ✅ utiliser le filtre ici
      
        aAfficher.forEach((t)=>{
          const li = document.createElement('li')
      
          const checkbox = document.createElement('input')
          checkbox.type = "checkbox"
          checkbox.checked = t.done
          checkbox.addEventListener('change', ()=>{
            t.done = checkbox.checked
            this.save()
            this.afficheTache()
          })
      
          const span = document.createElement('span')
          span.textContent = t.afficheDetail()
      
          const btnDelete = document.createElement('button')
          btnDelete.textContent = 'Supprimer'
          btnDelete.addEventListener('click', ()=>{
            this.deleteTache(t)
            this.afficheTache()
          })
      
          li.append(checkbox, span, btnDelete)
          affichage.appendChild(li)
        })
      }
}

btn.addEventListener('click', ()=>{
      const currentTache = valeurInput.value.trim()
      if(currentTache !== ""){
         const newTache = creeTache(currentTache)
         gestionnaireTache.addTache(newTache)
         gestionnaireTache.afficheTache()
         valeurInput.value = " "
      }
})

// click sur un des 3 boutons
filtres.addEventListener('click', (e)=>{
    if(e.target.matches('button[data-filter]')){
      const f = e.target.dataset.filter // 'all' | 'todo' | 'done'
      gestionnaireTache.setFiltre(f)
    }
  })
// lire ce qu'il y a dans localStorage 

// On récupère les tâches sauvegardées dans le localStorage 
// (elles sont stockées sous forme de texte JSON → on les transforme en tableau JS avec JSON.parse).
// Si rien n'est trouvé, on utilise un tableau vide par défaut.
const saved = JSON.parse(localStorage.getItem('tache')) || []

// On recrée des objets "tâche" à partir des données brutes récupérées,
// en appelant la fonction creeTache() pour chaque élément du tableau.
// Cela permet de retrouver les méthodes (comme afficheInfo) qui seraient perdues 
// si on utilisait directement les objets du localStorage.
gestionnaireTache.taches = saved.map((t) => creeTache(t.tache, t.done))

gestionnaireTache.afficheTache(); 


