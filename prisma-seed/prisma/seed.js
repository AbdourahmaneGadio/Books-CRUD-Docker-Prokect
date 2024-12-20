const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Seed des catégories
  const sciFiCategory = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Science-fiction" },
  });

  const comicCategory = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Comics" },
  });

  // Seed des auteurs
  const orsonScottCard = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Orson Scott Card" },
  });

  const nkJemisin = await prisma.author.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "N.K. Jemisin" },
  });

  // Seed des livres
  await prisma.book.upsert({
    where: { isbn: "978-2290319741" },
    update: {},
    create: {
      name: "La Stratégie Ender",
      image:
        "https://www.jailu.com/media/cache/couverture_medium/flammarion_img/Couvertures/9782290071823.jpg",
      isbn: "978-2290319741",
      cost: 8.9,
      parutionDate: new Date("1986-01-01"),
      synopsis:
        "Dans un monde futur, un jeune garçon surdoué est formé pour devenir le sauveur de l'humanité face à une menace extraterrestre.",
      categoryId: sciFiCategory.id,
      pageNumber: 398,
      authorId: orsonScottCard.id,
    },
  });

  await prisma.book.upsert({
    where: { isbn: "978-1779516435" },
    update: {},
    create: {
      name: "Far Sector",
      image:
        "https://bdi.dlpdomain.com/album/9791026826835/couv/M385x862/far-sector.jpg",
      isbn: "978-1779516435",
      cost: 24.99,
      parutionDate: new Date("2021-10-26"),
      synopsis:
        "Sojourner 'Jo' Mullein, une Green Lantern nouvellement recrutée, est envoyée dans un secteur lointain de l'univers pour résoudre un mystérieux meurtre.",
      categoryId: comicCategory.id,
      pageNumber: 312,
      authorId: nkJemisin.id,
    },
  });

  console.log("Base de données alimentée avec succès");
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