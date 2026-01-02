# Documentation

Public documentation website for the Zydro product ecosystem.

## Adding Documentation

The documentation is in the `docs/` folder.

## Architecture

Documentation is configured using Markdown and JSON, and then converted into HTML.

The static HTML is served by an API server which handles analytics, search, and authentication against protected pages.

### Folder Structure

- `docs`: Holds all documentation Markdown.
- `static`: Static images, fonts, videos, css, etc.
- `generator`: Source code for the static generation script
- `api`: API server hosting the finalized documentation.
- `scripts`: Tools for CI/CD.
