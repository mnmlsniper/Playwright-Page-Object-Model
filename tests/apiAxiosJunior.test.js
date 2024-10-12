import { test, expect } from "@playwright/test";
import {ChallengerService } from '../src/services/challenger.service';
import { ChallengesService } from '../src/services/challenges.service';

let challenger = new ChallengerService();
let challenges = new ChallengesService();

test.describe("API challenge v2", () => {
  let token;

  test.beforeAll(async ({ }) => {
    // Запросить ключ авторизации
    let r = await challenger.post();
    token = r.headers["x-challenger"];
      expect(r.headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });

  test("Получить список заданий get /challenges @API", async ({ }) => {
    const headers = {
        "x-challenger": token,
      };
    let response = await challenges.get(headers);
      expect(response.status).toBe(200);
      expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
      expect(response.data.challenges.length).toBe(59);
  });
});