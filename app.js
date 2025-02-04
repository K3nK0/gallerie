const nbrPhoto = 243;
const gallery = document.querySelector('.gallery');

let currentIndex = 1;
let photosPerLoad = calculatePhotosPerScreen(); // Calcul du nombre initial de photos

// Création de la lightbox
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

const img = document.createElement('img');
img.classList.add('lightbox-img');
lightbox.appendChild(img);

const closeBtn = document.createElement('span');
closeBtn.innerHTML = '&times;';
closeBtn.classList.add('close');
lightbox.appendChild(closeBtn);

// 🌀 Création du loader
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(loader);

// Fonction pour charger les photos
function loadPhotos(count) {
    loader.classList.add('show'); // Affiche le loader

    setTimeout(() => { // Simulation d'un petit délai de chargement
        for (let i = 0; i < count && currentIndex <= nbrPhoto; i++) {
            const listItem = document.createElement('li');
            listItem.classList.add('photo');
            const image = document.createElement('img');
            image.src = `media/lanester (${currentIndex}).jpg`;
            image.loading = "lazy"; // Lazy loading natif

            listItem.appendChild(image);
            gallery.appendChild(listItem);
            currentIndex++;
        }

        loader.classList.remove('show'); // Masque le loader après le chargement
    }, 500); // Temps de simulation du chargement
}

// Fonction pour calculer combien de photos affichent l'écran
function calculatePhotosPerScreen() {
    const photoHeight = 250; // Hauteur estimée d'une photo (peut être ajustée)
    const screenHeight = window.innerHeight;
    const columns = Math.floor(window.innerWidth / 250); // Largeur estimée d'une photo
    const rows = Math.ceil(screenHeight / photoHeight);
    return columns * rows;
}

// Charger les premières photos
loadPhotos(photosPerLoad);

// Charger d'autres photos quand l'utilisateur scrolle
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadPhotos(calculatePhotosPerScreen()); // Charge de nouvelles photos dynamiquement
    }
});

// Recalculer le nombre de photos en cas de redimensionnement
window.addEventListener('resize', () => {
    photosPerLoad = calculatePhotosPerScreen();
});

let currentIndexImg = 0;

// 🔥 Gérer l'ouverture de la lightbox et mise à jour dynamique des images
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
        const images = document.querySelectorAll('.gallery img'); // MAJ des images
        currentIndexImg = Array.from(images).indexOf(e.target);
        showImage(currentIndexImg);
        lightbox.classList.add('active');
    }
});

// Fonction pour afficher une image dans la lightbox
function showImage(index) {
    const images = document.querySelectorAll('.gallery img'); // MAJ des images
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    img.src = images[index].src;
    currentIndexImg = index;
}

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== img) {
        lightbox.classList.remove('active');
    }
});

// 🚀 Gestion des touches du clavier
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        showImage(currentIndexImg + 1);
    } else if (e.key === 'ArrowLeft') {
        showImage(currentIndexImg - 1);
    } else if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// Ajout de la classe "loaded" quand une image est chargée
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
    });
});
