import { SyntaxKind } from "./SyntaxKind";

export class SynTaxFacts {
    public static getUnaryOperatorPrecedence(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 3;
            default:
                return 0;
        }
    }
    public static getBinaryOperatorPrecedence(kind: SyntaxKind) {
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