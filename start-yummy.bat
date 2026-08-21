@echo off
setlocal
cd /d %~dp0

where py >nul 2>&1
if %errorlevel%==0 (
  start "Yummy Local Server" cmd /k py -m http.server 8080
  ping 127.0.0.1 -n 3 > nul
  start http://localhost:8080
  exit /b 0
)

where python >nul 2>&1
if %errorlevel%==0 (
  start "Yummy Local Server" cmd /k python -m http.server 8080
  ping 127.0.0.1 -n 3 > nul
  start http://localhost:8080
  exit /b 0
)

echo Python was not found. Opening the cached site directly in your browser.
start "" index.html
exit /b 0
