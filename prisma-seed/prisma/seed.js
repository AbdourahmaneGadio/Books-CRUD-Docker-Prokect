const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const astroBot = await prisma.games.upsert({
    where: { idgames: 1 },
    update: {},
    create: {
      name: 'Astro Bot',
      cost: 49.99,
      category: 'Platform'
    },
  });

  const sparkingZero = await prisma.games.upsert({
    where: { idgames: 2 },
    update: {},
    create: {
      name: 'Dragon Ball: Sparking ZERO',
      cost: 69.99,
      category: 'Fighting'
    },
  })

  console.log({ astroBot, sparkingZero })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })