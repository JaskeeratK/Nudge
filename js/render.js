import { lenses } from "../data/lenses.js";
import { content, Generatedcontent } from "../data/content.js"; // Add Generatedcontent here
import { state } from "./state.js";
export function renderHome() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <header class="mb-32 text-center reveal-card">
            <h1 class="serif-font text-6xl lowercase italic tracking-tight mb-4">Opaque Insights.</h1>
            <p class="text-xs uppercase tracking-[0.3em] font-medium opacity-60">Sample the threads of thought</p>
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