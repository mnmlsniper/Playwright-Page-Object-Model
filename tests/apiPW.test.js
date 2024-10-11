import { test, expect } from "@playwright/test";

test.describe("API challenge", () => {
  let URL = "https://apichallenges.herokuapp.com/";
  let token;

  test.beforeAll(async ({ request }) => {
    // Запросить ключ авторизации
    let response = await request.post(`${URL}challenger`);
    let headers = await response.headers();
    // Передаем токен в тест
    token = headers["x-challenger"];
    // Пример ассерта
    console.log('Это токен'+token);

    expect(headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });

  test("Получить список заданий get /challenges", async ({ request }) => {
    let response = await request.get(`${URL}challenges`, {
      headers: {
        "x-challenger": token,
      },
    });
    let body = await response.json();
    let headers = await response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    console.log(token);
    expect(body.challenges.length).toBe(59);
  });
  test("Отредактировать задание PUT /todos/{id} ", async ({ request }) => {
    const todo = {
      doneStatus: true,
      description: "реклама",
    };
    let response = await request.put(`${URL}todos/122222`, {
      headers: {
        "x-challenger": token,
      },
      data: todo,
    });
    let body = await response.json();
    let headers = await response.headers();
    console.log(token);
    expect(response.status()).toBe(400);
  });
});
