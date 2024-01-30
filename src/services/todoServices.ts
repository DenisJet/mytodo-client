export async function getAllTodos() {
  const res = await fetch('http://localhost:3000/server/get');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
