import { LessonFetchParams } from "@/interfaces/lessons.interface";
import axios from "axios";

export const getLessonsService = async (params?: LessonFetchParams) => {
  const queryParams = new URLSearchParams();

  if (params?.name) queryParams.append("name", params.name);
  if (params?.speaks) queryParams.append("speaks", params.speaks);
  if (params?.price) queryParams.append("price", String(params.price));

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  const res = await axios.get("api/get-lesson"+ queryString);
  return res.data;
};