@echo off
setlocal
cd /d "%~dp0"

python -m mkdocs build -f "..\mkdocs.yml"
if errorlevel 1 (
	echo [ERROR] Fallo el build de MkDocs.
	exit /b %errorlevel%
)

exit /b 0
