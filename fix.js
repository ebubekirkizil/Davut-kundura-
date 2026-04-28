const fs = require('fs');
const path = require('path');

const conflictDir = path.join(__dirname, 'src', 'app', '(shop)', 'products', '[id]');
const newDir = path.join(__dirname, 'src', 'app', '(shop)', 'products', '_id');

if (fs.existsSync(conflictDir)) {
    fs.renameSync(conflictDir, newDir);
    console.log("✅ Hata cozumu uygulandi: Catisan klasor saf disi birakildi.");
} else {
    console.log("✅ Klasor zaten duzenlenmis.");
}
