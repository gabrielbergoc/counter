import { debounce } from "lodash";

export const getUserCounter = debounce(async () => {
  const token = localStorage.getItem("token") as string;
  const res = await fetch("/api/counter", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const { counter } = await res.json();

  return parseInt(counter);
}, 1000, { leading: true });

export const setUserCounter = debounce(async (counter: number) => {
  const token = localStorage.getItem("token") as string;
  const res = await fetch("/api/counter", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ counter }),
  });
  
  return res.status === 200;
}, 1000);
