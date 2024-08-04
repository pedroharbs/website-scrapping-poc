
## Website Scraping POC (website-scrapping-poc)

## Overview

`website-scrapping-poc` is a proof-of-concept project designed to clone a website and its associated assets. This includes JavaScript, CSS, web fonts, audio, and video files. The project utilizes `cheerio` for parsing and manipulating HTML and the Fetch API for making HTTP requests.

## Features

- Clone entire websites.
- Download and save locally JavaScript, CSS, fonts, audio and video assets.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Clone the Repository

```sh
git clone git@github.com:pedroharbs/website-scrapping-poc.git
cd website-scrapping-poc
```

### Install Dependencies

```sh
pnpm install
```

## Usage

To begin scraping a website, follow these steps:

1. **Edit the Target URL**:
   - Open the file `src/core/index.ts`.
   - Locate the `main` function call within the file.
   - Replace the URL `https://example.com/` with the URL of the website you want to clone.

2. **Run the Scraper**:
   - Execute the following command in your terminal:

     ```sh
     pnpm run start
     ```

   This will initiate the scraping process and begin cloning the specified website along with its assets.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, you can raise an [issue](https://github.com/pedroharbs/website-scrapping-poc/issues).