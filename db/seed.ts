import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  // delete table records
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();


  // populate table with data
  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully!");
}

main();
