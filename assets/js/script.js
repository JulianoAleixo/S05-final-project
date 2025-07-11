/* Theme Change */
function toggleMenu() {
    document.querySelector("#sidebar").classList.toggle("open");
}

document.addEventListener("click", (event) => {
    let sidebar = document.querySelector("#sidebar");
    let menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
    }
});

function handleChangeTheme(theme) {
    const themes = {
        "light-inatel": {
            "--color-primary": "#0284c7",
            "--color-secondary": "#64748b",
            "--color-accent": "#51DEE0",
            "--color-content": "#ffffff",

            "--color-base-1": "#ffffff",
            "--color-base-2": "#e5e7eb",
            "--color-base-3": "#202020",
            "--color-base-content-1": "#181a2a",
            "--color-base-content-2": "#181a2a",

            "--success": "#00a43b",
            "--warning": "#fdc700",
            "--error": "#ff6266",
        },
        "dark-inatel": {
            "--color-primary": "#1c4e80",
            "--color-secondary": "#7c909a",
            "--color-accent": "#ea6947",
            "--color-content": "#ffffff",

            "--color-base-1": "#202020",
            "--color-base-2": "#23282e",
            "--color-base-3": "#e5e7eb",
            "--color-base-content-1": "#e5e7eb",
            "--color-base-content-2": "#23282e",

            "--success": "#6bb187",
            "--warning": "#dbae5a",
            "--error": "#ac3e31",
        },
        minimalista: {
            "--color-primary": "#0d0d0d",
            "--color-secondary": "#1a1919",
            "--color-accent": "#1c4e80",
            "--color-content": "#e1e1e1",

            "--color-base-1": "#ffffff",
            "--color-base-2": "#f5f5f5",
            "--color-base-3": "#000000",
            "--color-base-content-1": "#000000",
            "--color-base-content-2": "#000000",

            "--success": "#69fec3",
            "--warning": "#ffce69",
            "--error": "#ff9181",
        },
    };

    const themeToChange = themes[theme];

    if (!themeToChange) return;

    for (const [proprerty, color] of Object.entries(themeToChange)) {
        document.documentElement.style.setProperty(proprerty, color);
    }

    localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light-inatel";
    handleChangeTheme(savedTheme);
});

/* Carousel */
const eventsCarousel = [
    {
        id: 1,
        title: "Semana do Software 2025",
        date: "12/05",
        time: "10:00",
        location: "Salão de Eventos",
        type: "tech",
        description:
            "Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400",
    },
    {
        id: 2,
        title: "Workshop de IoT",
        date: "12/01",
        time: "08:00",
        location: "Laboratório CS&I",
        type: "tech",
        description:
            "Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400",
    },
    {
        id: 3,
        title: "Festa dos Alunos 2025",
        date: "18/05",
        time: "19:00",
        location: "Área Esportiva do Inatel",
        type: "cultural",
        description:
            "Venha comemorar a melhor Festa dos Alunos de todos os tempos!",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400",
    },
    {
        id: 4,
        title: "Feira de Oportunidades",
        date: "04/05",
        time: "10:00",
        location: "Salão de Eventos",
        type: "academic",
        description:
            "Venha conhecer empresas e projetos com destaque na área da engenharia.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400",
    },
];

const carousel = document.querySelector(".carousel");

