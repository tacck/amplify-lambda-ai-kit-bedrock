import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postOverview } from "../functions/post-overview/resource";

const schema = a
  .schema({
    generateSummary: a
      .generation({
        aiModel: a.ai.model("Claude 3 Haiku"),
        systemPrompt: `
Please summarize the key points and main topics covered in the content at the following url.
Please provide a summary answer in the language and length specified.
`,
      })
      .arguments({
        url: a.string().required(),
        language: a.string().required(),
        length: a.integer().required(),
      })
      .returns(
        a.customType({
          title: a.string(),
          summary: a.string(),
        })
      ),
  })
  .authorization((allow) => [allow.resource(postOverview)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
