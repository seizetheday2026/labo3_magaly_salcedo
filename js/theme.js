// Mode clair et mode sombre

const boutonTheme = document.querySelector("#bouton-theme");

// Récupérer le thème enregistré

let theme = localStorage.getItem("theme");

// If not utiliser la préférence de l'ordinateur

if (theme === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "sombre";
    } else {
        theme = "clair";
    }
}

// Appliquer le thème

function appliquerTheme() {
    if (theme === "sombre") {
        document.documentElement.classList.add("mode-sombre");
        boutonTheme.setAttribute("aria-label", "Activer le mode clair");
    } else {
        document.documentElement.classList.remove("mode-sombre");
        boutonTheme.setAttribute("aria-label", "Activer le mode sombre");
    }
}

// Changer le thème pour le click

boutonTheme.addEventListener("click", function () {
    if (theme === "clair") {
        theme = "sombre";
    } else {
        theme = "clair";
    }

    localStorage.setItem("theme", theme);
    appliquerTheme();
});

appliquerTheme();