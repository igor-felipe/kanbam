import { faker } from "@faker-js/faker";
import * as board from "src/validators/board_validator";
import * as workspace from "src/validators/workspace_validator";
import * as column from "src/validators/column_validator";

import {
  createUserRequest,
  fakeUser,
  fakeBoard,
  request,
  loginRequest,
  fakeWorkspace,
  createWorkspaceRequest,
  createBoardRequest,
  createColumnRequest,
  fakeColumn,
} from "./helpers";

describe("column routes", () => {
  const userInput = fakeUser();
  let token = "token";
  let workspaceInput = {} as workspace.CreateInput;
  let workspaceOutput = {} as workspace.CreateOutput;
  let boardInput = {} as board.CreateInput;
  let boardOutput = {} as board.CreateOutput;
  let columnInput = {} as column.CreateInput;
  let columnOutput = {} as column.CreateOutput;

  beforeAll(async () => {
    const { body: userOutput } = await createUserRequest(userInput);
    token = await loginRequest(userInput).then((res) => res.body);

    workspaceInput = fakeWorkspace(userOutput.id);
    workspaceOutput = await createWorkspaceRequest(workspaceInput, token).then(
      (res) => res.body,
    );
    boardInput = fakeBoard(workspaceOutput.id);
    boardOutput = await createBoardRequest(boardInput, token).then(
      (res) => res.body,
    );

    columnInput = fakeColumn({ boardId: boardOutput.id });
  });

  it("create column", async () => {
    const { status, body } = await createColumnRequest(columnInput, token);

    expect({ status, body }).toEqual({
      status: 201,
      body: {
        ...columnInput,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });

    columnOutput = body;
  });

  it("update column name", async () => {
    columnOutput.name = faker.person.fullName().toLocaleLowerCase();

    const { status, body } = await request
      .put("/api/column")
      .send(columnOutput)
      .set("Authorization", `Bearer ${token}`);

    columnOutput.updatedAt = body.updatedAt;

    expect({ status, body }).toEqual({
      status: 200,
      body: columnOutput,
    });
  });

  it("get column", async () => {
    const { status, body } = await request
      .get(`/api/column/${columnOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: columnOutput,
    });
  });

  it("get all columns", async () => {
    const { status, body } = await request
      .get("/api/column")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([columnOutput]),
    });
  });

  it("delete column", async () => {
    const { status, body } = await request
      .delete(`/api/column/${columnOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: columnOutput,
    });
  });
});
