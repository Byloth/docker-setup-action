import { getInput } from "@actions/core";

export class Inputs
{
    public static GetInputAsNumber(name: string, validator?: (value: number) => void): number
    {
        const input = getInput(name);
        const value = parseInt(input);

        if (validator !== undefined)
        {
            validator(value);
        }

        return value;
    }

    public readonly shaLength: number;

    public constructor()
    {
        this.shaLength = Inputs.GetInputAsNumber("shaLength", (value: number) =>
        {
            if (value < 1)
            {
                // TODO!
            }
        });
    }
}

export class Context
{
    public readonly inputs: Inputs;

    public constructor()
    {
        this.inputs = new Inputs();
    }
}

export default new Context();
