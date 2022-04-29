import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";

export class BinaryExpressionSyntax extends ExpressionSyntax {

    private _left: ExpressionSyntax;
    public get left(): ExpressionSyntax {
        return this._left;
    }

    private _right: ExpressionSyntax;
    public get right(): ExpressionSyntax {
        return this._right;
    }

    private _operatorToken: SyntaxToken;
    public get operatorToken(): SyntaxToken {
        return this._operatorToken;
    }

    public constructor(left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax) {
        super();
        this._left = left;;
        this._operatorToken = operatorToken;
        this._right = right;
    }

    public get kind(): SyntaxKind {
        return SyntaxKind.BinaryExpression;
    }

    public get children(): SyntaxNode[] {
        return new Array<SyntaxNode>(this._left, this._operatorToken, this._right);
    }
}