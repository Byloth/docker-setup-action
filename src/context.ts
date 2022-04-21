import * as core from "@actions/core";

export interface Inputs
{
    shaLength: number;
}

export function getInputs(): Inputs
{
    return {
        shaLength: parseInt(core.getInput("shaLength"))
    };
}
