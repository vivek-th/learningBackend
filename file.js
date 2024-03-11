const fs = require("fs");
const os = require("os");
// fs.writeFileSync('./text.txt', "hey there this is vivu from ludhiana");

// const result=fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("error", err);
//     }
//     else {
//         console.log(result);
//     }
// });

// fs.appendFileSync("./contacts.txt", `hey the date is ${Date.now()}`);
// fs.cpSync("./text.txt", "./copy.txt");
// fs.unlinkSync("./copy.txt");

console.log(`the cpu is having this number of core ${os.cpus().length}`);
