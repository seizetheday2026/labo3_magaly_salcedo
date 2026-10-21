// Afficher le récap de la dernière demande

const recapitulatif = document.querySelector("#recapitulatif-demande");
const derniereDemande = JSON.parse(localStorage.getItem("derniereDemande"));

if (derniereDemande) {
    const nom = document.createElement("p");
    nom.textContent = "Nom : " + derniereDemande.nom;

    const courriel = document.createElement("p");
    courriel.textContent = "Courriel : " + derniereDemande.courriel;

    const type = document.createElement("p");
    type.textContent = "Type de demande : " + derniereDemande.type;

    const message = document.createElement("p");
    message.textContent = "Message : " + derniereDemande.message;

    recapitulatif.appendChild(nom);
    recapitulatif.appendChild(courriel);
    recapitulatif.appendChild(type);
    recapitulatif.appendChild(message);
}