import { describe, it, expect } from "vitest";
import { assignmentSchema } from "@/lib/schemas/assignments";

describe("assignment schema", () => {
  it("accepts a valid payload", () => {
    const payload = {
      title: "Homework 1",
      instructions: "Do this",
      link: "https://example.com",
    };
    const result = assignmentSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects short title", () => {
    const payload = { title: "Hi" };
    const result = assignmentSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
