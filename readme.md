# mbox-to-tiddlers

A utility to convert mbox files into tiddlers

**NOTE THAT THIS PROGRAM ONLY WORKS ON Node.js 16.x**

Later versions of Node.js raise the following error within the "mailsplit" dependency:

```
/mbox-to-tiddlers/node_modules/mailsplit/lib/message-splitter.js:28
        this.errored = false;
                     ^

TypeError: Cannot set property errored of #<Readable> which has only a getter
    at new MessageSplitter (/mbox-to-tiddlers/node_modules/mailsplit/lib/message-splitter.js:28:22)
    at new MailParser (/mbox-to-tiddlers/node_modules/mailparser/lib/mail-parser.js:132:25)
    at module.exports (/mbox-to-tiddlers/node_modules/mailparser/lib/simple-parser.js:25:18)
    at Mbox.<anonymous> (/mbox-to-tiddlers/index.js:25:2)
    at Mbox.emit (node:events:519:28)
    at emit (/mbox-to-tiddlers/node_modules/node-mbox/src/mbox.js:53:12)
    at DestroyableTransform.<anonymous> (/mbox-to-tiddlers/node_modules/node-mbox/src/mbox.js:97:11)
    at DestroyableTransform.emit (node:events:519:28)
    at addChunk (/mbox-to-tiddlers/node_modules/through2/node_modules/readable-stream/lib/_stream_readable.js:291:12)
    at readableAddChunk (/mbox-to-tiddlers/node_modules/through2/node_modules/readable-stream/lib/_stream_readable.js:278:11)

Node.js v20.15.0
```

This appears to be an issue with the mailsplit library, and the solution may require switching to a different library.

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
