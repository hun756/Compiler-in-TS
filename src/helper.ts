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
