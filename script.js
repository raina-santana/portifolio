/* ===========================================
   PORTFOLIO - RAINÃ SANTANA
===========================================*/

// ===============================
// Navbar (fundo ao rolar)
// ===============================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ===============================
// Typing Effect
// ===============================
const typing = document.getElementById("typing");
if (typing) {
    const words = [
        "Front-end Developer",
        "Designer Gráfico",
        "Fotógrafo",
        "UI Designer",
        "Criador de Interfaces"
    ];
    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function type() {
        const current = words[wordIndex];
        if (!deleting) {
            typing.textContent = current.substring(0, letterIndex);
            letterIndex++;
            if (letterIndex > current.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            typing.textContent = current.substring(0, letterIndex);
            letterIndex--;
            if (letterIndex < 0) {
                deleting = false;
                wordIndex++;
                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
            }
        }
        setTimeout(type, deleting ? 40 : 90);
    }
    type();
}

// ===============================
// Scroll Reveal
// ===============================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: .15 });

document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade");
    observer.observe(section);
});

// ===============================
// Voltar ao topo
// ===============================
const topo = document.getElementById("topo");
if (topo) {
    topo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===============================
// Scroll suave nos links internos
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const destinoId = this.getAttribute("href");
        const destino = document.querySelector(destinoId);
        if (!destino) return;
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth" });

        // fecha o menu mobile ao clicar em um link, se estiver aberto
        const navUl = document.querySelector("nav ul");
        if (navUl) navUl.classList.remove("showMenu");
    });
});

// ===============================
// Cards 3D (efeito de tilt no mouse)
// ===============================
const cards = document.querySelectorAll(".project");
cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / 18);
        const rotateY = ((x - centerX) / 18);
        card.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});

// ===============================
// Partículas de fundo
// ===============================
const particles = document.getElementById("particles");
if (particles) {
    for (let i = 0; i < 80; i++) {
        const dot = document.createElement("span");
        dot.classList.add("particle");
        dot.style.left = Math.random() * 100 + "vw";
        dot.style.top = Math.random() * 100 + "vh";
        dot.style.animationDuration = (5 + Math.random() * 8) + "s";
        dot.style.animationDelay = Math.random() * 5 + "s";
        dot.style.width = (2 + Math.random() * 5) + "px";
        dot.style.height = dot.style.width;
        particles.appendChild(dot);
    }
}

// ===============================
// Mouse Glow
// ===============================
const glow = document.createElement("div");
glow.className = "mouseGlow";
document.body.appendChild(glow);
window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// ===============================
// Contador de números (caso existam .counter na página)
// ===============================
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    counter.innerText = "0";
    const update = () => {
        const target = +counter.dataset.target;
        const current = +counter.innerText;
        const increment = target / 80;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };
    update();
});

// ===============================
// Navbar ativa conforme scroll
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        if (top >= offset && top < offset + height) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===============================
// Filtro de Projetos
// ===============================
const buttons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");

function aplicarFiltro(filtro) {
    projects.forEach(project => {
        project.style.display = (project.dataset.category === filtro) ? "block" : "none";
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        aplicarFiltro(button.dataset.filter);
    });
});

// Aplica o filtro padrão (Programação) já na carga da página,
// já que agora é a primeira aba e deve vir ativa sem precisar clicar
const filtroInicial = document.querySelector(".filters button.active");
if (filtroInicial) {
    aplicarFiltro(filtroInicial.dataset.filter);
}

// ==========================================
// LINKS RÁPIDOS DOS CARDS (Ver Projeto / Código)
// Impede que o clique neles abra o modal do card
// ==========================================
document.querySelectorAll(".quick-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    link.addEventListener("keydown", (e) => {
        e.stopPropagation();
    });
});

// ==========================================
// MODAL DOS PROJETOS
// ==========================================
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalDemo = document.getElementById("modalDemo");
const modalBehance = document.getElementById("modalBehance");
const closeModal = document.querySelector(".close-modal");
const projectCards = document.querySelectorAll(".project");

let ultimoElementoFocado = null;

function abrirModal(card) {
    ultimoElementoFocado = document.activeElement;

    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.title || "";

    modalTitle.textContent = card.dataset.title || "";
    modalDescription.textContent = card.dataset.description || "";

    modalTech.innerHTML = "";
    const techs = (card.dataset.tech || "").split("•");
    techs.forEach(tech => {
        const trimmed = tech.trim();
        if (!trimmed) return;
        const span = document.createElement("span");
        span.textContent = trimmed;
        modalTech.appendChild(span);
    });

    modalGithub.href = card.dataset.github || "#";
    modalDemo.href = card.dataset.demo || "#";
    modalBehance.href = card.dataset.behance || "#";

    modalDemo.style.display = (!card.dataset.demo || card.dataset.demo === "#") ? "none" : "inline-flex";
    modalGithub.style.display = (!card.dataset.github || card.dataset.github === "#") ? "none" : "inline-flex";
    modalBehance.style.display = (!card.dataset.behance || card.dataset.behance === "#") ? "none" : "inline-flex";

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    if (closeModal) closeModal.focus();
}

projectCards.forEach(card => {
    card.addEventListener("click", () => abrirModal(card));

    // acessibilidade: permite abrir com Enter/Espaço via teclado (cards têm role="button")
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrirModal(card);
        }
    });
});

function fecharModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    if (ultimoElementoFocado) ultimoElementoFocado.focus();
}

if (closeModal) closeModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        fecharModal();
    }
});

// ==========================================
// PRELOAD DAS IMAGENS DOS PROJETOS
// ==========================================
projectCards.forEach(card => {
    const img = new Image();
    img.src = card.dataset.image;
});

// ===============================
// Menu Mobile
// ===============================
const menu = document.querySelector(".menu-mobile");
const ul = document.querySelector("nav ul");
if (menu && ul) {
    menu.addEventListener("click", () => {
        ul.classList.toggle("showMenu");
    });
    menu.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            ul.classList.toggle("showMenu");
        }
    });
}

// ===============================
// Ano dinâmico no rodapé
// ===============================
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

// ===============================
// Console
// ===============================
console.log(`
██████╗
██╔══██╗
██████╔╝
██╔══██╗
██║  ██║
╚═╝  ╚═╝
Portfolio desenvolvido por Rainã Santana.
`);
