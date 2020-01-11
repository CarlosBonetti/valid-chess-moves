import { getPositionColor } from "../util";

describe("getPositionColor", () => {
  it("should return whether the position color is black or white", () => {
    ["a1", "a3", "b2", "b4", "e5"].map(pos => {
      expect(getPositionColor(pos as any)).toEqual("black");
    });
    ["a2", "a4", "b1", "b3", "d5"].map(pos => {
      expect(getPositionColor(pos as any)).toEqual("white");
    });
  });
});
