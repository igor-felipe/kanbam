/* eslint-disable prefer-destructuring */
import { faker } from "@faker-js/faker";
import * as repo from "./column_repository";
import * as helpers from "../routes/helpers";
import * as board from "../validators/board_validator";
import * as column from "../validators/column_validator";
import { prisma } from "./prisma";

describe("column_repository", () => {
  const userInput = {
    ...helpers.fakeUser(),
    id: faker.string.nanoid(8),
  };

  const workspaceInput = {
    ...helpers.fakeWorkspace(userInput.id),
    id: faker.string.nanoid(8),
  };

  const boardInput = {
    ...helpers.fakeBoard(workspaceInput.id),
    id: faker.string.nanoid(8),
  };

  let boardOutput = {} as board.CreateOutput;

  let columnInput = {} as column.CreateInput;

  let columnOutput = {} as Promise<column.CreateOutput>;

  beforeAll(async () => {
    const output = await prisma
      .$transaction([
        prisma.user.create({ data: userInput }),
        prisma.workspace.create({ data: workspaceInput }),
        prisma.board.create({
          data: {
            ...boardInput,
            labels: { createMany: { data: boardInput.labels ?? [] } },
          },
          select: {
            description: true,
            workspaceId: true,
            name: true,
            labels: { select: { id: true, name: true, color: true } },
            id: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
      ])
      .catch((e) => {
        throw e;
      });

    boardOutput = output[2];

    columnInput = helpers.fakeColumn({
      boardId: boardOutput.id,
    });

    columnOutput = repo.create(columnInput);
    //
  });

  it("should create column in the database", async () => {
    expect(await columnOutput).toStrictEqual({
      ...columnInput,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      id: expect.any(String),
    });
  });

  it("should throw error if column already exists", async () => {
    const output = await repo.create(columnInput).catch((e) => e.message);

    expect(output).toContain("Unique constraint failed");
  });

  describe("update", () => {
    it("should update column description", async () => {
      const input = await columnOutput;
      input.description = "update description";
      const output = await repo.update(input);

      expect(output).toStrictEqual({
        ...input,
        updatedAt: expect.any(Date),
      });
    });
  });

  describe("getOne", () => {
    it("should get column in the database by id", async () => {
      const input = await columnOutput;
      const output = await repo.getOne({ id: input.id });

      expect(output).toStrictEqual(await columnOutput);
    });

    it("should throw error if no column found", async () => {
      const output = await repo.getOne({ id: "" }).catch((e) => e.message);

      expect(output).toStrictEqual("No Column found");
    });
  });

  describe("findMany", () => {
    it("should get all the columns of a board", async () => {
      const input = await columnOutput;
      const output = await repo.findMany({ boardId: input.boardId });

      expect(output).toStrictEqual(
        expect.arrayContaining([await columnOutput]),
      );
    });
  });

  describe("delete", () => {
    it("should delete column in the database", async () => {
      const output = await repo.deleteOne(await columnOutput);

      expect(output).toStrictEqual(await columnOutput);
    });

    it("should throw error if no column found", async () => {
      const output = await repo.deleteOne({ id: "" }).catch((e) => e.message);

      expect(output).toContain("Record to delete does not exist");
    });
  });
});
