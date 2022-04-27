import { enumToStr, isNullOrWhitSpace } from "./CodeAnalysis/helper";
import { Parser } from "./CodeAnalysis/Parser";
import { SyntaxNode } from "./CodeAnalysis/SyntaxNode";
import { SyntaxToken } from "./CodeAnalysis/SyntaxToken";
import * as c from "ansi-colors";
import { Evaluator } from "./CodeAnalysis/Evaluator";
import { SyntaxTree } from "./CodeAnalysis/SyntaxTree";


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
    // let line = "(((1 + 2)+ 1)- 1) * 3";
    let line = "+--+1";

    if (isNullOrWhitSpace(line)) {
        return;
    }

    var syntaxTree = SyntaxTree.parse(line);

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