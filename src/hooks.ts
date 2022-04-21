import * as core from "@actions/core";
import * as github from "@actions/github";

import { getInputs } from "./context";

export async function run(): Promise<void>
{
    try
    {
        const inputs = getInputs();

        const sha = github.context.sha;
        const shortSha = sha.substring(0, inputs.shaLength);

        core.setOutput("shortSha", shortSha);
        core.exportVariable("GITHUB_SHORT_SHA", shortSha);
    }
    catch (exc)
    {
        if (exc instanceof Error)
        {
            core.setFailed(exc.message);
        }
        else
        {
            core.setFailed(`${exc}`);
        }
    }
}
