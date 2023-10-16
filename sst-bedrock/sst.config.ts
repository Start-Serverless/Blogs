import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sst-bedrock",
      region: "us-east-1",
      profile: _input.stage === "prod" ? "prod" : "dev",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
