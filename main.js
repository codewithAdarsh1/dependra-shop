// ============================================
//  LENIS SMOOTH SCROLL
// ============================================
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ============================================
//  GSAP SETUP
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Sticky header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});

// Hero entry animation
gsap.fromTo('.fade-up',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power4.out", delay: 0.3 }
);

// Generic reveal
document.querySelectorAll('.reveal-up').forEach((el) => {
    gsap.fromTo(el,
        { y: 70, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
        }
    );
});


// ============================================
//  HERO CANVAS SEQUENCE
// ============================================
const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 192;
const currentFrame = i => `phone-sequence-img/${(i + 1).toString().padStart(5, '0')}.png`;

const images = [];
const phoneSequence = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderCanvas();
}

function renderCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const img = images[phoneSequence.frame];
    if (img && img.complete) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
}

images[0].onload = renderCanvas;
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

gsap.to(phoneSequence, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    },
    onUpdate: renderCanvas
});

const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});

heroTl
    .to("#hero-text-1", { opacity: 0, y: -50, duration: 20 })
    .to("#hero-text-2", { opacity: 1, y: 0, duration: 15 }, "+=10")
    .to("#hero-text-2", { opacity: 1, duration: 15 })
    .to("#hero-text-2", { opacity: 0, y: -50, duration: 10 })
    .to("#hero-text-3", { opacity: 1, y: 0, duration: 15 }, "+=10")
    .to("#hero-text-3", { opacity: 1, duration: 15 });


// ============================================
//  SHOP IMAGE DATA (all 7 photos)
// ============================================
const shopImages = [
    { src: "shop img/1488367e-0ea3-4331-80d4-a06d7a14b035.jpg", caption: "Main Workshop — Dipendra Repair Lab" },
    { src: "shop img/324c6b9e-6af9-4126-bc74-264772ed2b69.jpg", caption: "Precision Workstation" },
    { src: "shop img/41c820a4-ed6c-4d31-a794-e16dbf137c43.jpg", caption: "Component Level Diagnostics" },
    { src: "shop img/72c5b25b-a775-4858-9a85-4862fe7e3aa5.jpg", caption: "Tools of the Trade" },
    { src: "shop img/c5a7acf8-79da-4f0a-a3e6-64963d121a43.jpg", caption: "Professional Lab Environment" },
    { src: "shop img/ea28babe-3606-4212-b0af-d9428e1e6a74.jpg", caption: "Customer Repair Intake" },
    { src: "shop img/eba85172-48ba-4cc1-81d5-1d6673a556ca.jpg", caption: "Late Night Operations — 24/7" },
];

// ============================================
//  LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxThumbsEl = document.getElementById('lightbox-thumbs');
let currentLightboxIndex = 0;

// Build thumbnails strip
shopImages.forEach((item, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'lb-thumb';
    thumb.setAttribute('data-index', i);
    thumb.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy">`;
    thumb.addEventListener('click', () => goToLightboxFrame(i));
    lightboxThumbsEl.appendChild(thumb);
});

function openLightbox(index) {
    currentLightboxIndex = index;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightbox();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function goToLightboxFrame(index) {
    currentLightboxIndex = index;
    updateLightbox();
}

function updateLightbox() {
    const item = shopImages[currentLightboxIndex];
    // Fade effect
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption;
        lightboxCaption.textContent = `${currentLightboxIndex + 1} / ${shopImages.length} — ${item.caption}`;
        lightboxImg.style.opacity = 1;
    }, 150);
    lightboxImg.style.transition = 'opacity 0.3s ease';
    // Update active thumb
    document.querySelectorAll('.lb-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === currentLightboxIndex);
    });
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + shopImages.length) % shopImages.length;
    updateLightbox();
});
document.getElementById('lightbox-next').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % shopImages.length;
    updateLightbox();
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
        currentLightboxIndex = (currentLightboxIndex + 1) % shopImages.length;
        updateLightbox();
    }
    if (e.key === 'ArrowLeft') {
        currentLightboxIndex = (currentLightboxIndex - 1 + shopImages.length) % shopImages.length;
        updateLightbox();
    }
});

// About grid: clicking images opens lightbox at that index
document.querySelectorAll('[data-gallery-open]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        openLightbox(parseInt(el.getAttribute('data-gallery-open')));
    });
});

// "View All" button in about section — opens lightbox
document.getElementById('open-gallery-btn').addEventListener('click', () => {
    openLightbox(3); // starts at the 4th image (index 3), user can browse all 7
});


// ============================================
//  GROQ AI CHATBOT — RescueBot
// ============================================
const GROQ_API_KEY = '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';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are TechMate, the expert AI repair advisor for Dipendra Mobile & Electronics Repair Center, located at Biratnagar 56613, Nepal. You operate 24/7, 365 days a year.

Your personality: Confident, technically expert, warm and reassuring. You diagnose issues fast and give immediate actionable advice.

Your goals:
1. Quickly identify the device and the problem from the user's message.
2. Give a brief, confident technical assessment.
3. Provide a rough price range in Nepali Rupees (NPR). Use realistic local market estimates:
   - Smartphone screen replacement: Rs. 800 – Rs. 5,000 depending on model
   - Smartphone battery: Rs. 600 – Rs. 2,000
   - Water damage recovery: Rs. 1,500 – Rs. 4,000
   - Laptop screen: Rs. 3,500 – Rs. 12,000
   - Laptop motherboard: Rs. 2,000 – Rs. 15,000
   - Software / virus removal: Rs. 500 – Rs. 1,500
4. Always end by inviting them to call or WhatsApp: +977 981-3901303. We are open 24/7 so reassure them there's no need to wait until morning.

Keep responses short (max 3 short paragraphs). Be direct and conversational. Never say you cannot help.`;

let chatHistory = []; // stores { role, content } for context
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatWindow = document.getElementById('ai-chat-window');
const botTrigger = document.getElementById('ai-bot-trigger');
const chatClose = document.getElementById('chat-close');

// Toggle chat window
botTrigger.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
        chatInput.focus();
    }
});
chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role === 'user' ? 'user-msg' : 'bot-msg'}`;
    div.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = `<p><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const ti = document.getElementById('typing-indicator');
    if (ti) ti.remove();
}

async function sendMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = '';
    chatInput.disabled = true;
    chatSend.disabled = true;

    appendMessage('user', userText);
    chatHistory.push({ role: 'user', content: userText });

    showTypingIndicator();

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...chatHistory
                ],
                max_tokens: 350,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'API error');
        }

        const botReply = data.choices[0].message.content;
        chatHistory.push({ role: 'assistant', content: botReply });

        removeTypingIndicator();
        appendMessage('bot', botReply);

    } catch (err) {
        removeTypingIndicator();
        appendMessage('bot', `Sorry, I'm having a connection issue right now. Please call us directly at +977 981-3901303 — we're available 24/7! ⚡`);
        console.error('Groq API Error:', err);
    } finally {
        chatInput.disabled = false;
        chatSend.disabled = false;
        chatInput.focus();
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
