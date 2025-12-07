import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
async function main() {
    // generate fake data for users 
      await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
       title: faker.lorem.text(),
       body:faker.lorem.paragraph(),
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
