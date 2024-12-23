import { defineSchema, defineTable } from "convex/server";

export default defineSchema({

	workspaces: defineTable({}),

    documents: defineTable({}),
});