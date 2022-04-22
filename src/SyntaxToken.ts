import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";


export class SyntaxToken extends SyntaxNode {
    
    constructor(kind: SyntaxKind, position: number, text: string, value: Object) {
        super();
        this._kind = kind;
        this._position = position;
        this._text = text;
        this._value = value;
    }
    
    private _kind: SyntaxKind;
    public get kind(): SyntaxKind { return this._kind; }
    
    private _position: number;
    public get position(): number { return this._position; }
    
    private _text: string;
    public get text(): string { return this._text; }
    
    private _value: Object;
    public get value(): Object { return this._value; }
    
    public get children(): SyntaxNode[] {
        return new Array<SyntaxNode>();
    }
}
