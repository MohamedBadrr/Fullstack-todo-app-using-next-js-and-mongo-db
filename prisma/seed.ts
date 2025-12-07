import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
async function main() {
    // generate fake data for users 
await prisma.todo.createMany({
  data: Array.from({ length: 25 }, () => ({
    title: faker.lorem.words({ min: 2, max: 5 }),
    body: faker.lorem.words({ min: 1, max: 10 }),
  })),
});

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
