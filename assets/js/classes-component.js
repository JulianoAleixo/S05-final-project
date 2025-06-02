class Classes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const dayNames = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
        this.today = "ter";
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch("assets/json/classes.json");
            const allClasses = await response.json();
            this.render(allClasses);
        } catch (error) {
            console.error("Erro ao carregar os dados das aulas:", error);
        }
    }

    render(classes) {
        const classesToday = classes.filter((a) => a.data === this.today);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "assets/css/classes-component.css";
        this.shadowRoot.appendChild(link);

        const linkBootstrap = document.createElement("link");
        linkBootstrap.rel = "stylesheet";
        linkBootstrap.href =
            "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";

        this.shadowRoot.appendChild(linkBootstrap);

        this.shadowRoot.innerHTML += `
        <section id="classes">
          ${classesToday
              .map((a) => {
                  let provaDisplay = a.prova_alert ? "" : "display: none;";
                  return `
                    <div class="class">
                        <div class="exam-label p_label" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                        <div class="class-title">${a.disciplina}</div>
                        <div class="class-local">
                            <i class="bi bi-geo-alt-fill"></i>
                            <p>Local: <b>${a.local}</b></p>
                        </div>
                        <div class="class-hour">
                            <i class="bi bi-clock"></i>
                            <p>Horário: <b>${a.horario}</b></p>
                        </div>
                        <div class="classes-infos">
                        <div class="frequency-label p_label">FALTAS: <b>${
                            a.frequencia
                        }</b></div>
                        <div class="grade-label p_label ${
                            a.nota > 8
                                ? "high-grade"
                                : a.nota > 6
                                ? "medium-grade"
                                : "low-grade"
                        }">CR: <b>${a.nota}</b></div>
                        </div>
                    </div>
            `;
              })
              .join("")}
        </section>
      `;
    }
}

customElements.define("classes-component", Classes);
