import { state } from "./state.js";
import { renderHome, renderLens } from "./render.js";

export function navigate(view) {
  state.currentView = view;

  if (view === "home") renderHome();
  if (view === "lens") renderLens();
}

window.selectLens = (lensId) => {
  state.currentLens = lensId;
  navigate("lens");
};

navigate("home");
