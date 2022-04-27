import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { NumberExpressionSyntax } from "./NumberSyntax";
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

        if (node instanceof NumberExpressionSyntax) {
            return node.numberToken.value as number;
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
                throw new Error(`Unexcepted binary operator: ${node.operatorToken.kind}`)
            }
        }
        
        throw new Error(`Unexcepted node: ${node.kind}`)
    }
}

