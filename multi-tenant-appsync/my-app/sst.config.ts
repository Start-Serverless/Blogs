import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
    config(_input) {
        return {
            name: "my-app",
            region: "us-east-1",
            profile: _input.stage === "prod" ? "prod" : "dev",
        };
    },
    stacks(app) {
        app.stack(function Site({ stack }) {
            const site = new NextjsSite(stack, "site");

            stack.addOutputs({
                SiteUrl: site.url,
            });
        });
    },
} satisfies SSTConfig;
