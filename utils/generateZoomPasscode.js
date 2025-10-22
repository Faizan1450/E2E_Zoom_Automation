// zoomPasscode.js

function generateZoomPasscode(length = 8) {
    if (length < 8) {
        throw new Error("Zoom passcodes must be at least 8 characters long");
    }

    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specials = "!@#$%^&*()-_=+[]{};:,.<>?";

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    // Ensure all categories are present
    let pass = [
        pick(letters),
        pick(numbers),
        pick(specials)
    ];

    // Fill remaining spots
    const all = letters + numbers + specials;
    for (let i = pass.length; i < length; i++) {
        pass.push(pick(all));
    }

    // Shuffle array in-place
    for (let i = pass.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pass[i], pass[j]] = [pass[j], pass[i]];
    }

    return pass.join("");
}

// Export for Node.js usage
export { generateZoomPasscode };

// Or for CommonJS style projects:
// module.exports = { generateZoomPasscode };