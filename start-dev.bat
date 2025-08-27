@echo off
echo Starting AlignIQ Development Environment...
echo.
echo This will start both the React frontend and Node.js backend server.
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:3001
echo.
pause
start "AlignIQ Frontend" cmd /k "npm run dev"
start "AlignIQ Backend" cmd /k "npm run server"
