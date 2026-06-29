# Inazuma Eleven – Enciclopedia de Personajes

Web 100% estática (HTML + CSS + JS) lista para **GitHub Pages**. Sin PHP, sin base de datos.

Datos extraídos de: https://inazuma.fandom.com/es/wiki/Axel_Blaze

## Estructura
```
/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── characters.json    ← añade aquí más personajes
└── images/
    ├── axel.jpg
    ├── mark.jpg
    ├── jude.jpg
    ├── nathan.jpg
    ├── shawn.jpg
    └── xavier.jpg
```

## characters.json
Ejemplo real (Axel Blaze):

```json
{
  "id": "axel_blaze",
  "nombre": "Axel Blaze",
  "nombre_japones": "豪炎寺修也 (Gōenji Shūya)",
  "posicion": "Delantero",
  "elemento": "Fuego",
  "dorsal": 10,
  "equipos": ["Instituto Kirkwood", "Instituto Raimon", "Inazuma Japón"],
  "supertécnicas_anime": [
    {"nombre": "Tornado de fuego", "tipo": "Tiro", "elemento": "Fuego"},
    {"nombre": "Tormenta de fuego", "tipo": "Tiro", "elemento": "Fuego"}
    ...
  ],
  "estadisticas": {
    "IE1_EU_Lv99": {"Tiro":79, "Físico":66, ...}
  }
}
```

Campos recomendados: `id`, `nombre`, `nombre_japones`, `alias[]`, `genero`, `posicion`, `elemento`, `dorsal`, `equipos[]`, `descripcion`, `personalidad`, `imagen`, `supertécnicas_anime[]`, `supertécnicas_videojuego[]`, `estadisticas{}`, `tags[]`, `fuente`.

## Despliegue en GitHub Pages
1. Crea repo `tu-usuario.github.io` o `inazuma-eleven`
2. Sube todos los archivos de esta carpeta a la rama `main`, raíz.
3. Settings → Pages → Deploy from a branch → main / root
4. Listo: https://tu-usuario.github.io/

Funciona 100% client-side con `fetch('data/characters.json')`.

## Añadir más personajes
Edita `data/characters.json`, copia la estructura de Axel Blaze. 
Las imágenes van en `/images/` y referéncialas como `"imagen": "images/tu_personaje.jpg"`.

Extraído de la Inazuma Eleven Wiki ES – uso fan/educativo.
