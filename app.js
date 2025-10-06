// 1. PRÉPARATION : Sélectionner tous les éléments avec la classe 'fancy'
const texts = document.querySelectorAll('.fancy');

// 2. TRANSFORMATION : Pour chaque h1, on transforme le texte en spans
texts.forEach(text => {
    // Sauvegarder le texte original (ex: ")
    const content = text.textContent;
    
    // Vider complètement le h1 pour le reconstruire
    text.textContent = '';
    
    // Séparer le texte en mots en utilisant l'espace comme séparateur
    // Ex: "Bienvenue sur mon site" devient ["Bienvenue", "sur", "mon", "site"]
    const words = content.split(' ');
    
    // Pour chaque mot, créer un span et l'ajouter dans le h1
    words.forEach(word => {
        // Créer un nouvel élément <span>
        const span = document.createElement('span');
        
        // Mettre le mot dans le span
        span.textContent = word;
        
        // Ajouter le span dans le h1
        text.appendChild(span);
    });
});

// 3. ANIMATION : Animer chaque h1 un par un
texts.forEach((text, textIndex) => {
    // Compteur pour savoir quel mot on anime actuellement
    let wordIndex = 0;
    
    // Récupérer tous les spans qu'on vient de créer dans ce h1
    const spans = text.querySelectorAll('span');
    
    // Attendre un peu avant de démarrer l'animation de ce h1
    // Le premier h1 démarre immédiatement (textIndex = 0 * 1000 = 0ms)
    // Le deuxième h1 démarre après 1000ms, etc.
    setTimeout(() => {
        // Démarrer un timer qui s'exécute toutes les 200ms
        const timer = setInterval(() => {
            // Si on n'a pas encore animé tous les mots
            if(wordIndex < spans.length) {
                // Ajouter la classe 'fade' au mot actuel pour déclencher l'animation CSS
                spans[wordIndex].classList.add('fade');
                
                // Passer au mot suivant
                wordIndex++;
            } else {
                // Tous les mots sont animés, on arrête le timer
                clearInterval(timer);
            }
        }, 200); // Attendre 200ms entre chaque mot
    }, textIndex * 1000); // Délai avant de démarrer l'animation de ce h1
});