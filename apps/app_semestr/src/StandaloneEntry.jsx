import { createRoot } from "react-dom/client";
import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css?inline";
import applicationCss from "./index.css?inline";
import { App } from "./App";

const STYLE_ELEMENT_ID = "maya0552-app-semestr-styles";
const mountedRoots = new WeakMap();

/**
 * Vloží Bootstrap a vlastní CSS aplikace přímo do dokumentu.
 *
 * CSS je součástí výsledného JavaScriptového bundlu, takže funguje
 * i v hostitelské aplikaci, která načítá pouze StandaloneEntry.js
 * a samostatný style.css automaticky nepřipojí.
 */
const ensureStyles = () => {
    let styleElement = document.getElementById(STYLE_ELEMENT_ID);

    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = STYLE_ELEMENT_ID;
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = `${bootstrapCss}\n${applicationCss}`;
};

/**
 * Připojí aplikaci Semestr do elementu poskytnutého hostitelskou aplikací.
 *
 * @param {HTMLElement} el Element, do kterého se aplikace vykreslí.
 * @param {Object} [props={}] Vlastnosti předané hlavní komponentě App.
 * @returns {Function} Funkce pro odpojení aplikace.
 */
export function mount(el, props = {}) {
    if (!el) {
        throw new Error("Semestr application mount failed: missing mount element.");
    }

    ensureStyles();

    const previousRoot = mountedRoots.get(el);

    if (previousRoot) {
        previousRoot.unmount();
    }

    const root = createRoot(el);
    mountedRoots.set(el, root);
    root.render(<App {...props} />);

    return () => {
        root.unmount();
        mountedRoots.delete(el);
    };
}

// Hostitelský frontend používá globální objekt pro spuštění aplikace.
if (typeof window !== "undefined") {
    window.MyApp = { mount };
}