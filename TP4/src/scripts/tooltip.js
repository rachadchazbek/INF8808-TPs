/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  d = { ...d, GDP: d.GDP.toFixed(2), CO2: d.CO2.toFixed(2) }

  return (
    '<strong>Country :</strong> <span class="tooltip-value">' + d['Country Name'] + '</span><br>' +
    '<strong>Population :</strong> <span class="tooltip-value">' + d.Population + '</span><br>' +
    '<strong>GDP :</strong> <span class="tooltip-value">' + d.GDP + ' $ (USD)</span><br>' +
    '<strong>CO2 emissions :</strong> <span class="tooltip-value">' + d.CO2 + ' metric tonnes</span><br>')
}
