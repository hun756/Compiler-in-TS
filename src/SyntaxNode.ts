import { SyntaxKind } from "./SyntaxKind";

export abstract class SyntaxNode {
    public abstract get kind(): SyntaxKind;
    public abstract get children(): SyntaxNode[];
}