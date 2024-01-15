import { faker } from "@faker-js/faker";
import * as workspace from "src/validators/workspace_validator";
import { createUserRequest, fakeUser, fakeWorkspace, request } from "./helpers";

describe("Workspace Routes", () => {
  let token = "token";
  let workspaceInput = {} as workspace.CreateInput;
  let workspaceOutput = {} as workspace.CreateOutput;
  const user = fakeUser();
  beforeAll(async () => {
    const { body } = await createUserRequest(user);
    token = await request
      .post("/api/user/login")
      .send(user)
      .then((res) => res.body);

    workspaceInput = fakeWorkspace(body.id);
  });

  it("create workspace", async () => {
    const { status, body } = await request
      .post("/api/workspace")
      .set("Authorization", `Bearer ${token}`)
      .send(workspaceInput);

    expect({ status, body }).toEqual({
      status: 201,
      body: {
        ...workspaceInput,
        id: expect.any(String),
        password: undefined,
      },
    });

    workspaceOutput = body;
  });

  it("update workspace name", async () => {
    workspaceOutput.name = faker.person.fullName().toLocaleLowerCase();

    const { status, body } = await request
      .put("/api/workspace")
      .send(workspaceOutput)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: workspaceOutput,
    });
  });

  it("get workspace", async () => {
    const { status, body } = await request
      .get(`/api/workspace/${workspaceOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: workspaceOutput,
    });
  });

  it("get all workspaces", async () => {
    const { status, body } = await request
      .get("/api/workspace")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([workspaceOutput]),
    });
  });

  it("delete workspace", async () => {
    const { status, body } = await request
      .delete(`/api/workspace/${workspaceOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: workspaceOutput,
    });
  });
});
