// Helpers
const pad = n => String(n).padStart(2, '0');
const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Today as YYYY-MM-DD
function today() {
    return fmt(new Date());
}

// Yesterday as YYYY-MM-DD
function yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return fmt(d);
}

// N days ago as YYYY-MM-DD
function nDaysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return fmt(d);
}



export { today, yesterday, nDaysAgo, convertDateFormat }