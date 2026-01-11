import { state } from "./state.js";
import { renderHome, renderLens, renderReadingMode } from "./render.js";

export function navigate(view, params = null) {
    state.currentView = view;
    if (view === "home") renderHome();
    if (view === "lens") renderLens();
    if (view === "read") renderReadingMode(params);
}

// MAKE FUNCTIONS GLOBAL
window.navigate = navigate;
window.selectLens = (lensId) => {
    state.currentLens = lensId;
    navigate("lens");
};
window.viewArticle = (id) => {
    navigate("read", id);
};

// Start
navigate("home");