import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { username: 'Alice' },
    update: {},
    create: {
      username: 'Alice',
      email: 'alice@prisma.io',
      firstname: 'Alice',
      lastname: 'Boomer',
    },
  })

  console.log({ alice})
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