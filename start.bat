@echo off
echo Demarrage de l'application Gestion des Taches...
echo.

echo Demarrage du backend...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Demarrage du frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Les deux serveurs sont en cours de demarrage...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause