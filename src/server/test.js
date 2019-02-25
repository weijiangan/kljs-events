const { prisma } = require("./generated/prisma-client");

async function test() {
  const newUser = await prisma.createUser({
    name: "Wei Jian Gan",
    email: "weijiangan@outlook.com"
  });

  const allUsers = await prisma.users();
  console.log(allUsers);
}

test();
