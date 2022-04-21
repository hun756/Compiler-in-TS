import { isDigit, isWhitespace } from "./helper";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";


export class Lexer {
    private readonly _text: string;
    private _position: number;
    private _current: string = "";

    constructor(text: string) {
        this._text = text;
        this._position = 0;
    }

    public get current(): string {
        if (this._position >= this._text.length) {
            return '/0';
        }

        return this._text[this._position];
    }

    private next(): void {
        this._position++;
    }

    nextToken(): SyntaxToken {
        // console.log(this._position, this.current);
        
        if (this._position >= this._text.length) {
            return new SyntaxToken(SyntaxKind.EndOfFileToken, this._position, '\0', null as any);
        }

        if (isDigit(this.current)) {
            let start = this._position;
            while (isDigit(this.current)) {
                this.next();
            }

            let length = this._position - start;
            let text = this._text.substring(start, length);

            let value: number = Number.parseInt(text) | 0;

            return new SyntaxToken(SyntaxKind.NumberToken, start, text, value);
        }
        if (isWhitespace(this.current)) {
            let start = this._position;
            while (isWhitespace(this.current)) {
                this.next();
            }

            let length = this._position - start;
            let text = this._text.substring(start, length);

            console.log(this._position);

            return new SyntaxToken(SyntaxKind.WhiteSpaceToken, start, text, null as any);
        }

        if (this.current == '+') {
            return new SyntaxToken(SyntaxKind.PlusToken, this._position++, '+', null as any);
        } else if (this.current == '-') {
            return new SyntaxToken(SyntaxKind.MinusToken, this._position++, '-', null as any);
        } else if (this.current == '*') {
            return new SyntaxToken(SyntaxKind.StarToken, this._position++, '*', null as any);
        } else if (this.current == '/') {
            return new SyntaxToken(SyntaxKind.SlashToken, this._position++, '/', null as any);
        } else if (this.current == '(') {
            return new SyntaxToken(SyntaxKind.OpenParanthesisToken, this._position++, '(', null as any);
        } else if (this.current == ')') {
            return new SyntaxToken(SyntaxKind.CloseParanthesisToken, this._position++, ')', null as any);
        }

        return new SyntaxToken(SyntaxKind.BadToken, this._position++, this._text.substring(this._position - 1, 1), null as any);
    }
}
