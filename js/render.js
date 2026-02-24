import { lenses } from "../data/lenses.js";
import { content, Generatedcontent } from "../data/content.js"; // Add Generatedcontent here
import { state } from "./state.js";
export function renderHome() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <header class="mb-32 text-center reveal-card">
            <h1 class="serif-font text-6xl lowercase italic tracking-tight mb-4">Nudge</h1>
            <p class="text-xs uppercase tracking-[0.3em] font-medium opacity-60">Sampling the threads of what draws you</p>
        </header>

        <div class="space-y-40">
            ${content.map((item, index) => `
                <section class="reveal-card cursor-pointer" onclick="viewArticle('${item.id}')">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-sm font-bold">${item.id}.</span>
                        <div class="h-px flex-grow bg-black/20"></div>
                    </div>
                    <div class="flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} opaque-border bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div class="md:w-1/2 h-80 ${index % 2 !== 0 ? 'border-l' : 'border-r'} border-black">
                            <img src="${item.image}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700">
                        </div>
                        <div class="md:w-1/2 p-8 flex flex-col justify-center">
                            <span class="text-[10px] font-bold uppercase tracking-widest ${item.color} mb-2">${item.category}</span>
                            <h2 class="serif-font text-3xl mb-4 italic">${item.title}</h2>
                            <p class="text-sm font-light text-gray-600">${item.description}</p>
                        </div>
                    </div>
                </section>
            `).join('')}
        </div>

        <section id="narrow" class="py-40 text-center reveal-card">
            <h3 class="serif-font text-4xl md:text-5xl mb-12">Select a <br> <span class="italic underline decoration-1 underline-offset-8">lens</span> for the hour.</h3>
            <div class="flex flex-col md:flex-row gap-6 justify-center max-w-3xl mx-auto">
                <button onclick="selectLens('builder')" class="flex-1 opaque-border p-10 bg-white hover:bg-[#e7f5f0] transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
                    <span class="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block opacity-40 group-hover:opacity-100">The Builders Path</span>
                    <span class="serif-font text-2xl italic">I want to know how the world functions.</span>
                </button>
                <button onclick="selectLens('thinker')" class="flex-1 opaque-border p-10 bg-white hover:bg-[#f6f0f8] transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
                    <span class="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block opacity-40 group-hover:opacity-100">The Thinkers Path</span>
                    <span class="serif-font text-2xl italic">I want to know how the mind works.</span>
                </button>
            </div>
        </section>
    `;
}

// export function renderLens() {
//     const lens = lenses[state.currentLens];
//     const filtered = content.filter(item => item.lens === state.currentLens);

//     document.getElementById("app").innerHTML = `
//         <div class="mb-20">
//             <button onclick="navigate('home')" class="text-[10px] font-bold uppercase mb-4 opacity-50 hover:opacity-100 transition-opacity">← Back to discovery</button>
//             <p class="text-[10px] uppercase tracking-widest opacity-40">Viewing through:</p>
//             <h1 class="serif-font text-5xl italic">${lens.title}</h1>
//             <p class="text-sm mt-2 opacity-60">You can change this anytime.</p>
//         </div>

//         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
//             ${filtered.map(item => `
//                 <div class="opaque-border bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer" onclick="viewArticle('${item.id}')">
//                     <span class="text-[10px] font-bold uppercase ${item.color}">${item.category}</span>
//                     <h3 class="serif-font text-2xl italic my-2">${item.title}</h3>
//                     <p class="text-xs text-gray-500 line-clamp-2">${item.description}</p>
//                 </div>
//             `).join('')}
//         </div>
//     `;
// }

export function renderReadingMode(articleId) {
    const item = content.find(c => c.id === articleId);
    document.getElementById("app").innerHTML = `
        <article class="max-w-2xl mx-auto py-20">
            <button onclick="window.history.back()" class="text-[10px] font-bold uppercase mb-12 opacity-50 hover:opacity-100 transition-opacity">← Close</button>
            <div class="mb-12">
                <span class="text-[10px] font-bold uppercase tracking-widest ${item.color}">${item.category}</span>
                <h1 class="serif-font text-5xl italic mt-4 mb-6">${item.title}</h1>
                <p class="text-xs uppercase opacity-40 font-bold">${item.readTime || '5 min read'}</p>
            </div>
            <div class="prose prose-lg serif-font text-xl leading-relaxed text-gray-800">
                ${item.fullText || item.description}
            </div>
            <div class="mt-32 pt-12 border-t border-black/10 text-center">
                <p class="serif-font italic text-2xl mb-8">Did this feel interesting?</p>
                <div class="flex justify-center gap-8">
                    <button class="text-[10px] font-bold uppercase border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">👍 More like this</button>
                    <button class="text-[10px] font-bold uppercase border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">↔ Different angle</button>
                    <button class="text-[10px] font-bold uppercase border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">👎 Less of this</button>
                </div>
            </div>
        </article>
    `;
    window.scrollTo(0, 0);
}

