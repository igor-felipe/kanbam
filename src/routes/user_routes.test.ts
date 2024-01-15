/* eslint-disable jest/no-export */
import { faker } from "@faker-js/faker";
import * as user from "src/validators/user_validator";
import { createUserRequest, fakeUser, loginRequest, request } from "./helpers";

const userInput = fakeUser();

let token = "token";

let userOutput = {} as user.CreateOutput;

describe("User Routes", () => {
  it("register user", async () => {
    const { status, body } = await createUserRequest(userInput);

    expect({ status, body }).toEqual({
      status: 201,
      body: {
        ...userInput,
        id: expect.any(String),
        password: undefined,
      },
    });

    userOutput = body;
  });

  it("login user", async () => {
    const { status, body } = await loginRequest(userInput);

    token = body;

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.any(String),
    });
  });

  it("update user name", async () => {
    userOutput.name = faker.person.fullName().toLocaleLowerCase();

    const { status, body } = await request
      .put("/api/user")
      .send(userOutput)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: userOutput,
    });
  });

  it("get user", async () => {
    const { status, body } = await request
      .get(`/api/user/${userOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: userOutput,
    });
  });

  it("get all users", async () => {
    const { status, body } = await request
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([userOutput]),
    });
  });

  it("delete user", async () => {
    const { status, body } = await request
      .delete(`/api/user`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: userOutput,
    });
  });
});
