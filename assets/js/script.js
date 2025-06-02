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
const events = [
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
    cardIndex = (cardIndex + 1) % events.length;
    updateCarousel();
}

function prevCard() {
    cardIndex = (cardIndex - 1 + events.length) % events.length;
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

createCards(events);
