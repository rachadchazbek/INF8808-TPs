import { range } from './util.js'
/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  const neighborhoods = new Set(data.map(d => d.Arrond_Nom))
  return Array.from(neighborhoods)
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  // TODO : Filter the data by years
  const years = range(start, end)
  return data.filter(d => years.includes(d.Date_Plantation.getFullYear()))
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  // TODO : Summarize the data
  const result = []
  const neighborhoods = new Set(data.map(d => d.Arrond_Nom))
  const years = new Set(data.map(d => d.Date_Plantation.getFullYear()))

  for (const neighborhood of neighborhoods) {
    for (const year of years) {
      const count = data.filter(d => d.Arrond_Nom === neighborhood && d.Date_Plantation.getFullYear() === year).length
      result.push({
        Arrond_Nom: neighborhood,
        Plantation_Year: year,
        Comptes: count
      })
    }
  }

  return result
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0
  const years = range(start, end)
  const result = []
  for (const neighborhood of neighborhoods) {
    for (const year of years) {
      const found = data.find(d => d.Arrond_Nom === neighborhood && d.Plantation_Year === year)
      if (found) {
        result.push(found)
      } else {
        result.push({
          Arrond_Nom: neighborhood,
          Plantation_Year: year,
          Comptes: 0
        })
      }
    }
  }

  console.log(result)

  return result
}
