import { Value } from "./types";

export const generateId = () => {
  // uuid
  return Math.random().toString(36).substr(2, 9);
};

export const getReadableDateTime = (date: Value) => {
  // convert 2024-08-03T17:16:03.525Z
  // to 3rd Aug 2024 5:16 PM
  return new Date(date as Date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// export const BACKEND_URL = window.location.href;
export const BACKEND_URL = "http://localhost:8080/";
