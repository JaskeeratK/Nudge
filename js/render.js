import { lenses } from "../data/lenses.js";
import { content } from "../data/content.js";
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

export function renderLens() {
    const lens = lenses[state.currentLens];
    const filtered = content.filter(item => item.lens === state.currentLens);

    document.getElementById("app").innerHTML = `
        <div class="mb-20">
            <button onclick="navigate('home')" class="text-[10px] font-bold uppercase mb-4 opacity-50 hover:opacity-100 transition-opacity">← Back to discovery</button>
            <p class="text-[10px] uppercase tracking-widest opacity-40">Viewing through:</p>
            <h1 class="serif-font text-5xl italic">${lens.title}</h1>
            <p class="text-sm mt-2 opacity-60">You can change this anytime.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${filtered.map(item => `
                <div class="opaque-border bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer" onclick="viewArticle('${item.id}')">
                    <span class="text-[10px] font-bold uppercase ${item.color}">${item.category}</span>
                    <h3 class="serif-font text-2xl italic my-2">${item.title}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2">${item.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

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