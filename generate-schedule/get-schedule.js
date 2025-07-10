import pug from 'pug'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import fs from 'fs/promises'

const spreadsheetId = '1ARcVG_sNhWd4k5_LcIjiapKQoj0opMK_NwzAi92c99Y'
const parser = new PublicGoogleSheetsParser(spreadsheetId)

const data = await parser.parse()

console.log(data)

// Helper function to parse date strings like 'Date(2025,8,1)' 
// Note: In this Google Sheets data, months appear to be 0-indexed (8 = September)
function parseDate(dateString) {
  const match = dateString.match(/Date\((\d+),(\d+),(\d+)\)/)
  if (!match) return null
  // Don't subtract 1 from month since Google Sheets data is already using 0-indexed months
  return new Date(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
}

// Create date headers (21 days from September 1 to September 21, 2025)
// Changed back to September since all events are in September
const startDate = new Date(2025, 8, 1) // September 1, 2025 (month is 0-indexed)
const headers = []
const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

for (let i = 0; i < 21; i++) {
  const currentDate = new Date(startDate)
  currentDate.setDate(startDate.getDate() + i)
  const dayName = days[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1] // Adjust for Monday start
  const monthName = months[currentDate.getMonth()]
  const dayNum = currentDate.getDate()
  headers.push(`${dayName}, ${monthName} ${dayNum}`)
}

// Process events and create grid
const processedEvents = data.map(event => {
  const startDate = parseDate(event.START)
  const endDate = parseDate(event.END)
  
  if (!startDate || !endDate) return null
  
  // Calculate day offset from September 1, 2025
  const baseDate = new Date(2025, 8, 1) // September 1, 2025
  const startOffset = Math.floor((startDate - baseDate) / (1000 * 60 * 60 * 24))
  const endOffset = Math.floor((endDate - baseDate) / (1000 * 60 * 60 * 24))
  const colspan = Math.max(1, endOffset - startOffset + 1)
  
  return {
    ...event,
    startOffset,
    endOffset,
    colspan,
    row: event.ROW || 1,
    isShort: event.SHORT === 'yes'
  }
}).filter(event => event !== null)

// Create grid structure
const maxRow = Math.max(...processedEvents.map(e => e.row))
const tbodyGrid = []

for (let row = 1; row <= maxRow; row++) {
  const rowEvents = processedEvents.filter(e => e.row === row)
  const gridRow = []
  let currentCol = 0
  
  // Check if this row has any short events
  const hasShortEvent = rowEvents.some(event => event.isShort)
  
  // Sort events by start offset for this row
  rowEvents.sort((a, b) => a.startOffset - b.startOffset)
  
  for (const event of rowEvents) {
    // Add empty cells before the event if needed
    while (currentCol < event.startOffset) {
      gridRow.push({
        type: 'empty',
        colspan: 1
      })
      currentCol++
    }
    
    // Add the event cell
    gridRow.push({
      type: 'event',
      colspan: event.colspan,
      data: event
    })
    currentCol += event.colspan
  }
  
  // Fill remaining columns with empty cells
  while (currentCol < 21) {
    gridRow.push({
      type: 'empty',
      colspan: 1
    })
    currentCol++
  }
  
  tbodyGrid.push({
    cells: gridRow,
    hasShortEvent: hasShortEvent
  })
}

const schedule = pug.renderFile('schedule.pug', { 
  headers,
  tbodyGrid
})

const html = await fs.readFile('../index.html', 'utf8')

const newHtml = html.replace(/<!-- begin replace -->[\s\S]*?<!-- end replace -->/, '<!-- begin replace -->\n' + schedule + '\n<!-- end replace -->')

await fs.writeFile('../index.html', newHtml)
