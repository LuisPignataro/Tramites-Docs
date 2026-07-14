# Tramites Docs

Repositorio de documentacion basado en MkDocs.

## Requisitos

- Python 3.11+
- pip

## Ejecucion local

```bash
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
mkdocs serve
```

La documentacion usa:

- Configuracion: `mkdocs.yml`
- Fuentes: `docs`
- Sitio generado: `site`

## Build local

```bash
mkdocs build
```

## Publicacion automatica

El repositorio incluye workflows en `.github/workflows` para:

- Validar build en cada push y pull request
- Publicar en GitHub Pages desde la rama principal
