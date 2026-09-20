import { afterEach, describe, expect, it } from "vitest";
import { getAdminEmails, isAdminEmail } from "@/lib/supabase/config";

const originalAdminEmails = process.env.ADMIN_EMAILS;
const originalAdminEmail = process.env.ADMIN_EMAIL;

afterEach(() => {
  if (originalAdminEmails === undefined) delete process.env.ADMIN_EMAILS;
  else process.env.ADMIN_EMAILS = originalAdminEmails;

  if (originalAdminEmail === undefined) delete process.env.ADMIN_EMAIL;
  else process.env.ADMIN_EMAIL = originalAdminEmail;
});

describe("admin email allowlist", () => {
  it("normalizes comma-separated administrator emails", () => {
    process.env.ADMIN_EMAILS = " Owner@Example.com, manager@example.com ";

    expect(getAdminEmails()).toEqual([
      "owner@example.com",
      "manager@example.com",
    ]);
    expect(isAdminEmail("OWNER@example.com")).toBe(true);
  });

  it("rejects emails outside the allowlist", () => {
    process.env.ADMIN_EMAILS = "owner@example.com";

    expect(isAdminEmail("visitor@example.com")).toBe(false);
    expect(isAdminEmail(null)).toBe(false);
  });
});