// export function renderLens() {
//     const lens = lenses[state.currentLens];
//     const app = document.getElementById("app");

//     app.innerHTML = `
//         <div class="mb-20 reveal-card">
//             <button onclick="navigate('home')" class="text-[10px] font-bold uppercase mb-4 opacity-50 hover:opacity-100 transition-opacity">← Back</button>
//             <h1 class="serif-font text-5xl italic">${lens.title}</h1>
//         </div>

//         <div id="lens-ring"></div>

//         <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
//             ${lens.subdomains.map(sub => `
//                 <div class="subdomain-card h-64 opaque-border bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
//                      onclick="navigate('subdomain_feed', '${sub.id}')">
                    
//                     <div class="subdomain-label inset-0 flex items-center justify-center">
//                         <span class="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">${sub.label}</span>
//                     </div>

//                     <div class="glimpse-layer">
//                         <p class="serif-font text-xl italic ${sub.color} text-center">${sub.glimpse}</p>
//                     </div>
//                 </div>
//             `).join('')}
//         </div>
//     `;

//     setupOpticalLens();
// }

// function setupOpticalLens() {
//     const ring = document.getElementById('lens-ring');
//     const cards = document.querySelectorAll('.subdomain-card');

//     document.addEventListener('mousemove', (e) => {
//         const x = e.clientX;
//         const y = e.clientY;

//         // Move the visual ring
//         ring.style.display = 'block';
//         ring.style.transform = `translate(${x - 80}px, ${y - 80}px)`;

//         // Update the mask position for every card
//         cards.forEach(card => {
//             const rect = card.getBoundingClientRect();
//             // Calculate relative coordinates inside the card
//             const relX = x - rect.left;
//             const relY = y - rect.top;
            
//             card.style.setProperty('--mouse-x', `${relX}px`);
//             card.style.setProperty('--mouse-y', `${relY}px`);
//         });
//     });
// }

