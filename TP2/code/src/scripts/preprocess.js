
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  data.map(line => {
    const start = line.Player.substring(0, 1).toUpperCase()
    const end = line.Player.substring(1).toLowerCase()

    line.Player = start + end
  })

  return data
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  const map = new Map()
  const names = []
  data.forEach(line => {
    if (map.has(line.Player)) map.set(line.Player, (map.get(line.Player) + 1))
    else map.set(line.Player, 1)
  })

  const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]))
  const iterator = sortedMap.entries()
  for (var i = 0; i < 5; i++) {
    names[i] = iterator.next().value[0]
  }

  return names
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  const lines = []
  const acts = []
  const actLines = []

  data.forEach(line => {
    if (!acts.includes(line.Act)) acts.push(line.Act)
  })

  acts.forEach(act => {
    const players = []
    data.forEach(line => {
      if (line.Act === act) {
        if (!players.includes(line.Player)) players.push(line.Player)
      }
    })

    players.forEach(player => {
      let count = 0
      data.forEach(line => {
        if (line.Act === act && line.Player === player) count++
      })
      actLines.push({ Player: player, Count: count })
    })
    lines.push({ Act: act, Players: actLines })
  })

  return lines
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  return []
}
