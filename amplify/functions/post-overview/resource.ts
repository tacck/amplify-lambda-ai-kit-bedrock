import { defineFunction } from "@aws-amplify/backend";

export const postOverview = defineFunction({
  name: "post-overview",
  entry: "./handler.ts",
  timeoutSeconds: 60,
  memoryMB: 128,
  runtime: 22,
  architecture: "arm64",
  environment: {
    ARTICLE_URL:
      "https://aws.amazon.com/jp/blogs/mobile/building-a-gen-ai-powered-manufacturing-search-engine-with-aws-amplify-gen-2/",
    LANGUAGE: "Japanese",
    LENGTH: "300",
  },
});