export function renderLens() {
    const lens = lenses[state.currentLens];
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="mb-20">
            <button onclick="navigate('home')" class="text-[10px] font-bold uppercase mb-4 opacity-50 hover:opacity-100 transition-opacity">← Back</button>
            <h1 class="serif-font text-5xl italic">${lens.title}</h1>
        </div>

        <div id="lens-ring" style="pointer-events: none; position: fixed; z-index: 50; display: none;"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            ${lens.subdomains.map(sub => `
                <div class="subdomain-card h-64 opaque-border bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative cursor-pointer" 
                     onclick="window.expandSubdomain('${sub.id}')">
                    
                    <div class="subdomain-label inset-0 flex items-center justify-center pointer-events-none">
                        <span class="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">${sub.label}</span>
                    </div>

                    <div class="glimpse-layer pointer-events-none">
                        <p class="serif-font text-xl italic ${sub.color} text-center px-8">${sub.glimpse}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setupOpticalLens();
}

function setupOpticalLens() {
    const ring = document.getElementById('lens-ring');
    const cards = document.querySelectorAll('.subdomain-card');

    // Attach to document to ensure it tracks everywhere
    document.onmousemove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        if (ring) {
            ring.style.display = 'block';
            ring.style.transform = `translate(${x - 80}px, ${y - 80}px)`;
        }

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const relX = x - rect.left;
            const relY = y - rect.top;
            card.style.setProperty('--mouse-x', `${relX}px`);
            card.style.setProperty('--mouse-y', `${relY}px`);
        });
    };
}
window.expandSubdomain = function(subdomainId) {
    // 1. Get the current lens from state (e.g., 'builder' or 'thinker')
    const currentLens = state.currentLens;
    if (currentLens === "thinker" && subdomainId === "psych") {
        renderPsychologyEntry();
        return;
    }
    // 2. Find the content. 
    // We look for an item where the lens matches AND 
    // the category starts with the same letters as our subdomain ID.
    const item = Generatedcontent.find(c => {
        const lensMatch = c.lens === currentLens;
        
        // This maps 'fin' to 'Finance', 'sys' to 'Systems', 'phil' to 'Philosophy', etc.
        const categoryMatch = c.category.toLowerCase().startsWith(subdomainId.toLowerCase().substring(0, 3));
        
        return lensMatch && categoryMatch;
    });
    
    if (!item) {
        console.error(`No generated content found for Lens: ${currentLens}, Subdomain: ${subdomainId}`);
        return;
    }

    const app = document.getElementById("app");
    const overlay = document.createElement('div');
    overlay.className = "fixed inset-0 bg-[#f2eee3] z-[100] overflow-y-auto animate-expand-circle";
    
    // Handle body text whether it is a string with \n or an array
    const bodyHTML = Array.isArray(item.body) 
        ? item.body.map(p => `<p class="mb-8">${p}</p>`).join('') 
        : item.body.split('\n\n').map(p => `<p class="mb-8">${p}</p>`).join('');

    overlay.innerHTML = `
        <div class="max-w-2xl mx-auto px-6 py-20 min-h-screen">
            <button onclick="this.closest('.fixed').remove()" class="text-[10px] font-bold uppercase mb-16 opacity-40 hover:opacity-100 transition-all italic">
                ← Close Card
            </button>
            
            <header class="mb-12">
                <span class="text-[10px] font-bold uppercase tracking-widest opacity-40">${item.category}</span>
                <h1 class="serif-font text-5xl md:text-6xl italic mt-4 leading-tight">${item.provocation}</h1>
            </header>

            <div class="serif-font text-xl leading-relaxed text-gray-800">
                ${bodyHTML}
            </div>

            <div class="mt-20 border-t border-black pt-10 pb-20">
                <p class="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-4 italic">Depth & Expansion</p>
                <a href="${item.exit_link}" target="_blank" class="text-2xl italic underline decoration-1 underline-offset-8 hover:opacity-50 transition-all">
                    ${item.exit_path} →
                </a>
            </div>
        </div>
    `;
    
    app.appendChild(overlay);
};
export function renderSubdomainFeed(subdomainId) {
    const app = document.getElementById("app");
    // You would fetch the specific content generated by your Python script here
    const data = getSubdomainData(subdomainId); 

    app.innerHTML = `
        <div class="fixed inset-0 bg-[#f2eee3] z-[100] overflow-y-auto animate-expand-circle">
            <div class="max-w-2xl mx-auto px-6 py-24">
                <button onclick="navigate('lens')" class="text-[10px] font-bold uppercase mb-12 opacity-50 hover:opacity-100 italic">
                    ← Return to the lens
                </button>
                
                <header class="mb-16">
                    <span class="text-[10px] font-bold uppercase tracking-widest opacity-40">${data.label}</span>
                    <h1 class="serif-font text-5xl italic mt-4">${data.provocation}</h1>
                </header>

                <div class="prose serif-font text-xl leading-relaxed text-gray-800 space-y-8">
                    ${data.body}
                </div>

                <div class="mt-20 p-8 border border-black/10 bg-white/50 italic">
                    <p class="text-sm opacity-60 mb-2">Continue this thread:</p>
                    <a href="${data.exit_link}" target="_blank" class="text-lg underline decoration-1 underline-offset-4 hover:opacity-60 transition-all">
                        ${data.exit_path} →
                    </a>
                </div>
            </div>
        </div>
    `;
}
export function renderExpandedView(id) {
    const item = content.find(i => i.id === id);
    const app = document.getElementById("app");

    // We use the same mouse coordinates from the magnifying glass for the expansion start point
    app.innerHTML = `
        <div class="fixed inset-0 bg-[#f2eee3] z-[100] animate-expand-circle">
            <div class="max-w-2xl mx-auto px-6 py-20">
                <button onclick="navigate('lens')" class="text-[10px] font-bold uppercase mb-16 opacity-40 hover:opacity-100 transition-all italic">
                    ← return to the lens
                </button>
                <h1 class="serif-font text-6xl italic mb-10">${item.provocation}</h1>
                <div class="serif-font text-xl leading-relaxed text-gray-800 space-y-6">
                    ${item.body}
                </div>
                <div class="mt-20 border-t border-black pt-10">
                    <p class="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-4">Depth & Expansion</p>
                    <a href="${item.exit_link}" target="_blank" class="text-2xl italic underline decoration-1 underline-offset-8 hover:opacity-50 transition-all">
                        ${item.exit_path} →
                    </a>
                </div>
            </div>
        </div>
    `;
}


const ESSAY = {
    // ── ROOT ──
    root: {
        id: "root",
        text: `There is a particular kind of attention that happens before you decide to pay attention.

A face across a room. A sentence that snagged. The feeling that something was slightly off before you could name what.

The mind is doing something in those moments — something faster than language, and more opinionated than we usually admit.`,
        fork: {
            prompt: "What interests you about that?",
            left:  { label: "The mechanism. What is actually happening in there.", next: "mech" },
            right: { label: "The meaning. What it says about how we move through the world.", next: "meaning" }
        }
    },

    // ── BRANCH: MECHANISM ──
    mech: {
        id: "mech",
        text: `Researchers call it the "default mode network" — a set of regions that activate not when you focus, but when you stop.

When you daydream. When you let your mind wander between tasks. This network, for a long time, was treated as noise. The brain idling.

It turned out to be the opposite. The default mode network is where the mind does its most integrative work — connecting distant ideas, running simulations of futures that haven't happened, rehearsing conversations, building and rebuilding a model of other people.

The brain isn't resting when you're not focused. It's working on a different problem.`,
        fork: {
            prompt: "Where does that take you?",
            left:  { label: "To the question of what we're actually optimizing for when we think.", next: "optim" },
            right: { label: "To the people who can't turn it off.", next: "cant_stop" }
        }
    },

    // ── BRANCH: MEANING ──
    meaning: {
        id: "meaning",
        text: `There's a word in Japanese — *ma* — that roughly translates to the pause between things. The silence between notes that makes music music, not noise.

The pre-attentive moment might be something like that. Not the thought, but the space the thought arrives into.

What's strange is that the space isn't neutral. It's already shaped — by what you've lost, what you want, what you've been told to want, what you secretly believe about yourself. The attention lands somewhere, and the landing is never random.`,
        fork: {
            prompt: "Which part of that pulls at you?",
            left:  { label: "The shaping. How experience bends the space before we're even aware.", next: "shaping" },
            right: { label: "The secret beliefs. The ones that operate without permission.", next: "secret" }
        }
    },

    // ── LEAVES ──
    optim: {
        id: "optim",
        text: `The uncomfortable answer is: we don't fully know.

Cognitive efficiency is the easy answer — compress the world into patterns so you can navigate it faster. But that can't be all of it. The mind over-generates. It runs simulations of things that will never happen. It replays moments that are over. It constructs elaborate models of people it will never meet again.

That's not efficient. That's something else.

Some researchers think it's about meaning-making — that the mind is less a prediction machine and more a storytelling one. That what it's optimizing for isn't accuracy but coherence. A world that hangs together. A self that makes sense across time.

The cost of that is high. We distort to cohere. We remember what fits and quietly lose what doesn't.

But without it, there is no *you* that persists between moments. Just a sequence of present-tense experiences with no spine.`,
        exit: {
            path: "Anil Seth — Being You",
            link: "https://www.goodreads.com/book/show/58329483-being-you"
        }
    },

    cant_stop: {
        id: "cant_stop",
        text: `There's a particular exhaustion that has nothing to do with what you've done.

It comes from thinking — from the kind of mind that doesn't wait to be asked. That narrates while it lives. That debrefs its own conversations. That lies awake not from worry exactly, but from the sheer volume of processing still running.

Psychologists sometimes call this "high dispositional rumination." The word sounds clinical. The experience is closer to being trapped in a room with someone who will not stop talking — and the someone is you.

What's harder to say is that this same quality, the not-stopping, is also where a lot of insight comes from. The mind that can't leave things alone is the same mind that notices what others walk past.

The cost and the gift are the same feature. There's no surgery for it.`,
        exit: {
            path: "Adam Phillips — On Flirtation",
            link: "https://www.goodreads.com/book/show/276382.On_Flirtation"
        }
    },

    shaping: {
        id: "shaping",
        text: `The psychologist Jerome Bruner spent decades arguing that perception is never innocent.

We don't receive the world — we construct it, using everything we already believe as scaffolding. The stranger you decide looks unfriendly. The room you walk into and immediately distrust. The sentence you read and already know you'll disagree with before you've finished it.

This isn't bias in the pejorative sense. It's architecture. The mind can't process everything, so it builds shortcuts out of experience — and those shortcuts are, necessarily, built from a past that is yours and no one else's.

The unnerving part: you can't see the scaffolding. You only see the building it produces. The perception arrives already finished, already feeling like the world.`,
        exit: {
            path: "Jerome Bruner — Acts of Meaning",
            link: "https://www.goodreads.com/book/show/209736.Acts_of_Meaning"
        }
    },

    secret: {
        id: "secret",
        text: `Freud's most durable idea isn't repression, or the Oedipus complex, or any of the things he's famous for.

It's the observation that we are not the sole authors of our own behavior. That something operates underneath — not malevolently, not mystically, but structurally. A set of beliefs so foundational they never had to be decided. They were absorbed.

The therapist's question — "where do you think that comes from?" — is an invitation to excavate. To find the moment a conclusion was drawn and never revisited. To notice that the thing you believe about yourself might be a story someone else told you when you were too young to argue.

What's strange is that excavating it doesn't always change it. You can know exactly where the pattern comes from and still run it. Understanding is not the same thing as freedom. But it does change the relationship. The pattern is still there — but now you can see it from the outside, at least some of the time.`,
        exit: {
            path: "Alain de Botton — The School of Life",
            link: "https://www.theschooloflife.com/article/the-origin-of-our-psychological-problems/"
        }
    }
};

// ─── STATE ──────────────────────────────────────────────────────────────────

let essayState = {
    path: [],       // node ids visited
    currentId: "root"
};

// ─── ENTRY ──────────────────────────────────────────────────────────────────

function renderPsychologyEntry() {
    essayState = { path: [], currentId: "root" };

    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="fixed inset-0 bg-[#f2eee3] z-[100] overflow-y-auto animate-expand-circle" id="essay-shell">
            <div class="max-w-2xl mx-auto px-6 py-24 min-h-screen">

                <button onclick="navigate('lens')"
                        class="text-[10px] font-bold uppercase mb-20 opacity-30 hover:opacity-100 transition-all italic block">
                    ← Back to Lens
                </button>

                <div id="essay-body" class="space-y-0">
                    <!-- nodes append here -->
                </div>

            </div>
        </div>
    `;

    appendNode("root");
}

// ─── APPEND A NODE ──────────────────────────────────────────────────────────

function appendNode(nodeId) {
    const node = ESSAY[nodeId];
    if (!node) return;

    essayState.path.push(nodeId);
    essayState.currentId = nodeId;

    const body = document.getElementById("essay-body");

    const block = document.createElement("div");
    block.className = "essay-node opacity-0";
    block.style.transform = "translateY(24px)";
    block.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const paragraphs = node.text.trim().split('\n\n').map(p =>
        `<p class="serif-font text-xl leading-relaxed text-gray-800 mb-6">${p.trim()}</p>`
    ).join('');

    if (node.fork) {
        block.innerHTML = `
            <div class="mb-16">
                ${paragraphs}
            </div>

            <div class="mb-24 pl-6 border-l border-black/10">
                <p class="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-8">
                    ${node.fork.prompt}
                </p>
                <div class="flex flex-col gap-3">
                    <button
                        data-next="${node.fork.left.next}"
                        onclick="window._essayChoose('${node.fork.left.next}')"
                        class="essay-choice text-left opaque-border bg-white px-7 py-5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group">
                        <span class="serif-font text-lg italic group-hover:opacity-70 transition-all">
                            ${node.fork.left.label}
                        </span>
                    </button>
                    <button
                        data-next="${node.fork.right.next}"
                        onclick="window._essayChoose('${node.fork.right.next}')"
                        class="essay-choice text-left opaque-border bg-white px-7 py-5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group">
                        <span class="serif-font text-lg italic group-hover:opacity-70 transition-all">
                            ${node.fork.right.label}
                        </span>
                    </button>
                </div>
            </div>
        `;
    } else {
        // Leaf — show ending + exit link
        block.innerHTML = `
            <div class="mb-20">
                ${paragraphs}
            </div>

            <div class="border-t border-black/10 pt-10 pb-32">
                <p class="text-[10px] uppercase font-bold tracking-widest opacity-30 mb-4 italic">
                    follow this further
                </p>
                <a href="${node.exit.link}" target="_blank"
                   class="serif-font text-2xl italic underline decoration-1 underline-offset-8 hover:opacity-40 transition-all">
                    ${node.exit.path} →
                </a>
            </div>
        `;
    }

    body.appendChild(block);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            block.style.opacity = "1";
            block.style.transform = "translateY(0)";
        });
    });

    // Scroll to new block after it appears
    setTimeout(() => {
        block.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
}

// ─── CHOICE ─────────────────────────────────────────────────────────────────

window._essayChoose = function(nextId) {
    // Lock all current choice buttons
    document.querySelectorAll(".essay-choice").forEach(btn => {
        btn.disabled = true;
    });

    // Fade out unchosen buttons
    document.querySelectorAll(".essay-choice").forEach(btn => {
        const dest = btn.getAttribute("data-next");
        if (dest !== nextId) {
            btn.style.transition = "opacity 0.4s ease";
            btn.style.opacity = "0.15";
        }
    });

    // Small pause then continue the essay
    setTimeout(() => appendNode(nextId), 600);
};