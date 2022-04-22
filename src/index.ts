import { enumToStr, isNullOrWhitSpace } from "./helper";
import { Parser } from "./Parser";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";

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

    indent += islast ? "    " : "|   ";
    const last = node.children.slice(-1)[0]
    for(let child of node.children) {
        prettyPrint(child, indent, node == last);
    }
}

async function main(args: string[]) {
    let line = "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9";

    if (isNullOrWhitSpace(line)) {
        return;
    }

    const parser = new Parser(line);
    var expression = parser.Parse();

    prettyPrint(expression);
};

main([]).catch(err => console.error(err.stack));