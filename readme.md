# mbox-to-tiddlers

A utility to convert mbox files into tiddlers

# Overview

Each message in the mbox file is converted into a separate tiddler with the following fields:

* **title**: message ID
* **caption**: message subject
* **from**: message sender
* **text**: message text
* **type**: `text/plain`
* **modified**: message date (in TiddlyWiki format)

# Installation

Prerequisites: [Node.js](https://nodejs.org/)

1. Download or clone this repository
2. Open a command prompt in the root of the repository
3. Execute `npm install` to install dependencies

# Usage

Invoke the converter with a filepath to the mbox file and the path where the output tiddler files should be saved:

```
node ./index.js path/to/mbox/file ./wiki/tiddlers/converted
```

(The resulting tiddlers in `./wiki/tiddlers/converted` should be deleted before converting a diffferent mbox file).

You can then build the resulting tiddlers into a functioning TiddlyWiki with:

```
node ./node_modules/tiddlywiki/tiddlywiki.js ./wiki --build index
```

The output file will be found at `./wiki/output/index.html`.

# Acknowledgements

This utility is based on these two awesome projects:

* https://github.com/robertklep/node-mbox to read mbox files
* https://github.com/nodemailer/mailparser to parse the bodies of email messages
