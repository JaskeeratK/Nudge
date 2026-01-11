import { lenses } from "../data/lenses.js";
import { state } from "./state.js";

export function renderHome() {
  document.getElementById("app").innerHTML = `
    <header class="mb-32 text-center">
      <h1 class="serif-font text-6xl italic">Opaque Insights.</h1>
    </header>

    <section class="text-center">
      <button onclick="selectLens('builder')">Builder</button>
      <button onclick="selectLens('thinker')">Thinker</button>
    </section>
  `;
}

export function renderLens() {
  const lens = lenses[state.currentLens];

  document.getElementById("app").innerHTML = `
    <h1 class="serif-font text-5xl italic">${lens.title}</h1>
    <p>${lens.description}</p>
    <!-- cards rendered here -->
  `;
}
