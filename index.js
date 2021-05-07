const fetch = require('node-fetch')

const beepInterval = 500
const beepTime = 5 * 1000

const links = {
  arena: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431',
  tempelhof: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158433',
  messe: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434',
  velodrom: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435',
  tegel: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436',
  erika: 'https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158437',
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

const beep = async () => {
  let time = 0
  while(time < beepTime) {
    process.stdout.write('\u0007');
    await sleep(beepInterval)
    time += beepInterval
  }
}

const run = async () => {
  const scan = async () => {
    const response = await fetch('https://api.impfstoff.link/?v=0.3&robot=1')
    const { stats: data } = await response.json()
  
    const open = data.filter(center => center.open)

    if (open.length) {
      console.log(`${new Date().toISOString()} - APPOINTMENT AVAILABLE:`)
      open.forEach((center) => console.log(`${center.name}\nCLICK HERE: ${links[center.id]}`))
      beep()
      await sleep(30 * 1000)
    }
  }

  while (true) {
    await scan()
    await sleep(1000)
  }
}

run()
