/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */
  const toolTip = `<div class="tooltip">
  <h1>${d.key}</h1>
  <p><b>Player:</b> ${d.value.Player}</p>
  <p><b>Line Count:</b> ${d.value.Count}</p>
  </div>`
  return toolTip
}
