# Docker environment setup 🐋

## An action to easily set up a Docker build environment with some useful environment variables.

### Usage

Here's an example of how to use this action, with all the parameters filled in:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Docker environment setup
        uses: byloth/docker-setup-action@v1
        with:
          registry: registry.domain.io
          repository: AccountUsername/repository-name
          shaLength: '8'
```

### Inputs

| Name         | Required | Default                      | Description                                                 |
|--------------|----------|------------------------------|-------------------------------------------------------------|
| `registry`   | false    | `''`                         | The registry to prepend to the Docker image name.           |
| `repository` | false    | `'${{ github.repository }}'` | The repository to use as a Docker image name.               |
| `shaLength`  | false    | `'7'`                        | The length to shorten the SHA to use as a Docker image tag. |

### Outputs

#### `shortSha`

The shortened SHA of the current commit (retrieved from the `GITHUB_SHA` environment variable)
based on the specified `shaLength` from the input.  
This information is also injected into the environment via the `GITHUB_SHORT_SHA` environment variable.

You can use it as the tag of the Docker image built by your action.

<details>
<summary><b>Example:</b></summary>

```sh
# Input
GITHUB_SHA="52dd68e7dd36a8b1b73d071d9eb54d0899052c77"
SHA_LENGTH="8"

# Output
GITHUB_SHORT_SHA="52dd68e7"
```

</details>

#### `branchSlug`

The slugified version of the branch name (retrieved from the `GITHUB_REF_NAME` environment variable).  
This information is also injected into the environment via the `GITHUB_REF_SLUG` environment variable.

You can use it as the tag of the Docker image built by your action.

<details>
<summary><b>Example:</b></summary>

```sh
# Inputs
GITHUB_REF_NAME="feature/gh-actions"

# Output
GITHUB_REF_SLUG="feature-gh-actions"
```

</details>

#### `dockerImage`

The Docker image name matching the `repository` and optionally the `registry` from the input.  
This information is also injected into the environment via the `DOCKER_IMAGE` environment variable.

You can use it as the name of the Docker image built by your action.

<details>
<summary><b>Example:</b></summary>

```sh
# Inputs
REPOSITORY="Byloth/cmangos-docker"

# Output
DOCKER_IMAGE="byloth/cmangos-docker"
```

... or if you use a specific registry:

```sh
# Inputs
REGISTRY="ghcr.io"
REPOSITORY="Bylothink/do-you-dare"

# Output
DOCKER_IMAGE="ghcr.io/bylothink/do-you-dare"
```

</details>
