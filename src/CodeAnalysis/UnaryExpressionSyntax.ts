import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";


export class UnaryExpressionSyntax extends ExpressionSyntax {

    private _operand: ExpressionSyntax;
    private _operatorToken: SyntaxToken;

    public constructor(operatorToken: SyntaxToken, operand: ExpressionSyntax) {
        super();
        this._operand = operand;
        this._operatorToken = operatorToken;
    }

    public get operatorToken(): SyntaxToken {
        return this._operatorToken;
    }

    public get operand(): ExpressionSyntax {
        return this._operand;
    }

    public get kind(): SyntaxKind {
        return SyntaxKind.UnaryExpression;
    }

    public get children(): SyntaxNode[] {
        return new Array<SyntaxNode>(this._operatorToken, this._operand);
    }
}
