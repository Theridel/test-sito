// Funzione per la navigazione tra le pagine
function navigateTo(page) {
    window.location.href = page;
}

// Attende il caricamento del DOM per assegnare eventi ai pulsanti
document.addEventListener("DOMContentLoaded", function () {
    let buttons = [
        { id: "backToIndex", target: "index.html" },
        { id: "backToContext", target: "adeguamentoContesto.html" },
        { id: "backToSessions", target: "resocontoSessioni.html" },
        { id: "backToDevelopment", target: "sviluppoSistema.html" }
    ];

    buttons.forEach(button => {
        let element = document.getElementById(button.id);
        if (element) {
            element.addEventListener("click", function () {
                navigateTo(button.target);
            });
        }
    });
});
