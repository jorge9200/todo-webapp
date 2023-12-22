import { ToDoItem } from "@/types/todos";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/app/data.json",
      "utf8"
    );
    const objectData = JSON.parse(jsonData);
    return Response.json(objectData.toDos);
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error reading data", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/app/data.json",
      "utf8"
    );
    const objectData = JSON.parse(jsonData);

    const newToDo = await req.json();
    objectData.toDos.push(newToDo);

    const updatedData = JSON.stringify(objectData);

    await fs.writeFile(process.cwd() + "/app/data.json", updatedData);

    return new Response("New ToDo stored successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error storing data", {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/app/data.json",
      "utf8"
    );
    const objectData = JSON.parse(jsonData);
    const editedToDo = await req.json();

    const updatedData = JSON.stringify({
      ...objectData,
      toDos: objectData.toDos.map((toDo: ToDoItem) =>
        toDo.id === editedToDo.id ? editedToDo : toDo
      ),
    });

    await fs.writeFile(process.cwd() + "/app/data.json", updatedData);

    return new Response("Edited ToDo stored successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error storing data", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/app/data.json",
      "utf8"
    );
    const objectData = JSON.parse(jsonData);
    const { id } = await req.json();

    if (id) {
      const updatedData = JSON.stringify({
        ...objectData,
        toDos: objectData.toDos.filter((toDo: ToDoItem) => toDo.id !== id),
      });
      await fs.writeFile(process.cwd() + "/app/data.json", updatedData);
    } else {
      await fs.writeFile(
        process.cwd() + "/app/data.json",
        JSON.stringify({
          ...objectData,
          toDos: [],
        })
      );
    }

    return new Response("ToDo removed successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error storing data", {
      status: 500,
    });
  }
}
