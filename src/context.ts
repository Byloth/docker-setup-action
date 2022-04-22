import { getInput } from "@actions/core";

export class Environment
{
    public static GetVariable(name: string): string | undefined;
    public static GetVariable(name: string, defaultValue: string): string;
    public static GetVariable(name: string, defaultValue?: string)
    {
        const value = process.env[name];

        if (value === undefined)
        {
            return defaultValue;
        }

        return value;
    }

    public readonly branchName: string;
    public readonly commitSha: string;

    public constructor()
    {
        this.branchName = Environment.GetVariable("GITHUB_REF_NAME")!;
        this.commitSha = Environment.GetVariable("GITHUB_SHA")!;
    }
}

export class Inputs
{
    public static Get(name: string): string | undefined;
    public static Get<T>(name: string, parser: (input: string) => T): T;
    public static Get<T>(name: string, parser?: (input: string) => T)
    {
        const input = getInput(name);

        if (parser !== undefined)
        {
            return parser(input);
        }

        return input ? input : undefined;
    }

    public readonly registry?: string;
    public readonly repository: string;
    public readonly shaLength: number;

    public constructor()
    {
        this.registry = Inputs.Get("registry");
        this.repository = Inputs.Get("repository")!;
        this.shaLength = Inputs.Get("shaLength", (input) =>
        {
            const value = Number(input);

            if (value < 1)
            {
                throw new Error("`shaLength` must be greater than 0.");
            }
            if (value > 39)
            {
                throw new Error("`shaLength` must be less than 40.");
            }
            if (!Number.isInteger(value))
            {
                throw new Error("`shaLength` must be an integer.");
            }

            return value;
        });
    }
}

export class Context
{
    public readonly env: Environment;
    public readonly inputs: Inputs;

    public constructor()
    {
        this.env = new Environment();
        this.inputs = new Inputs();
    }
}

export default new Context();
