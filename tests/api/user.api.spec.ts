import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data";
import fileHelpers from "../helpers/file-helpers.js";

test.describe("User API tests", () => {
  let envConfig = undefined;

  test.beforeEach("Get the env config", async ({ request }, testInfo) => {
    envConfig = testInfo.project.use as any;

    log("info", "Starting a new test...");
  });

  test("GET - Retrieve list of users", async ({ request }) => {
    // Make GET API call
    await log("info", ` make a get call using ${envConfig.apiURL}`);
    const res = await request.get(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`,
      {
        headers: {
          "x-api-key": process.env.RES_RES_API_KEY,
        },
      },
    )

    //Assert the status code
    expect(res.status()).toBe(200);
    await log("info", `The GET call successful with status ${res.status()}`);

    //Get list of users from response body
    const userData = await res.json();
    log("info", `List of users: ${JSON.stringify(userData)}`);

    //Write the user data to a file
    fileHelpers.writeFile(`${process.cwd()}/data/api-res/list-of-users.json`, `${JSON.stringify(userData, undefined, 4)}`);

  });



  //POST Call
  test("POST - Create a new user", async ({ request }) => {
    //Make POST API call
    await log("info", ` make a post call using ${envConfig.apiURL}`);

    const payload = TestData.apiUserCreation()[0];

    const res = await request.post(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`,
      {
        headers: {
          "x-api-key": process.env.RES_RES_API_KEY,
          "Content-Type": "application/json",
        },
        data: payload,
      },
    );

    //Assert the status code
    expect(res.status()).toBe(201);
    await log("info", `The POST call successful with status ${res.status()}`);

    //Get list of users from response body
    const respData = await res.json();
    log("info", `List of users: ${JSON.stringify(respData)}`);
  });
});
  
