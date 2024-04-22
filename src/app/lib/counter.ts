export async function getCounter() {
  const token = localStorage.getItem("token") as string;
  const res = await fetch("/api/counter", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const { counter } = await res.json();

  return parseInt(counter);
}
