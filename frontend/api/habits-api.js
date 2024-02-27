const BASE_URL = "http://127.0.0.1:3000";

export const createHabit = (title) =>
  fetch(`${BASE_URL}/habit/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  })
    .then(async (response) => {
      const json = await response.json();
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .catch((err) => {
      alert(err.error);
    });

export const updateHabitDone = (id, done) =>
  fetch(`${BASE_URL}/habit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done,
    }),
  });

export const getTodayHabits = () =>
  fetch(`${BASE_URL}/habits/today`).then((response) => response.json());

export const getAllHabits = () =>
  fetch(`${BASE_URL}/habits`).then((response) => response.json());
