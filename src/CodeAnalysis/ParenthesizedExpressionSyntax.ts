import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";

export class ParenthesizedExpressionSyntax extends ExpressionSyntax {

    private _openParanthesisToken;
    private _expression;
    private _closeParanthesisToken;
    

    public constructor(openParanthesisToken: SyntaxToken, expression: ExpressionSyntax, closeParanthesisToken: SyntaxToken) {
        super();

        this._openParanthesisToken = openParanthesisToken;
        this._expression = expression;
        this._closeParanthesisToken = closeParanthesisToken;
    }

    public get openParanthesisToken() {
        return this._openParanthesisToken;
    }

    public get expression() {
        return this._expression;
    }

    public get closeParanthesisToken() {
        return this._closeParanthesisToken;
    }

    public get kind(): SyntaxKind {
        return SyntaxKind.ParenthesizedExpression;
    }

    public get children(): SyntaxNode[] {
        return new Array<SyntaxNode>(this._openParanthesisToken, this._expression, this._closeParanthesisToken);
    }
}