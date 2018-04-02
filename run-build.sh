#!/bin/bash
npm run build && cp -r build/index.html build/script.js build/style.css api /Applications/XAMPP/xamppfiles/htdocs
#npm run build && cp build/index.html build/script.js build/style.css api -r C:/xampp/htdocs