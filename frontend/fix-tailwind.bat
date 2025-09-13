@echo off
echo Correction de Tailwind CSS...

echo Desinstallation de l'ancienne version...
npm uninstall tailwindcss

echo Installation de Tailwind CSS v3...
npm install -D tailwindcss@^3.4.0

echo Tailwind CSS corrige!
pause