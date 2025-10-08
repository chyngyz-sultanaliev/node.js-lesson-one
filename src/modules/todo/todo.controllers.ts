import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
interface Todo {
  id: string;
  name: string;
  age: number;
}

let data: Todo[] = [{ id: uuidv4(), name: "idiris", age: 19 }];

const getAllData = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getAllData:${error}`,
    });
  }
};

const addNewData = (req: Request, res: Response) => {
  try {
    const { name, age } = req.body;

    if (!name || typeof age !== "number") {
      return res.status(400).json({
        success: false,
        message: "Поля 'name' и 'age' обязательны",
      });
    }

    const newData: Todo = { id: uuidv4(), name, age };
    data.push(newData);

    res.status(201).json({
      message: "Данные успешно добавлены",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

const updateData = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const index = data.findIndex((item: Todo) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    data[index] = { ...data[index], ...updatedData };

    res.status(200).json({
      success: true,
      message: "Данные успешно обновлены",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ошибка при обновлении данных",
      error,
    });
  }
};

const deleteData = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    data.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Данные успешно удалены",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ошибка при удалении данных",
      error,
    });
  }
};

export default { getAllData, addNewData, updateData, deleteData };
