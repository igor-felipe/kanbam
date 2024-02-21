import { faker } from "@faker-js/faker";
import * as card from "src/validators/card_validator";
import * as workspace from "src/validators/workspace_validator";
import * as board from "src/validators/board_validator";
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
  fakeCard,
  fakeColumn,
  createColumnRequest,
  createCardRequest,
} from "./helpers";

describe("Card Routes", () => {
  const userInput = fakeUser();
  let token = "token";
  let workspaceInput = {} as workspace.CreateInput;
  let workspaceOutput = {} as workspace.CreateOutput;
  let boardInput = {} as board.CreateInput;
  let boardOutput = {} as board.CreateOutput;
  let columnInput = {} as column.CreateInput;
  let columnOutput = {} as column.CreateOutput;
  let cardInput = {} as card.CreateInput;
  let cardOutput = {} as card.CreateOutput;

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
    columnOutput = await createColumnRequest(columnInput, token).then(
      (res) => res.body,
    );

    cardInput = fakeCard({
      columnId: columnOutput.id,
      userId: userOutput.id,
      labels: boardOutput.labels.map((label) => label.id),
      members: [{ userId: userOutput.id, workspaceId: workspaceOutput.id }],
    });
  });

  it("create card", async () => {
    const { status, body } = await createCardRequest(cardInput, token);

    expect({ status, body }).toEqual({
      status: 201,
      body: {
        ...cardInput,
        activity: {
          date: expect.any(String),
          ...cardInput.activity,
        },
        labels: boardOutput.labels,
        userId: undefined,
        archived: false,
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });

    cardOutput = body;
  });

  it("update card title", async () => {
    cardOutput.title = faker.person.fullName().toLocaleLowerCase();

    const { status, body } = await request
      .put("/api/card")
      .send(cardOutput)
      .set("Authorization", `Bearer ${token}`);

    cardOutput.updatedAt = body.updatedAt;
    expect({ status, body }).toEqual({
      status: 200,
      body: {
        ...cardOutput,
        activity: { ...cardOutput.activity, date: expect.any(String) },
      },
    });
  });

  it("get card", async () => {
    const { status, body } = await request
      .get(`/api/card/${cardOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: {
        ...cardOutput,
        activity: expect.arrayContaining([
          { ...cardOutput.activity, date: expect.any(String) },
        ]),
      },
    });
  });

  it("get all cards", async () => {
    const { status, body } = await request
      .get("/api/card")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([
        {
          ...cardOutput,
          activity: expect.arrayContaining([
            { ...cardOutput.activity, date: expect.any(String) },
          ]),
        },
      ]),
    });
  });

  it("delete card", async () => {
    const { status, body } = await request
      .delete(`/api/card/${cardOutput.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: {
        ...cardOutput,
        activity: expect.arrayContaining([
          { ...cardOutput.activity, date: expect.any(String) },
        ]),
      },
    });
  });
});