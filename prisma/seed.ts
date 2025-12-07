import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
async function main() {
  // Example: Fetch all records from a collection
  // Replace 'user' with your actual model name
  const allUsers = await prisma.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));

  // generate fake data for users 
  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.internet.username(),
  //   })),
  // });

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
