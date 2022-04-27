import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { enumToStr } from "./helper";
import { Lexer } from "./Lexer";
import { LiteralExpressionSyntax } from "./LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxTree } from "./SyntaxTree";


class SynTaxFacts {
    public static getbinaryOperatorPrecedence(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 1;
            case SyntaxKind.StarToken:
            case SyntaxKind.SlashToken:
                return 2;
            default:
                return 0;
        }
    }
}

export class Parser {
    private readonly tokens: SyntaxToken[] = [];
    private _position: number = 0;
    private _diagnostics: string[] = [];

    public constructor(_text: string) {
        this.tokens = new Array<SyntaxToken>();
        let lexer = new Lexer(_text);
        let token: SyntaxToken;
        do {
            token = lexer.lex();
            if (token.kind != SyntaxKind.WhiteSpaceToken
                && token.kind != SyntaxKind.BadToken) {

                this.tokens.push(token);
            }

        } while (token.kind != SyntaxKind.EndOfFileToken);

        this._diagnostics.push.apply(this._diagnostics, lexer.diagnostics);
    }

    public get diagnostics(): string[] {
        return this._diagnostics;
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

        this._diagnostics.push(`ERROR! Unexpected token <${enumToStr(this.current.kind)}>, expected <${enumToStr(kind)}>`);
        return new SyntaxToken(kind, this.current.position, null as any, null as any);
    }

    public Parse(): SyntaxTree {
        const expression = this.parseExpression();
        const endofFileToken = this.match(SyntaxKind.EndOfFileToken);
        return new SyntaxTree(this._diagnostics, expression, endofFileToken);
    }

    private parseExpression(parentPredence: number = 0): ExpressionSyntax {
        var left = this.parsePrimaryExpression();

        while (true) {
            var predence = SynTaxFacts.getbinaryOperatorPrecedence(this.current.kind)
            
            if (predence == 0 || predence <= parentPredence) {
                break;
            }

            var operatorToken = this.nextToken();
            var right = this.parseExpression(predence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private parsePrimaryExpression(): ExpressionSyntax {
        if (this.current.kind == SyntaxKind.OpenParanthesisToken) {
            var left = this.nextToken();
            var expression = this.parseExpression();
            var right = this.match(SyntaxKind.CloseParanthesisToken);
            return new ParenthesizedExpressionSyntax(left, expression, right);
        }
        let numberToken = this.match(SyntaxKind.NumberToken);
        return new LiteralExpressionSyntax(numberToken);
    }
}