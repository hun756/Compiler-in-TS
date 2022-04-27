
export enum SyntaxKind {
    // Tokens..
    NumberToken,
    WhiteSpaceToken,
    PlusToken,
    MinusToken,
    StarToken,
    SlashToken,
    OpenParanthesisToken,
    BadToken,
    CloseParanthesisToken,
    EndOfFileToken,

    // Expression
    LiteralExpression,
    BinaryExpression,
    ParenthesizedExpression
}
