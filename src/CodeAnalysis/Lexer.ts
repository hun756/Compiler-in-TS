import { char, Int } from "./helper";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";


export class Lexer {
    private readonly _text: string;
    private _position: number;
    private _current: char;
    private _diagnostics: string[];
    
    constructor(text: string) {
        this._text = text;
        this._position = 0;
        this._current = new char('\0');
        this._diagnostics = new Array<string>();
    }

    public get diagnostics(): string[] {
        return this._diagnostics;
    }

    public get current(): char {
        if (this._position >= this._text.length) {
            this._current = new char('\0');
            return this._current;
        }

        this._current = new char(this._text[this._position])
        return this._current;
    }

    private next(): void {
        ++this._position;
    }

    lex(): SyntaxToken {        
        if (this._position >= this._text.length) {
            return new SyntaxToken(SyntaxKind.EndOfFileToken, this._position, '\0', null as any);
        }

        if (this.current.isDigit()) {
            
            let start = this._position;
            while (this.current.isDigit()) {
                this.next();
            }

            let _length = this._position - start;
            let text = this._text.substr(start, _length);

            let value: number, control: any;
            control = Int.tryParse(text);
            if(!control.isParsed) {
                this._diagnostics.push(`The number ${this._text} is not valid 32 bit integer..`);
            }
            value = control.val;

            return new SyntaxToken(SyntaxKind.NumberToken, 0 | start, text, value);
        }
        if (this.current.isWhitespace()) {
            let start = this._position;
            
            while (this.current.isWhitespace()) {
                this.next();
            }
        
            let _length = this._position - start;
            let text = this._text.substr(start, _length);

            return new SyntaxToken(SyntaxKind.WhiteSpaceToken, 0 | start, text, null as any);
        }

        if (this.current.isEqual('+')) {
            return new SyntaxToken(SyntaxKind.PlusToken, 0 | this._position++, '+', null as any);
        } else if (this.current.isEqual('-')) {
            return new SyntaxToken(SyntaxKind.MinusToken, 0 | this._position++, '-', null as any);
        } else if (this.current.isEqual('*')) {
            return new SyntaxToken(SyntaxKind.StarToken, 0 | this._position++, '*', null as any);
        } else if (this.current.isEqual('/')) {
            return new SyntaxToken(SyntaxKind.SlashToken, 0 |  this._position++, '/', null as any);
        } else if (this.current.isEqual('(')) {
            return new SyntaxToken(SyntaxKind.OpenParanthesisToken, 0 |  this._position++, '(', null as any);
        } else if (this.current.isEqual(')')) {
            return new SyntaxToken(SyntaxKind.CloseParanthesisToken, 0 |  this._position++, ')', null as any);
        }
        
        this._diagnostics.push(`ERROR! bad character input: ${this.current}`);
        return new SyntaxToken(SyntaxKind.BadToken, 0 | this._position++, this._text.substring(this._position - 1, 1), null as any);
    }
}
