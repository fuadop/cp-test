import { Response } from "express";

type Data = {
  [x: string]: any
};

const handleResponse =
  (res: Response, status: number, message: string, data?: Data) => 
    res.status(status).json({ message, data });

export default handleResponse;
