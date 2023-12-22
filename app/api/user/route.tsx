import { promises as fs } from "fs";

export async function POST(req: Request) {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/app/data.json",
      "utf8"
    );
    const objectData = JSON.parse(jsonData);

    const newUser = await req.json();
    objectData.users.push(newUser);

    const updatedData = JSON.stringify(objectData);

    await fs.writeFile(process.cwd() + "/app/data.json", updatedData);

    return new Response("New User registered successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error on user register", {
      status: 500,
    });
  }
}
