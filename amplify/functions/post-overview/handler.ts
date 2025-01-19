import type { Handler } from "aws-lambda";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/post-overview";
import { Schema } from "../../data/resource";

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
  env
);
Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: Handler = async (event, context) => {
  if (!process.env.ARTICLE_URL || process.env.ARTICLE_URL.length === 0) {
    return `ARTICLE_URL is wrong value: ${process.env.ARTICLE_URL}`;
  }
  if (!process.env.LANGUAGE || process.env.LANGUAGE.length === 0) {
    return `LANGUAGE is wrong value: ${process.env.LANGUAGE}`;
  }
  if (
    !process.env.LENGTH ||
    process.env.LENGTH.length === 0 ||
    parseInt(process.env.LENGTH) <= 0
  ) {
    return `LENGTH is wrong value: ${process.env.LENGTH}`;
  }

  const { data: dataGen, errors: errorsGen } =
    await client.generations.generateSummary({
      url: process.env.ARTICLE_URL,
      language: process.env.LANGUAGE,
      length: parseInt(process.env.LENGTH),
    });
  console.log(JSON.stringify(dataGen));
  console.log(errorsGen);

  return dataGen;
};
