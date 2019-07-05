
var mboxFilepath = process.argv[2],
	tiddlerDirectory = process.argv[3];

if(!mboxFilepath) {
	fail("mailbox filepath missing");
}

if(!tiddlerDirectory) {
	fail("tiddler directory missing");
}

var Mbox = require("node-mbox"),
	simpleParser = require("mailparser").simpleParser,
	fs = require("fs"),
	path = require("path");

var  mbox = new Mbox();

var nextMessageId = 1;

createDirectory(tiddlerDirectory);

mbox.on("message", function(msg) {
	simpleParser(msg.toString(),{},function(err,parsed) {
		if(err) {
			console.log("Error:",err)
		} else {
			var json = {
				title: parsed.messageId,
				caption: parsed.subject,
				from: (parsed.from && parsed.from.text),
				text: parsed.text,
				type: "text/plain",
				modified: convertDate(parsed.date),
			};
			fs.writeFileSync(path.resolve(tiddlerDirectory,nextMessageId + ".json"),JSON.stringify(json,null,4));
			nextMessageId++;				
		}
	});
});

mbox.on("error", function(err) {
  console.log("Error:", err);
});

mbox.on("end", function() {
  console.log("done reading mbox file");
});

var readStream = fs.createReadStream(mboxFilepath);

// pipe stdin to mbox parser
readStream.pipe(mbox);

function convertDate(d) {
	return d.getUTCFullYear() +
			pad(d.getUTCMonth() + 1) +
			pad(d.getUTCDate()) +
			pad(d.getUTCHours()) +
			pad(d.getUTCMinutes()) +
			pad(d.getUTCSeconds()) +
			pad(d.getUTCMilliseconds(),3);
}

function pad(value,length) {
	length = length || 2;
	var s = value.toString();
	if(s.length < length) {
		s = "000000000000000000000000000".substr(0,length - s.length) + s;
	}
	return s;
}

// Recursively create a directory
function createDirectory(dirPath) {
	if(dirPath.substr(dirPath.length - 1,1) !== path.sep) {
		dirPath = dirPath + path.sep;
	}
	var pos = 1;
	pos = dirPath.indexOf(path.sep,pos);
	while(pos !== -1) {
		var subDirPath = dirPath.substr(0,pos);
		if(!(fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory())) {
			fs.mkdirSync(subDirPath);
		}
		pos = dirPath.indexOf(path.sep,pos + 1);
	}
}

// Recursively create directories needed to contain a specified file
function createFileDirectories(filePath) {
	return createDirectory(path.dirname(filePath));
}

function fail(msg) {
	console.error(msg);
	process.exit(1);
}
