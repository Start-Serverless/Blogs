import { ApiHandler } from "sst/node/api";
import {
  BedrockRuntime,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntime();

export const handler = ApiHandler(async (_evt) => {
  if (_evt.body == undefined) {
    return { statusCode: 400, body: "No valid input" };
  }

  const prompt = JSON.parse(_evt.body!)["prompt"];
  const inputBody = {
    prompt: prompt,
    max_tokens: 100,
    return_likelihoods: "NONE",
  };

  const command = new InvokeModelCommand({
    body: JSON.stringify(inputBody),
    contentType: "application/json",
    accept: "*/*",
    modelId: "cohere.command-text-v14",
  });

  const response = await client.send(command);
  const output = Buffer.from(response.body).toString("utf8");
  const body = JSON.parse(output);
  const [generation] = body.generations;
  const text = generation.text;

  return {
    statusCode: 200,
    body: text,
  };
});
