import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { Lexer } from "./Lexer";
import { NumberExpressionSyntax } from "./NumberSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class Parser {
    private readonly tokens: SyntaxToken[] = [];
    private _position: number = 0;

    public constructor(_text: string) {
        this.tokens = new Array<SyntaxToken>();
        let lexer = new Lexer(_text);
        let token: SyntaxToken;
        do {
            token = lexer.nextToken();
            if (token.kind != SyntaxKind.WhiteSpaceToken
                && token.kind != SyntaxKind.BadToken) {

                this.tokens.push(token);
            }

        } while (token.kind != SyntaxKind.EndOfFileToken)
    }

    private Peek(offset: number): SyntaxToken {
        const index = this._position + offset;
        if (index > this.tokens.length) {
            return this.tokens[this.tokens.length - 1];
        }

        return this.tokens[index];
    }

    private get current(): SyntaxToken {
        return this.Peek(0);
    }

    private nextToken(): SyntaxToken {
        var _current = this.current;
        this._position++;
        return _current;
    }

    private match(kind: SyntaxKind) {
        if (this.current.kind == kind) {
            return this.nextToken();
        }

        return new SyntaxToken(kind, this.current.position, null as any, null as any);
    }

    public Parse(): ExpressionSyntax {
        var left = this.parsePrimaryExpression()

        while (this.current.kind == SyntaxKind.PlusToken
            || this.current.kind == SyntaxKind.MinusToken) {

            let operatorToken = this.nextToken();
            let right = this.parsePrimaryExpression();
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private parsePrimaryExpression(): ExpressionSyntax {
        let numberToken = this.match(SyntaxKind.NumberToken);
        return new NumberExpressionSyntax(numberToken);
    }
}