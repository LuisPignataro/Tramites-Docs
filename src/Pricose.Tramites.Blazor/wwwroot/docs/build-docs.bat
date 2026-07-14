@echo off
setlocal
cd /d "%~dp0"

set "DEST=..\src\Pricose.Tramites.Blazor\wwwroot\docs"
set "SRC=..\site"

python -m mkdocs build -f "..\mkdocs.yml"
if errorlevel 1 (
	echo [ERROR] Fallo el build de MkDocs.
	exit /b %errorlevel%
)

if not exist "%DEST%" mkdir "%DEST%"

robocopy "%SRC%" "%DEST%" /MIR /NFL /NDL /NJH /NJS /NP
set "RC=%ERRORLEVEL%"
if %RC% GEQ 8 (
	echo [ERROR] Fallo la copia hacia %DEST%.
	exit /b %RC%
)

echo [OK] Sitio copiado en %DEST%
exit /b 0
