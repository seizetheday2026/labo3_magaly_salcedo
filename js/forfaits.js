const services = document.querySelectorAll('input[name="services"]');
const visuels = document.querySelectorAll('input[name="visuels"]');

const texteResume = document.querySelector(".texte-resume");
const totalForfait = document.querySelector(".total-forfait strong");

function calculerForfait() {
    let total = 0;
    let resume = [];

    for (const service of services) {
        if (service.checked) {
            total += Number(service.dataset.prix);
            resume.push(service.nextElementSibling.textContent.trim());
        }
    }

    for (const choix of visuels) {
        if (choix.checked) {
            total += Number(choix.dataset.prix);
            resume.push("Réseaux sociaux : " + choix.value + " visuels");
        }
    }

    totalForfait.textContent = total.toLocaleString("fr-CA") + " $";

    if (resume.length === 0) {
        texteResume.textContent = "Vos services sélectionnés apparaîtront ici.";
    } else {
        texteResume.textContent = resume.join(" • ");
    }
}

for (const service of services) {
    service.addEventListener("change", calculerForfait);
}

for (const choix of visuels) {
    choix.addEventListener("change", calculerForfait);
}

calculerForfait();

const formulaireForfait = document.querySelector(".forfait-personnalise form");

formulaireForfait.addEventListener("reset", function () {
    setTimeout(calculerForfait, 0);
});

// Envoyer le forfait personnalisé au formulaire de contact

formulaireForfait.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    let servicesChoisis = [];

    for (const service of services) {
        if (service.checked) {
            servicesChoisis.push(service.nextElementSibling.textContent.trim());
        }
    }

    for (const choix of visuels) {
        if (choix.checked) {
            servicesChoisis.push("Réseaux sociaux : " + choix.value + " visuels");
        }
    }

    if (servicesChoisis.length === 0) {
        alert("Veuillez sélectionner au moins un service.");
        return;
    }

    const message = "Bonjour, je souhaite obtenir une soumission pour :\n\n"
        + servicesChoisis.join("\n")
        + "\n\nTotal estimé : " + totalForfait.textContent;

    window.location.href = "contact.html?message=" + encodeURIComponent(message);
});