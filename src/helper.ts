import { SyntaxKind } from "./SyntaxKind";


export function isNullOrWhitSpace(str: string): boolean {
    return str === null || str.match(/^ *$/) !== null;
}

export function isWhitespace(c: string) {
    return c === ' '
        || c === '\n'
        || c === '\t'
        || c === '\r'
        || c === '\f'
        || c === '\v'
        || c === '\u00a0'
        || c === '\u1680'
        || c === '\u2000'
        || c === '\u200a'
        || c === '\u2028'
        || c === '\u2029'
        || c === '\u202f'
        || c === '\u205f'
        || c === '\u3000'
        || c === '\ufeff';
}

export function isDigit(c: string) {
    return c >= '0' && c <= '9';
}

export function enumToStr(val: SyntaxKind): string {
    let res: string;
    switch (val) {
        case SyntaxKind.NumberToken:
            res = 'NumberToken';
            break;

        case SyntaxKind.WhiteSpaceToken:
            res = 'WhiteSpaceToken';
            break;
        case SyntaxKind.PlusToken:
            res = 'PlusToken';
            break;
        case SyntaxKind.MinusToken:
            res = 'MinusToken';
            break;
        case SyntaxKind.StarToken:
            res = 'StarToken';
            break;
        case SyntaxKind.SlashToken:
            res = 'SlahToken';
            break;
        case SyntaxKind.OpenParanthesisToken:
            res = 'OpenParanthesisToken';
            break;
        case SyntaxKind.CloseParanthesisToken:
            res = 'CloseParanthesisToken';
            break;
        case SyntaxKind.BadToken:
            res = 'BadToken';
            break;
        case SyntaxKind.EndOfFileToken:
            res = 'EndOfFileToken';
            break;
        default:
            throw new Error("Invalid Token");
    }

    return res;
}

export class char {
    private _val: number;

    public constructor(_val_:string | number) {
        if ((typeof _val_ === "string") && (_val_.length != 1)) {
            throw new Error("Cahracter muts be sized 1 byte");
        } else if ((typeof _val_ === "string")) {
            this._val = _val_.charCodeAt(0);
        } else {
            this._val = _val_;
        }
    }

    public get val(): string {
        return String.fromCharCode(this._val);
    }

    public isDigit(): boolean {
        return this._val >= 48 && this._val <= 57;
    }

    public isWhitespace(): boolean {
        return this._val === ' '.charCodeAt(0)
        || this._val === '\n'.charCodeAt(0)
        || this._val === '\t'.charCodeAt(0)
        || this._val === '\r'.charCodeAt(0)
        || this._val === '\f'.charCodeAt(0)
        || this._val === '\v'.charCodeAt(0)
        || this._val === '\u00a0'.charCodeAt(0)
        || this._val === '\u1680'.charCodeAt(0)
        || this._val === '\u2000'.charCodeAt(0)
        || this._val === '\u200a'.charCodeAt(0)
        || this._val === '\u2028'.charCodeAt(0)
        || this._val === '\u2029'.charCodeAt(0)
        || this._val === '\u202f'.charCodeAt(0)
        || this._val === '\u205f'.charCodeAt(0)
        || this._val === '\u3000'.charCodeAt(0)
        || this._val === '\ufeff'.charCodeAt(0);
    }

    public isLowerCase(): boolean {
        return this._val >= 'a'.charCodeAt(0) && this._val <= 'z'.charCodeAt(0);
    }

    public isLetterOrDigit(): boolean {
        return this.isDigit() || this.isAlpha();
    }

    public isUppercase(): boolean {
        return !this.isLowerCase();
    }

    public toString(): string {
        return this._val.toString();
    }

    public isAlpha(): boolean {
        return (this._val >= 'a'.charCodeAt(0) && this._val <= 'z'.charCodeAt(0))
        || (this._val >= 'A'.charCodeAt(0) && this._val <= 'Z'.charCodeAt(0))
    }
}