
 // Formulaire de Contact
 
const formulaire = document.querySelector("#formulaire-contact");
const typeQuestion = document.querySelector("#type-question");
const typeProjet = document.querySelector("#type-projet");
const champsProjet = document.querySelectorAll(".champ-projet");
const raison = document.querySelector("#raison");
const sectionReseaux = document.querySelector("#section-reseaux");
const methodeTelephone = document.querySelector("#methode-telephone");
const sectionTelephone = document.querySelector("#section-telephone");
const telephone = document.querySelector("#telephone");
const message = document.querySelector("#message");
const labelMessage = document.querySelector("#label-message");

// Prefill les coordonnées de la dernière demande
const derniereDemande = JSON.parse(localStorage.getItem("derniereDemande"));

if (derniereDemande) {
    document.querySelector("#nom").value = derniereDemande.nom;
    document.querySelector("#courriel").value = derniereDemande.courriel;
}

// Empeche les lettres dans le numéro de téléphone
telephone.addEventListener("input", function () {
    telephone.value = telephone.value.replace(/[^0-9 -]/g, "");
});

function afficherChamps() {
    for (const champ of champsProjet) {
        champ.classList.toggle("d-none", !typeProjet.checked);
    }

    raison.required = typeProjet.checked;
    sectionReseaux.classList.toggle("d-none", !typeProjet.checked || raison.value !== "reseaux");
    sectionTelephone.classList.toggle("d-none", !methodeTelephone.checked);
    telephone.required = methodeTelephone.checked;
    labelMessage.textContent = typeProjet.checked ? "Parlez-nous de votre projet *" : "Votre question *";
}

function afficherErreur(champ, texte) {
    let erreur = champ.parentElement.querySelector(".erreur-champ");
        if (!erreur) {
            erreur = document.createElement("p");
            erreur.classList.add("erreur-champ");
            champ.parentElement.appendChild(erreur);
        }
    erreur.textContent = texte;
}

function verifierChamp(champ) {
    const valeur = champ.value.trim();
    let erreur = "";

    if (champ.id === "nom" && valeur.length < 2) {
        erreur = "Le nom doit contenir au moins 2 caractères.";
        } else if (champ.id === "courriel" && (valeur === "" || !champ.validity.valid)) {
            erreur = "Entrez une adresse courriel valide.";
        } else if (champ.id === "message" && valeur.length < (typeProjet.checked ? 20 : 10)) {
            erreur = "Votre message doit contenir au moins " + (typeProjet.checked ? 20 : 10) + " caractères.";
        } else if (champ.id === "raison" && typeProjet.checked && valeur === "") {
            erreur = "Sélectionnez un service.";
        } else if (champ.id === "telephone" && methodeTelephone.checked && !/^\d{3}[- ]?\d{3}[- ]?\d{4}$/.test(valeur)) {
            erreur = "Entrez un numéro de téléphone valide (10 chiffres).";
        }

    afficherErreur(champ, erreur);
    return erreur === "";
}

const champsAVerifier = [
    document.querySelector("#nom"),
    document.querySelector("#courriel"),
    message, raison, telephone
];

for (const champ of champsAVerifier) {
    champ.addEventListener("input", function () {
        verifierChamp(champ);
    });
    champ.addEventListener("change", function () {
        verifierChamp(champ);
    });
}

for (const radio of document.querySelectorAll('input[name="type-demande"], input[name="methode"]')) {
    radio.addEventListener("change", afficherChamps);
}
raison.addEventListener("change", afficherChamps);

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    let valide = true;
    for (const champ of champsAVerifier) {
        if ((champ !== raison || typeProjet.checked) &&
            (champ !== telephone || methodeTelephone.checked) && !verifierChamp(champ)) {
            valide = false;
        }
    }
    
    if (valide) {

        let demandes = JSON.parse(localStorage.getItem("demandes")) || [];

        const demande = {
            nom: document.querySelector("#nom").value.trim(),
            courriel: document.querySelector("#courriel").value.trim(),
            type: typeProjet.checked ? "Projet" : "Question",
            message: message.value.trim()
        };

        demandes.push(demande);
        localStorage.setItem("demandes", JSON.stringify(demandes));
        localStorage.setItem("derniereDemande", JSON.stringify(demande));
        window.location.href = "merci.html";
    }
});
afficherChamps();

// Récupérer le forfait personnalisé

const parametres = new URLSearchParams(window.location.search);
const messageForfait = parametres.get("message");

if (messageForfait) {
    typeProjet.checked = true;
    message.value = messageForfait;
    afficherChamps();
}

// Historique des demandes

const listeDemandes = document.querySelector("#liste-demandes");
const boutonEffacer = document.querySelector("#effacer-demandes");

function afficherDemandes() {
    const demandes = JSON.parse(localStorage.getItem("demandes")) || [];

    listeDemandes.innerHTML = "";

    if (demandes.length === 0) {
        listeDemandes.textContent = "Aucune demande est enregistrée.";
        return;
    }

    for (const demande of demandes) {
        const bloc = document.createElement("div");
        bloc.classList.add("mb-3", "p-3", "border", "rounded");

        const nom = document.createElement("h3");
        nom.textContent = demande.nom;

        const courriel = document.createElement("p");
        courriel.textContent = "Courriel : " + demande.courriel;

        const type = document.createElement("p");
        type.textContent = "Type : " + demande.type;

        const message = document.createElement("p");
        message.textContent = demande.message;
        message.style.whiteSpace = "pre-line";

        bloc.appendChild(nom);
        bloc.appendChild(courriel);
        bloc.appendChild(type);
        bloc.appendChild(message);

        listeDemandes.appendChild(bloc);
    }

    
}

boutonEffacer.addEventListener("click", function () {
    if (confirm("Voulez-vous vraiment effacer toutes les demandes ?")) {
        localStorage.removeItem("demandes");
        afficherDemandes();
    }
});

afficherDemandes();