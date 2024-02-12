import { faker } from "@faker-js/faker";
import * as board from "src/validators/board_validator";
import * as workspace from "src/validators/workspace_validator";
import {
  createUserRequest,
  fakeUser,
  fakeBoard,
  request,
  loginRequest,
  fakeWorkspace,
  createWorkspaceRequest,
  createBoardRequest,
} from "./helpers";

describe("Board Routes", () => {
  const userInput = fakeUser();
  let token = "token";
  let workspaceInput = {} as workspace.CreateInput;
  let workspaceOutput = {} as workspace.CreateOutput;
  let boardInput = {} as board.CreateInput;
  let boardOutput = {} as board.CreateOutput;

  beforeAll(async () => {
    const { body: userOutput } = await createUserRequest(userInput);
    token = await loginRequest(userInput).then((res) => res.body);

    workspaceInput = fakeWorkspace(userOutput.id);
    workspaceOutput = await createWorkspaceRequest(workspaceInput, token).then(
      (res) => res.body,
    );

    boardInput = fakeBoard(workspaceOutput.id);
  });

  it("create board", async () => {
    const { status, body } = await createBoardRequest(boardInput, token);

    expect({ status, body }).toEqual({
      status: 201,
      body: {
        ...boardInput,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });

    boardOutput = body;
  });

  it("update board name", async () => {
    boardOutput.name = faker.person.fullName().toLocaleLowerCase();

    const { status, body } = await request
      .put("/api/board")
      .send(boardOutput)
      .set("Authorization", `Bearer ${token}`);

    boardOutput.updatedAt = body.updatedAt;

    expect({ status, body }).toEqual({
      status: 200,
      body: boardOutput,
    });
  });

  it("get board", async () => {
    const { status, body } = await request
      .get(`/api/board/${boardOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: boardOutput,
    });
  });

  it("get all boards", async () => {
    const { status, body } = await request
      .get("/api/board")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([boardOutput]),
    });
  });

  it("delete board", async () => {
    const { status, body } = await request
      .delete(`/api/board/${boardOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: boardOutput,
    });
  });
});
