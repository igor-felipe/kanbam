// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "../app";
import * as user from "../validators/user_validator";
import * as workspace from "../validators/workspace_validator";
import * as member from "../validators/member_validator";

export const request = supertest(app);

export const createUserRequest = (input: user.CreateInput) =>
  request
    .post("/api/user/register")
    .send(input)
    .catch((e) => {
      throw new Error(`create user error: ${e.response}`);
    });

export const loginRequest = (input: user.LoginInput) =>
  request
    .post("/api/user/login")
    .send(input)
    .catch((e) => {
      throw new Error(`login user error: ${e.response}`);
    });

export const createWorkspaceRequest = (
  input: workspace.CreateDbInput,
  token: string,
) =>
  request
    .post("/api/workspace")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create workspace error: ${e.response}`);
    });

export const createMemberRequest = (
  input: member.CreateDbInput,
  token: string,
) =>
  request
    .post("/api/member")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create member error: ${e.response}`);
    });

export const fakeUser = () => ({
  password: faker.string.nanoid(8),
  email: faker.internet.email().toLocaleLowerCase(),
  name: faker.person.fullName().toLocaleLowerCase(),
});

export const fakeWorkspace = (userId: string): workspace.CreateInput => ({
  name: faker.string.nanoid(8),
  userId,
});
