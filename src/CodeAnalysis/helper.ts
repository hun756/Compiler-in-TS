import { SyntaxKind } from "./SyntaxKind";

/**
 * @brief
 *  Global String Operation
 */
export function isNullOrWhitSpace(str: string): boolean {
    return str === null || str.match(/^ *$/) !== null;
}

/**
 * Printing support for enum.
 */
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
        case SyntaxKind.NumberExpression:
            res = 'NumberExpression';
            break;
        case SyntaxKind.BinaryExpression:
            res = 'BinaryExpression';
            break;
        case SyntaxKind.ParenthesizedExpression:
            res = 'ParenthesizedExpression';
            break;
        default:
            throw new Error("Invalid Token");
    }

    return res;
}

/** 
 * Helper class for char
*/
export class char {
    private _val: number;

    /**
     * @brief
     *  This method contructs new char object.
     * @param {string} _val
     */
    public constructor(_val_:string | number) {
        if ((typeof _val_ === "string") && (_val_.length > 1)) {
            throw new Error("Cahracter muts be sized 1 byte");
        } else if ((typeof _val_ === "string")) {
            this._val = _val_.charCodeAt(0);
        } else {
            this._val = _val_;
        }
    }
    
    /**
     * @brief
     *  This method checks character is digit?
     */
    public isDigit(): boolean {
        return char.isDigit(String.fromCharCode(this._val));
    }

    public static isDigit(c: string) {
        return c >= '0' && c <= '9';
    }

    public static isWhitespace(c: string) {
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

    public isWhitespace(): boolean {
        return char.isWhitespace(String.fromCharCode(this._val));
    }

    public isEqual(other: string): boolean {
        if (other.length > 1) {
            throw new Error("Cahracter muts be sized 1 byte");
        }

        return this._val === other.charCodeAt(0);
    }

    public isLowerCase(): boolean {
        return char.isLowerCase(String.fromCharCode(this._val));
    }

    public static isLowerCase(_val: string): boolean {
        return _val.charCodeAt(0) >= 'a'.charCodeAt(0) && _val.charCodeAt(0) <= 'z'.charCodeAt(0);
    }

    public isLetterOrDigit(): boolean {
        return this.isDigit() || this.isAlpha();
    }

    public isUppercase(): boolean {
        return !this.isLowerCase();
    }

    public toString(): string {
        return String.fromCharCode(this._val);
    }

    public isAlpha(): boolean {
        return (this._val >= 'a'.charCodeAt(0) && this._val <= 'z'.charCodeAt(0))
        || (this._val >= 'A'.charCodeAt(0) && this._val <= 'Z'.charCodeAt(0))
    }
}

// interface IReferenceResolver {
//     isParsed : boolean;
//     val: number;
// }

export class Int {
    private _val: number;

    public static readonly _min = -2147483648;
    public static readonly _max = 2147483647;

    public constructor(val: any) {
        var tempVar;
        try {
            tempVar = parseInt(val);
        } catch (error) {
            throw error;
        }

        if (isNaN(tempVar)) { 
            throw new Error("Object is not number");
        }

        if (Int.checkTrueBound(tempVar)) {
            this._val = 0|tempVar;
        } else {
            throw new Error("Invalid integer bound");
        }
    }

    public static tryParse(val: any): any {
        let tempVar = parseInt(val);
    

        if (isNaN(tempVar)) { 
            return {
                isParsed : false,
                val: 0
            };
        }
        
        if (!Int.checkTrueBound(tempVar)) {
            return {
                isParsed : false,
                val: 0
            };
        }

        return {
            isParsed : true,
            val: 0|tempVar
        };
    }

    public static checkTrueBound(val: number): boolean {
        return (val >= Int._min && val <= Int._max);
    }

    public get value() {
        return this._val;
    }

    public set value(val: number)/*: void */ {
        this._val = val;
    }
}