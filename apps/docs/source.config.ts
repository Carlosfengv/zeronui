import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema.extend({
      dependencies: z.array(z.string()).optional(),
      installer: z.string().optional(),
      previewSize: z.enum(["default", "compact"]).optional(),
    }),
  },
});

export default defineConfig();
