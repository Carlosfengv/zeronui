# zeron-ui

Install Zeron UI components into an application.

```sh
npx zeron-ui add button
```

List available components:

```sh
npx zeron-ui list
```

Dry-run an installation:

```sh
npx zeron-ui add button --dry-run
```

By default, files are installed under `src` so relative imports keep working:

- `src/components`
- `src/lib`
- `src/hooks`

Use `--base <dir>` to choose a different base directory.
