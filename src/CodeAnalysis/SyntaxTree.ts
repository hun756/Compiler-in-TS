import { ExpressionSyntax } from "./ExpressionSyntax";
import { Parser } from "./Parser";
import { SyntaxToken } from "./SyntaxToken";

export class SyntaxTree {
    private _root: ExpressionSyntax;
    private _endofFileToken: SyntaxToken;
    private readonly _diagnostics: string[];
    

    public constructor(diagnostics: string[], root: ExpressionSyntax, endofFileToken: SyntaxToken) {
        this._root = root;
        this._endofFileToken = endofFileToken;
        this._diagnostics = diagnostics;
    }

    public get root(): ExpressionSyntax {
        return this._root;
    }

    public get diagnostics(): string[] {
        return this._diagnostics;
    }

    public get endofFileToken(): SyntaxToken {
        return this._endofFileToken;
    }

    public static parse(text:string): any {
        let parser = new Parser(text);
        return parser.Parse();
    }
}