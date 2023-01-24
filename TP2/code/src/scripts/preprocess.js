/* eslint-disable prefer-const */
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
    const secondWordIndex = line.Player.indexOf(' ') + 1
    if (secondWordIndex !== 0) {
      const endFirstWord = line.Player.substring(1, secondWordIndex).toLowerCase()
      const startSecondWord = line.Player.substring(secondWordIndex, secondWordIndex + 1).toUpperCase()
      const endSecondWord = line.Player.substring(secondWordIndex + 1).toLowerCase()
      line.Player = start + endFirstWord + startSecondWord + endSecondWord
    } else {
      const end = line.Player.substring(1).toLowerCase()
      line.Player = start + end
    }
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
  const newData = []
  const acts = []
  data.forEach(line => {
    if (!acts.includes(line.Act)) {
      newData.push({ Act: line.Act, Players: [] })
      acts.push(line.Act)
    }

    newData.forEach(actLines => {
      if (actLines.Act === line.Act) {
        let playerExists = false
        actLines.Players.forEach(playerLines => {
          if (playerLines.Player === line.Player) {
            playerLines.Count++
            playerExists = true
          }
        })
        if (!playerExists) actLines.Players.push({ Player: line.Player, Count: 1 })
      }
    })
  })

  return newData
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
  const newData = []

  // iterate trough the acts
  data.forEach(act => {
    // reset the players array
    let Players = []
    let other = { Player: 'Other', Count: 0 }

    // Add the top 5 players to the players array
    top.forEach(player => {
      Players.push({ Player: player, Count: 0 })
    })

    // Add the 'Other' player to the players array
    Players.push(other)

    // iterate trough the players
    act.Players.forEach((player) => {
      // if the player is in the top 5,
      // add it's count to the corresponding player in thr players array
      if (top.includes(player.Player)) Players.find(p => p.Player === player.Player).Count += player.Count

      // if the player is not in the top 5,
      // add it's count to the 'Other' player in the players array
      else Players.find(p => p.Player === 'Other').Count += player.Count
    })
    // Sort the players in alphabetical order
    Players.sort((a, b) => a.Player.localeCompare(b.Player))

    // add the players array to the act in the new data
    newData.push({ Act: act.Act, Players: Players })
  })

  return newData
}
