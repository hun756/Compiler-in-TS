import { enumToStr, isNullOrWhitSpace } from "./helper";
import { Parser } from "./Parser";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import * as c from "ansi-colors";
import { Evaluator } from "./Evaluator";

// └──
// 
// │
function prettyPrint(node: SyntaxNode, indent: string = "", islast: boolean = false):void {
    const marker = islast ? "└──" : "├──";
    let linearOuput:string = indent;
    linearOuput += marker;
    linearOuput += enumToStr(node.kind);

    if (node instanceof SyntaxToken && node.value != null) {
        linearOuput += " ";
        linearOuput += node.value;
    }

    console.log(linearOuput)

    indent += islast ? "    " : "│   ";
    const lastChild = node.children.slice(-1)[0]
    for(let child of node.children) {
        prettyPrint(child, indent, child == lastChild);
    }
}

async function main(args: string[]) {
    let line = "(((1 + 2)+ 1)- 1) * 3";

    if (isNullOrWhitSpace(line)) {
        return;
    }

    const parser = new Parser(line);
    var syntaxTree = parser.Parse();

    prettyPrint(syntaxTree.root);
    if (syntaxTree.diagnostics.length > 0) {
        for (let diagnostics of syntaxTree.diagnostics) {
            console.log(c.red(diagnostics));
        }
    } else {
        var e = new Evaluator(syntaxTree.root);
        var result = e.evaluate();
        console.log("Output value is :",result);
    }

};

main([]).catch(err => console.error(err.stack));