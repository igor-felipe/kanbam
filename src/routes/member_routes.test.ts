import * as member from "src/validators/member_validator";
import * as workspace from "src/validators/workspace_validator";
import * as user from "src/validators/user_validator";
import {
  createUserRequest,
  createWorkspaceRequest,
  fakeUser,
  fakeWorkspace,
  loginRequest,
  request,
} from "./helpers";

describe("Member Routes", () => {
  const userInput = fakeUser();
  const user2Input = fakeUser();
  let userOutput = {} as user.CreateOutput;
  let user2Output = {} as user.CreateOutput;
  let token = "token";
  let workspaceInput = {} as workspace.CreateInput;
  let workspaceOutput = {} as workspace.CreateOutput;
  let memberInput = {} as member.CreateInput;
  let member2Input = {} as member.CreateInput;

  beforeAll(async () => {
    //
    userOutput = await createUserRequest(userInput).then((res) => res.body);
    user2Output = await createUserRequest(user2Input).then((res) => res.body);
    token = await loginRequest(userInput).then((res) => res.body);
    workspaceInput = fakeWorkspace(userOutput.id);
    workspaceOutput = await createWorkspaceRequest(workspaceInput, token).then(
      (res) => res.body,
    );
    memberInput = {
      role: "admin",
      workspaceId: workspaceOutput.id,
      userId: userOutput.id,
    };

    member2Input = {
      role: "admin",
      workspaceId: workspaceOutput.id,
      userId: user2Output.id,
    };
  });

  it("create member", async () => {
    const { status, body } = await request
      .post("/api/member")
      .set("Authorization", `Bearer ${token}`)
      .send(member2Input);

    expect({ status, body }).toEqual({
      status: 201,
      body: member2Input,
    });
  });

  it("update member role", async () => {
    const { status, body } = await request
      .put("/api/member")
      .send({
        role: "user",
        workspaceId: workspaceOutput.id,
        userId: user2Output.id,
      })
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: {
        role: "user",
        workspaceId: workspaceOutput.id,
        userId: user2Output.id,
      },
    });

    member2Input = body;
  });

  it("get member", async () => {
    const { status, body } = await request
      .get(`/api/member/${memberInput.workspaceId}/${memberInput.userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: memberInput,
    });
  });

  it("get all members", async () => {
    const { status, body } = await request
      .get("/api/member")
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: expect.arrayContaining([memberInput]),
    });
  });

  it("delete member", async () => {
    const { status, body } = await request
      .delete(`/api/member/${member2Input.workspaceId}/${member2Input.userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect({ status, body }).toEqual({
      status: 200,
      body: member2Input,
    });
  });
});
