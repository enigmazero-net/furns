const AUTH_STORAGE_KEY = "furns-auth";
const PKCE_STORAGE_KEY = "furns-pkce";

const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://178.105.114.143/keycloak";
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

const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));

const sha256Fallback = (message) => {
    const bytes = Array.from(message, (char) => char.charCodeAt(0));
    const bitLength = bytes.length * 8;
    const words = [];
    const hash = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ];
    const constants = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];

    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);

    for (let i = 0; i < bytes.length; i += 4) {
        words.push((bytes[i] << 24) | (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3]);
    }
    words.push(Math.floor(bitLength / 0x100000000));
    words.push(bitLength);

    for (let i = 0; i < words.length; i += 16) {
        const chunk = words.slice(i, i + 16);
        const schedule = [...chunk];

        for (let j = 16; j < 64; j += 1) {
            const s0 = rightRotate(schedule[j - 15], 7) ^ rightRotate(schedule[j - 15], 18) ^ (schedule[j - 15] >>> 3);
            const s1 = rightRotate(schedule[j - 2], 17) ^ rightRotate(schedule[j - 2], 19) ^ (schedule[j - 2] >>> 10);
            schedule[j] = (schedule[j - 16] + s0 + schedule[j - 7] + s1) >>> 0;
        }

        let [a, b, c, d, e, f, g, h] = hash;

        for (let j = 0; j < 64; j += 1) {
            const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
            const ch = (e & f) ^ ((~e) & g);
            const temp1 = (h + s1 + ch + constants[j] + schedule[j]) >>> 0;
            const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (s0 + maj) >>> 0;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) >>> 0;
        }

        hash[0] = (hash[0] + a) >>> 0;
        hash[1] = (hash[1] + b) >>> 0;
        hash[2] = (hash[2] + c) >>> 0;
        hash[3] = (hash[3] + d) >>> 0;
        hash[4] = (hash[4] + e) >>> 0;
        hash[5] = (hash[5] + f) >>> 0;
        hash[6] = (hash[6] + g) >>> 0;
        hash[7] = (hash[7] + h) >>> 0;
    }

    return new Uint8Array(hash.flatMap((value) => [
        (value >>> 24) & 0xff,
        (value >>> 16) & 0xff,
        (value >>> 8) & 0xff,
        value & 0xff,
    ]));
};

const randomString = (length = 64) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const values = new Uint8Array(length);
    if (!window.crypto?.getRandomValues) {
        throw new Error("Secure browser crypto is required to start login.");
    }

    window.crypto.getRandomValues(values);

    return Array.from(values)
        .map((value) => charset[value % charset.length])
        .join("");
};

const createCodeChallenge = async (verifier) => {
    if (!window.crypto?.subtle?.digest) {
        return base64UrlEncode(sha256Fallback(verifier));
    }

    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
};

export const getAccessToken = () => {
    if (!isBrowser()) return null;

    try {
        const auth = JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY) || "null");
        if (auth?.expires_at && Number(auth.expires_at) <= Date.now()) {
            clearAuthState();
            return null;
        }
        return auth?.access_token || null;
    } catch {
        return null;
    }
};

export const isSignedIn = () => Boolean(getAccessToken());

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
