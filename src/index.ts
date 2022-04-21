import { Lexer } from "./Lexer";
import { SyntaxKind } from "./SyntaxKind";

// async function main(args: string[]) {
//     let line: string = "123 456";
//     var lexer = new Lexer(line);
//     while (true) {
//         var token = lexer.nextToken();
//         if (token.kind == SyntaxKind.EndOfFileToken) {
//             break;
//         }

//         process.stdout.write(enumToStr(token.kind) + ` : '${token.text}'`)
//         if (token.value != null) {
//             process.stdout.write(` ${token.value.toString()}`);
//             // console.log(`${token.value.toString()}`)
//         }

//         console.log();
//     }
// };

// main([]).catch(err => console.error(err.stack));