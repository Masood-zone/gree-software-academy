import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/courses/publish/route";

describe("publish API", () => {
  it("returns 400 if no id", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req as Request);
    const json = await res.json();
    expect((res as any).status).toBe(400);
    expect(json.error).toBeTruthy();
  });
});
