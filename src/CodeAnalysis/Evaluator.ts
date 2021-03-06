import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { UnaryExpressionSyntax } from "./UnaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { LiteralExpressionSyntax } from "./LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";

export class Evaluator {

    private readonly _root: ExpressionSyntax;

    public constructor(root: ExpressionSyntax) {
        this._root = root;
    }

    public evaluate(): number {
        return this.evaluateExpression(this._root);
    }

    public evaluateExpression(node: ExpressionSyntax): number {
        // binary expression
        // number expression

        if (node instanceof LiteralExpressionSyntax) {
            return node.numberToken.value as number;
        }

        if (node instanceof UnaryExpressionSyntax) {
            var operand_ = this.evaluateExpression(node.operand);
            if(node.operatorToken.kind == SyntaxKind.PlusToken) {
                return operand_;
            } else if(node.operatorToken.kind == SyntaxKind.MinusToken) {
                return -operand_;
            } else {
                throw new Error(`Unexpected unary operator ${node.operatorToken.kind}`)
            }
        }

        if (node instanceof BinaryExpressionSyntax) {
            const left = this.evaluateExpression(node.left);
            const right = this.evaluateExpression(node.right);

            if(node.operatorToken.kind == SyntaxKind.PlusToken) {
                return left + right;
            } else if(node.operatorToken.kind == SyntaxKind.MinusToken) {
                return left - right;
            } else if(node.operatorToken.kind == SyntaxKind.StarToken) {
                return left * right;
            } else if(node.operatorToken.kind == SyntaxKind.SlashToken) {
                return left / right;
            } else {
                throw new Error(`Unexpected binary operator: ${node.operatorToken.kind}`)
            }
        }

        if (node instanceof ParenthesizedExpressionSyntax) {
            return this.evaluateExpression(node.expression);
        }
        
        throw new Error(`Unexpected node: ${node.kind}`)
    }
}

