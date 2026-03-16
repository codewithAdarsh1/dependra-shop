# Dipendra Mobile & Electronics Repair: $50,000 Website Master Plan

This document outlines the complete technical, visual, and AI implementation strategy for the new website.

---

## 1. The Scroll-Stop Hero Section (The 3D Asset)

### Object Selection: The Premium Flagship Smartphone
**Why?** The core audience experiences sudden mobile hardware failures (cracked screens, dead batteries). Visually dissecting a high-end smartphone with a beautiful 3D animation instantly establishes trust, demonstrates supreme technical capability, and provides the "Awwwards-quality" feeling you want. It immediately tells the user: *"We understand the complex anatomy of your most vital device, and we can fix it."*

### The AI Generation Prompts

**PROMPT A: The Assembled Hero Shot (Midjourney/Stable Diffusion)**
> Professional product photography of a premium flagship smartphone (titanium shell, edge-to-edge glass) centered in frame, shot from a dynamic 3/4 angle. Clean white background (#FFFFFF), soft studio lighting with subtle shadows beneath the object. The smartphone is pristine, brand-new, fully assembled and complete, screen turned off showing deep black glass. Photorealistic rendering, 16:9 aspect ratio, product catalog quality. Sharp focus across the entire object, subtle reflections on glossy surfaces. Minimal, elegant, Apple-style product photography. No text, no logos, no other objects in frame. Shot on Phase One IQ4 150MP, 120mm macro lens, f/8, studio strobe lighting with large softbox above and white bounce cards on sides. Ultra-sharp detail, 8K quality downsampled to 4K --ar 16:9 --stylize 250

**PROMPT B: The Partially Deconstructed View**
> Professional partially disassembled product photography of a premium flagship smartphone, elegantly revealing its internal components against a clean white background (#FFFFFF). The device is slightly opened rather than fully exploded—the front glass panel is lifted and shifted slightly upward, revealing the delicate OLED display ribbon cables. The titanium outer frame is visible, encasing the dense main logic board with gold traces, the Taptic Engine linear actuator, USB-C port, and a sliver of the high-capacity battery cell. The pieces hover extremely close together to maintain the tight, compact silhouette of the original phone while hinting at the complex engineering inside. Soft studio lighting with subtle shadows emphasizing the depth of the revealed circuitry. Components are pristine and hyper-detailed — you can clearly see metallic shielding and precise internal screws. Photorealistic rendering, 16:9 aspect ratio, technical illustration meets high-end product photography. Shot on Phase One IQ4 150MP, focus-stacked for flawless depth of field. Same lighting setup as the assembled shot for visual continuity. --ar 16:9 --stylize 300

**PROMPT C: The Video Transition (Luma / Kling / Runway)**
> *Start Frame:* Upload Image A. *End Frame:* Upload Image B.
> 
> TRANSITION: Smooth, satisfying mechanical deconstruction animation. The phone begins whole and still. After a brief 0.5s pause, the components begin to separate — starting from the top glass pulling upward, progressively revealing the inner dense circuitry. Each layer (display, motherboard, battery, back chassis) lifts and floats outward along clean, deliberate paths. Movement is eased (slow-in, slow-out) with slight subtle rotations on individual pieces like the logic board and screw brackets to reveal their 3D form and metallic reflections. The separation happens over 3 seconds in a cascading sequence, not all at once. The final floating arrangement holds in mid-air for 1.5 seconds. STYLE: Photorealistic, pure white background throughout, consistent high-end studio lighting. Locked-off tripod shot with no camera movement. The only motion is the masterful deconstruction of the hardware. Satisfying, premium, ASMR-like mechanical precision. Think Apple product reveal meets sophisticated engineering visualization.

---

## 2. Groq AI 24/7 Triage Chatbot Integration

### The Problem
Dipendra Mobile Repair's main USP is **24/7 availability**, but humans sleep. If a customer has a cracked screen at 3:00 AM, they need immediate reassurance, an estimated cost, and a way to book the emergency repair before they go to a competitor.

### The Solution: "RescueBot" powered by Groq AI
We will implement an ultra-fast, intelligent chatbot acting as the shop's front-line technical assistant. By using **Groq** (running Llama-3 8b or 70b), responses are generated at *800+ tokens per second*, creating a zero-latency conversational experience that feels like magic.

### Chatbot Architecture & Workflow

1. **The Interface:** A sleek, glassmorphism chat bubble fixed to the bottom right of the website: *"Emergency? Chat with our AI Tech 24/7."*
2. **The System Prompt (Personality):**
   * **Role:** Expert Mobile Repair Technician at Dipendra Mobile in Biratnagar.
   * **Tone:** Urgent, extremely competent, empathetic, and reassuring.
   * **Goal:** Diagnose the hardware/software issue quickly, provide a rough estimate range, and instantly convert the chat into a confirmed WhatsApp appointment or a direct phone call.
3. **The User Flow:**
   * **User:** "I dropped my iPhone 13 in the toilet and it won't turn on."
   * **Groq AI ( instantly ):** "I'm sorry to hear that! Water damage is time-sensitive. DO NOT try to plug it in or turn it on. We are available 24/7 in Biratnagar. Our water damage recovery starts at roughly Rs. 1,500 for the initial ultrasonic cleaning. Can I send you a WhatsApp message now with the shop location so you can bring it right in?"
4. **Handoff:** The conversation is automatically summarized and forwarded via WhatsApp API directly to Dipendra (+977 981-3901303). Dipendra wakes up (or receives the notification) with full context: *"Customer Name: Rahul, Device: iPhone 13, Issue: Water drop, Status: Bringing it in at 8 AM."*

### Why Groq?
Because a slow chat widget kills conversions. Groq's LPU inference engine means the AI replies faster than the user can blink, providing an immediate, VIP-level customer service experience reflecting a premium brand.

---

## 3. Implementation Roadmap

1. **Asset Generation (Week 1):** Use the prompts above in Midjourney and Luma to generate the 4-second scroll-stop video. Convert to `.webm` / `.mp4` for the hero section background.
2. **Web Build (Week 2):** Develop the dark-mode, premium UI (Next.js or Vanilla HTML/Tailwind) featuring the sticky header and 24/7 CTA. Implement scroll-linked scrubbers in GSAP so as the user scrolls down, the phone naturally unpacks itself.
3. **AI Integration (Week 3):**
   * Create a free API key at `console.groq.com`.
   * Set up a lightweight serverless function (Vercel/Cloudflare Workers) to handle the Groq API calls securely.
   * Inject the System Prompt with Biratnagar local knowledge, pricing tiers, and Dipendra's contact info.
   * Integrate WhatsApp click-to-chat API.
4. **Launch & Local SEO (Week 4):** Push live, optimize metadata for *"24/7 mobile repair Biratnagar"*, and connect Google Search Console.
