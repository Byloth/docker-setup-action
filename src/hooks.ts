import * as core from "@actions/core";
import slugify from "slugify";

import Context from "./context";

export async function run(): Promise<void>
{
    try
    {
        const commitSha = Context.env.commitSha;
        const shaLength = Context.inputs.shaLength;

        const shortSha = commitSha.substring(0, shaLength);

        core.exportVariable("GITHUB_SHORT_SHA", shortSha);
        core.setOutput("shortSha", shortSha);

        /** */

        const branchName = Context.env.branchName;
        const branchSlug = slugify(branchName);

        core.exportVariable("GITHUB_REF_SLUG", branchSlug);
        core.setOutput("branchSlug", branchSlug);

        /** */

        const registry = Context.inputs.registry;
        const repository = Context.inputs.repository;

        const dockerImage = registry ? `${registry}/${repository}` : repository;

        core.exportVariable("DOCKER_IMAGE", dockerImage);
        core.setOutput("dockerImage", dockerImage);
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
