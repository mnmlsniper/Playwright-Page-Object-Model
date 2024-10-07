import { test, expect } from "@playwright/test";

test.describe.only("API challenge", () => {
  let URL = "https://apichallenges.herokuapp.com/";
  let token;

  test.beforeEach(async ({ request }) => {
    // Запросить ключ авторизации
    let response = await request.post(`${URL}challenger`);
    let headers = await response.headers();
    // Передаем токен в тест
    token = headers["x-challenger"];
    // Пример ассерта
    expect(headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });

  test.skip("Получить список заданий get /challenges @API", async ({
    request,
  }) => {
    let response = await request.get(`${URL}challenges`, {
      headers: {
        "x-challenger": token,
      },
    });
    let body = await response.json();
    let headers = await response.headers();
    console.log(body.challenges.length);
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.challenges.length).toBe(59);
  });
  test("Отредактировать задание PUT /todos/{id} @API", async ({ request }) => {
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
    expect(response.status()).toBe(400);
  });
});
