const affichage = document.getElementById('affichage')
const bouton = document.getElementById('ajouter')
const valeurInput = document.getElementById('valeurInput')

function creeTache(titre, statut = false){
    return {
      titre, 
      statut, 
      afficheInfo : function(){
        return `Titre  : ${this.titre}, state : ${this.statut ? "Fais" : "A faire"}`
      }
    }
}

const gestionTache = {

     taches : [],
     ajoutTache : function(tache){
     this.taches.push(tache)

     },

     afficheTache : function(){
    
     affichage.innerHTML = ""; 

     this.taches.forEach((tache,index)=>{

     const miniContainer = document.createElement('div')
     
     miniContainer.className  = "miniContainer"

     const li = document.createElement("li")
      
     //creation checkbox ... 
     const checkbox = document.createElement("input")
     checkbox.type  = "checkbox"; 

     checkbox.checked = tache.statut

     checkbox.addEventListener('change', ()=>{
        tache.statut = checkbox.checked
        gestionTache.save(); // sauvegarde dans localSotarage. 
        gestionTache.afficheTache()// on recharge l'affichage. 
         
     })
    
     const span = document.createElement('span')
     span.innerHTML = tache.afficheInfo(); //Le point est utilisé en JavaScript pour accéder à une propriété ou une méthode d’un objet.
     
     
     li.appendChild(checkbox)
     li.appendChild(span)

     miniContainer.appendChild(li)
     affichage.appendChild(miniContainer); 

       })
     }, 
     save: function () {
        localStorage.setItem("taches", JSON.stringify(this.taches));
      }
}

bouton.addEventListener('click',()=>{
    
    const recupValeur = valeurInput.value.trim()

    if(recupValeur  !=""){
        const nouvelleValeur = creeTache(recupValeur); 
        gestionTache.ajoutTache(nouvelleValeur); 
        h
    gestionTache.save()
        gestionTache.afficheTache(); 
        
        valeurInput.value  = ""; 
    }
})

// Au chargement de la page, on récupère les tâches stockées
window.addEventListener('load', function(){

    let donnees = localStorage.getItem("taches"); // recuperation des donnees stocké'
     if(donnees !== ""){

     const objetBruts = JSON.parse(donnees)// objet contient un tableau d’objets bruts récupérés du localStorage 
 //  Objet temporaire pour récré des vrai taches 

 const  gestionObjetBrut = {
   
  tableaux : [], 

  objets :  objetBruts, //Dans gestionObjetBrut, je crée une propriété qui s’appelle objets,
  //et je lui donne comme valeur le contenu de la variable objet.”

// ajouter les taches dans le tableau 
  ajoutTache : function(tache){
    this.tableaux.push(tache)
   },

  afficheObjetBrut : function(){
    this.objets.forEach(donnee =>{
        let tache = creeTache(donnee.titre, donnee.statut)
        this.ajoutTache(tache)
    })
  }
 
 }; 
 // Reconstruction puis affichage
  
 gestionObjetBrut.afficheObjetBrut(); 

 gestionTache.taches = gestionObjetBrut.tableaux; 

 gestionTache.afficheTache(); 
}

})