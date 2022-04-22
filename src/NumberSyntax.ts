import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";

export class NumberExpressionSyntax extends ExpressionSyntax {

    private _numberToken: SyntaxToken;

    public get numberToken(): SyntaxToken {
        return this._numberToken;
    }

    public constructor(NumberToken: SyntaxToken) {
        super();
        this._numberToken = NumberToken;
    }

    public get kind(): SyntaxKind {
        return SyntaxKind.NumberExpression;
    }

    public get children(): SyntaxNode[] {
        return new Array<SyntaxNode>(this._numberToken);
    }
    
}