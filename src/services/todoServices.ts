export async function getAllTodos() {
  const res = await fetch('http://localhost:3000/server/get');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function addNewTodo(todo: TypeTodo) {
  return await fetch('http://localhost:3000/server/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(id: string) {
  return await fetch(`http://localhost:3000/server/${id}`, {
    method: 'DELETE',
  });
}

export async function updateTodo(todo: TypeTodo, id: string) {
  return await fetch(`http://localhost:3000/server/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(todo),
  });
}

type TypeTodo = {
  title: string | undefined;
  description: string | undefined;
  state: string | undefined;
};
