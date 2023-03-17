/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  console.log(d)
  return `<p>Country: ${d.Country}</p> <p>Population: ${d.Population}</p> <p>GDP: ${d.GDP}</p> <p>CO2: ${d.CO2}</p>`
}
