#!/bin/bash

# יצירת תיקיות אם הן לא קיימות
mkdir -p config
mkdir -p scripts

# העברת קבצי קונפיגורציה לתיקיית config
mv eslint.config.js config/ 2>/dev/null
mv postcss.config.js config/ 2>/dev/null
mv postcss.config.cjs config/ 2>/dev/null
mv tailwind.config.js config/ 2>/dev/null
mv tsconfig*.json config/ 2>/dev/null
mv vite.config.ts config/ 2>/dev/null

# העברת סקריפטים לתיקיית scripts
mv clean_project.sh scripts/ 2>/dev/null
mv organize_project.sh scripts/ 2>/dev/null
mv print_new_tree.py scripts/ 2>/dev/null
mv src/tree.py scripts/ 2>/dev/null

# העברת קבצי סביבה לתיקיית config
mv .env config/ 2>/dev/null

# יצירת תיקיית .config והעברת קבצי קונפיגורציה נוספים
mkdir -p .config
mv .bolt .config/ 2>/dev/null
mv .npmrc .config/ 2>/dev/null
mv aisettings .config/ 2>/dev/null

# הדפסת מבנה הפרויקט החדש
echo "ארגון הפרויקט הושלם. המבנה החדש:"
tree -a -I 'node_modules|dist|.git' 