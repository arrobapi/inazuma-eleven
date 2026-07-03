# Notas de la importación desde inazuma-eleven-index

Fecha: 2026-07-03

## Qué se hizo
Se importaron los jugadores del fork [`inazuma-eleven-index`](https://github.com/arrobapi/inazuma-eleven-index)
(originalmente en inglés, con datos en `js/players.js` y `js/special_moves.js`) al esquema de
`data/characters.json` de este repositorio (en español).

- **143 jugadores** encontrados en el origen.
- **4 omitidos** por ya existir en este repo con ficha más completa: Mark Evans, Axel Blaze,
  Jude Sharp y Nathan Swift.
- **139 jugadores nuevos** añadidos, con sprites propios copiados a `images/players/<id>.png`.
- Traducción manual al español de las descripciones cortas ("flavor text").
- Traducción de metadatos: elementos (Earth→Tierra, Fire→Fuego, Wind/Wood→Aire/Bosque),
  posiciones (GK/DF/MF/FW → Portero/Defensa/Centrocampista/Delantero), equipos y nombres de juego.
- Las 4 técnicas especiales (SM1–SM4) de cada jugador se mapearon a `supertécnicas_videojuego[]`
  con nombre, tipo, elemento y coste de TP.
- Las estadísticas (Kick, Body, Control, Guard, Speed, Stamina, Guts, FP, TP) se mapearon a
  `estadisticas.<JUEGO>_Lv99`.
- Un jugador duplicado en origen ("Jason Jones", aparece dos veces en el equipo Occult) se
  distinguió con el id `jason_jones` y `jason_jones_2`.

## Qué falta / limitaciones conocidas
- Las descripciones son el "flavor text" corto original, no biografías extensas como las de
  Axel Blaze o Mark Evans. Se pueden ampliar manualmente más adelante.
- No se importaron campos como `nombre_japones`, `alias`, `personalidad` o `historia_breve`
  porque el fork no los tenía disponibles.
- Las imágenes son sprites de juego (pixel art), no artes/retratos como las 6 fichas originales.
- El nombre de las técnicas se mantuvo en inglés (ej. "God Hand") ya que el fork no traía
  traducción oficial al español.

## Cómo se generó
Scripts de migración usados (no forman parte de la web, solo del proceso puntual):
`/home/user/migration/extract.js`, `convert.py`, `translations.json`, `finalize.py`.