function createCards(events) {
    events.forEach((ev) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${ev.image}" alt="${ev.title}">
            <div class="info">
                <h3>${ev.title}</h3>
                <p>${ev.description}</p>
                <p>
                    <i class="bi bi-calendar-event"></i> ${ev.date} às ${ev.time} 
                    <i class="bi bi-geo-alt-fill"></i> ${ev.location}
                </p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

let cardIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${cardIndex * 100}%)`;
}

function nextCard() {
    cardIndex = (cardIndex + 1) % eventsCarousel.length;
    updateCarousel();
}

function prevCard() {
    cardIndex = (cardIndex - 1 + eventsCarousel.length) % eventsCarousel.length;
    updateCarousel();
}

let autoSlide = setInterval(nextCard, 5000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextCard, 5000);
}

carousel.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

carousel.addEventListener("mouseleave", resetAutoSlide);

document.querySelector("#nextBtn").addEventListener("click", () => {
    nextCard();
    resetAutoSlide();
});

document.querySelector("#prevBtn").addEventListener("click", () => {
    prevCard();
    resetAutoSlide();
});

let startX;

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    startX - endX > 50 && nextCard();
    endX - startX > 50 && prevCard();
});

createCards(eventsCarousel);

/* Login */
const users = [
    { registration: "501", password: "123" },
    { registration: "123", password: "123" },
];

function handleLogin(event) {
    event.preventDefault();

    const registration = document.getElementById("registrationInput").value;
    const password = document.getElementById("passwordInput").value;

    const userFound = users.find(
        (user) =>
            user.registration === registration && user.password === password
    );

    if (userFound) {
        document.querySelector("#login-page").style.display = "none";
        document.querySelector("#sidebar").style.display = "block";
        document.querySelector("#header").style.display = "flex";
        document.querySelector(".header-hidden-block").style.display = "block";
        document.querySelector("#home-page").style.display = "flex";
        document.querySelector("#events-page").style.display = "none";
        document.querySelector("#buy-ticket-page").style.display = "none";
        document.querySelector("#my-tickets-page").style.display = "none";

        showToast("success", "Bem vindo!");
    } else {
        showToast("error", "Matrícula ou senha inválidos.");
    }
}

function handleLogout() {
    document.querySelector("#login-page").style.display = "flex";
    document.querySelector("#sidebar").style.display = "none";
    document.querySelector("#header").style.display = "none";
    document.querySelector(".header-hidden-block").style.display = "none";
    document.querySelector("#home-page").style.display = "none";
    document.querySelector("#events-page").style.display = "none";
    document.querySelector("#buy-ticket-page").style.display = "none";
    document.querySelector("#my-tickets-page").style.display = "none";
}

/* Events */
const events = [
    {
        id: "01",
        name: "CPG - Code Pizza & Glory",
        date: "16/05/2025",
        hour: "22:00",
        local: "Inatel - Prédio 5, salão de eventos",
        description: "Um evento de programação de games e muita pizza!",
        price: 97,
        remaining_tickets: 10,
        image: "https://inatel.br/noticias/images/57658573af741ed37f89fe69e10bc20777c11dca69162c183816a03d9f2745e7_900.webp",
    },
    {
        id: "02",
        name: "Feira de Oportunidades",
        date: "03/06/2025",
        hour: "08:00",
        local: "Inatel - Auditório",
        description: "Palestras com profissionais.",
        price: 10,
        remaining_tickets: 0,
        image: "https://live.staticflickr.com/65535/53804705431_945766d1c6.jpg",
    },
    {
        id: "03",
        name: "Hacktown",
        date: "01/08/2025",
        hour: "08:00",
        local: "ETE FMC - Teatro",
        description: "Início do Hacktown",
        price: 1500,
        remaining_tickets: 50,
        image: "https://engenharia360.com/wp-content/uploads/2024/05/HERO-Credenciamento-07.jpg",
    },
];
const userTickets = [];
let currentEventId = null;

function renderTable(table, events) {
    const tbody = document.querySelector(`.${table}-table tbody`);
    tbody.innerHTML = "";

    events.forEach((evnt) => {
        const row = document.createElement("tr");

        let buttonHTML = "";
        if (userTickets.some((ticket) => ticket.id === evnt.id)) {
            buttonHTML = `<button class="buy-button" onClick="navigateToSeeTicketPage('${evnt.id}')">Visualizar</button>`;
        } else if (evnt.remaining_tickets > 0) {
            buttonHTML = `<button class="buy-button" onClick="navigateToBuyTicketPage('${evnt.id}')">Comprar</button>`;
        } else {
            buttonHTML = "Ingressos esgotados";
        }

        row.innerHTML = `
      <td hidden class="hidden-col event-id">${evnt.id}</td>
      <td class="max-col">${evnt.name}</td>
      <td class="max-col">${evnt.date}</td>
      <td class="max-col">${evnt.hour}</td>
      <td class="max-col">${evnt.local}</td>
      <td class="action-col">
        ${buttonHTML}
      </td>
    `;

        tbody.appendChild(row);
    });
}

function navigateToEventPage() {
    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#header").style.display = "flex";
    document.querySelector(".header-hidden-block").style.display = "block";
    document.querySelector("#home-page").style.display = "none";
    document.querySelector("#events-page").style.display = "flex";
    document.querySelector("#buy-ticket-page").style.display = "none";
    document.querySelector("#my-tickets-page").style.display = "none";
    renderTable("events", events);
    toggleMenu();
}

function navigateToMyTicketsPage() {
    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#header").style.display = "flex";
    document.querySelector(".header-hidden-block").style.display = "block";
    document.querySelector("#home-page").style.display = "none";
    document.querySelector("#events-page").style.display = "none";
    document.querySelector("#buy-ticket-page").style.display = "none";
    document.querySelector("#my-tickets-page").style.display = "flex";
    console.log(userTickets);
    renderTable("my-tickets", userTickets);
}

function renderTicketPage(ticketId) {
    const eventData = events.find((event) => event.id === ticketId);
    if (!eventData) return;

    currentEventId = ticketId;

    document.querySelector("#buy-ticket-page h2").textContent = eventData.name;
    document.querySelector("#buy-ticket-page .event-image").src =
        eventData.image;
    document.querySelector(
        "#buy-ticket-page .event-image"
    ).alt = `Imagem do evento ${eventData.name}`;

    const infoDiv = document.querySelector("#buy-ticket-page .event-info");
    infoDiv.innerHTML = `
        <p>${eventData.description}</p>
        <p>${eventData.remaining_tickets} ingressos restantes.</p>
        <p class="event-details">
            <div><i class="bi bi-calendar-event event-icon"></i> ${
                eventData.date
            } às ${eventData.hour}</div>
            <div><i class="bi bi-geo-alt-fill event-icon"></i> ${
                eventData.local
            }</div>
            <div><i class="bi bi-coin event-icon"></i> R$${eventData.price.toFixed(
                2
            )}</div>
        </p>
    `;

    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#header").style.display = "flex";
    document.querySelector(".header-hidden-block").style.display = "block";
    document.querySelector("#home-page").style.display = "none";
    document.querySelector("#events-page").style.display = "none";
    document.querySelector("#buy-ticket-page").style.display = "flex";
    document.querySelector("#my-tickets-page").style.display = "none";
}

function navigateToBuyTicketPage(ticketId) {
    renderTicketPage(ticketId);
    document.querySelector(".payment-proof-container").style.display = "flex";
    document.querySelector(".qrcode-container").style.display = "none";
}

function navigateToSeeTicketPage(ticketId) {
    renderTicketPage(ticketId);
    document.querySelector(".payment-proof-container").style.display = "none";
    document.querySelector(".qrcode-container").style.display = "flex";
}

document.querySelector("#payment-proof").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileNameSpan = document.querySelector("#file-name");

    if (file) {
        fileNameSpan.textContent = file.name;
    } else {
        fileNameSpan.textContent = "Nenhum arquivo selecionado";
        return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
        showToast("error", "Arquivo inválido. Envie uma imagem ou PDF.");
        e.target.value = "";
        return;
    }

    const alreadyBought = userTickets.some(
        (ticket) => ticket.id === currentEventId
    );
    if (alreadyBought) {
        showToast("warning", "Você já comprou esse ingresso.");
        return;
    }

    const boughtEvent = events.find((ev) => ev.id === currentEventId);
    if (boughtEvent) {
        boughtEvent.remaining_tickets -= 1;
        userTickets.push(boughtEvent);
        showToast("success", `Compra simulada com sucesso.`);
    }

    e.target.value = "";
    navigateToEventPage();
    toggleMenu();
});

function navigateToHome() {
    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#header").style.display = "flex";
    document.querySelector(".header-hidden-block").style.display = "block";
    document.querySelector("#home-page").style.display = "flex";
    document.querySelector("#events-page").style.display = "none";
    document.querySelector("#buy-ticket-page").style.display = "none";
    document.querySelector("#my-tickets-page").style.display = "none";
    toggleMenu();
}

/* Toast */
function showToast(type, message) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = document.createElement("i");
    icon.className =
        {
            success: "bi bi-check-circle",
            warning: "bi bi-exclamation-triangle",
            error: "bi bi-x-circle",
        }[type] || "";

    icon.style.marginRight = "8px";

    const content = document.createElement("span");
    content.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(content);

    const container = document.getElementById("toast-container");
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}
