const AUTH_STORAGE_KEY = "furns-auth";
const PKCE_STORAGE_KEY = "furns-pkce";

const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080";
const keycloakRealm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "online-store";
const keycloakClientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "online-store-app";

const isBrowser = () => typeof window !== "undefined";

const base64UrlEncode = (value) => {
    const bytes = value instanceof ArrayBuffer ? new Uint8Array(value) : value;
    let binary = "";

    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });

    return window.btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
};

const randomString = (length = 64) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const values = new Uint8Array(length);
    window.crypto.getRandomValues(values);

    return Array.from(values)
        .map((value) => charset[value % charset.length])
        .join("");
};

const createCodeChallenge = async (verifier) => {
    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
};

export const getAccessToken = () => {
    if (!isBrowser()) return null;

    try {
        const auth = JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY) || "null");
        return auth?.access_token || null;
    } catch {
        return null;
    }
};

export const getAuthState = () => {
    if (!isBrowser()) return null;

    try {
        return JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY) || "null");
    } catch {
        return null;
    }
};

export const clearAuthState = () => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(PKCE_STORAGE_KEY);
};

export const authHeaders = () => {
    const token = getAccessToken();
    return token ? {Authorization: `Bearer ${token}`} : {};
};

const startKeycloakFlow = async (redirectPath, endpoint = "auth") => {
    if (!isBrowser()) return;

    const state = randomString(32);
    const verifier = randomString(96);
    const challenge = await createCodeChallenge(verifier);
    const redirectUri = `${window.location.origin}/auth/callback`;

    window.localStorage.setItem(PKCE_STORAGE_KEY, JSON.stringify({
        state,
        verifier,
        redirectPath,
    }));

    const params = new URLSearchParams({
        client_id: keycloakClientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid profile email",
        state,
        code_challenge: challenge,
        code_challenge_method: "S256",
    });

    window.location.assign(`${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/${endpoint}?${params}`);
};

export const loginWithKeycloak = (redirectPath = "/account") => startKeycloakFlow(redirectPath, "auth");

export const registerWithKeycloak = (redirectPath = "/account") => startKeycloakFlow(redirectPath, "registrations");

export const exchangeKeycloakCode = async ({code, state}) => {
    if (!isBrowser()) throw new Error("Authentication callback must run in the browser.");

    const pkce = JSON.parse(window.localStorage.getItem(PKCE_STORAGE_KEY) || "null");
    if (!pkce?.verifier || pkce.state !== state) {
        throw new Error("Invalid authentication state.");
    }

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloakClientId,
        redirect_uri: `${window.location.origin}/auth/callback`,
        code,
        code_verifier: pkce.verifier,
    });

    const response = await fetch(`${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Keycloak token exchange failed.");
    }

    const auth = await response.json();
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        ...auth,
        expires_at: Date.now() + (Number(auth.expires_in || 0) * 1000),
    }));

    window.localStorage.removeItem(PKCE_STORAGE_KEY);
    return {auth, redirectPath: pkce.redirectPath || "/account"};
};

export const decodeJwt = (token) => {
    if (!token || !isBrowser()) return null;

    try {
        const [, payload] = token.split(".");
        return JSON.parse(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch {
        return null;
    }
};

export const getUserProfile = () => {
    const token = getAccessToken();
    const payload = decodeJwt(token);
    if (!payload) return null;

    const realmRoles = payload.realm_access?.roles || [];
    const clientRoles = payload.resource_access?.[keycloakClientId]?.roles || [];

    return {
        name: payload.name || payload.preferred_username || "Furns User",
        email: payload.email || "",
        roles: [...new Set([...realmRoles, ...clientRoles])],
    };
};
