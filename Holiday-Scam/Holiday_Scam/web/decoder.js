// decoder.js
function base1377Decode(encoded) {
    const STANDARD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    const CUSTOM   = STANDARD.split('').reverse().join('');   

    let standardBase64 = '';
    for (let char of encoded) {
        const idx = CUSTOM.indexOf(char);
        if (idx === -1) {
            standardBase64 += char; // fallback (handles = padding etc.)
        } else {
            standardBase64 += STANDARD[idx];
        }
    }

    let decodedBase64;
    try {
        decodedBase64 = atob(standardBase64);
    } catch (e) {
        console.error("Base64 decode failed");
        return null;
    }

    const xored = new Uint8Array(decodedBase64.length);
    for (let i = 0; i < decodedBase64.length; i++) {
        xored[i] = decodedBase64.charCodeAt(i);
    }

    const SEED = 1377;
    const XOR_BASE = SEED % 256;   

    const resultBytes = new Uint8Array(xored.length);
    for (let i = 0; i < xored.length; i++) {
        const roll = (XOR_BASE + (i % 255)) % 256;
        resultBytes[i] = xored[i] ^ roll;
    }

    try {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(resultBytes);
    } catch (e) {
        console.error("UTF-8 decode failed");
        return null;
    }
}

console.log("[decoder] Loaded and ready");