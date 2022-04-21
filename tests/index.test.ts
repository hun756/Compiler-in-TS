import { Lexer } from "../src/Lexer";
import { SyntaxToken } from "../src/SyntaxToken";
import { SyntaxKind } from "../src/SyntaxKind";
import { expect } from 'chai'

describe('Compiler Test', () => {

    interface ITestStruct {
        compStr: string;
        tokenVec: Array<SyntaxToken>;
        actual: Array<SyntaxToken>;
    }

    function __assign_w_token(tokenvec: Array<SyntaxToken>, lex: Lexer):void {
        while (true) {
            let token: SyntaxToken = lex.nextToken();
            tokenvec.push(token);

            if (token.kind == SyntaxKind.EndOfFileToken) {
                break;
            }
        }
    }

    function __verify(testData: ITestStruct) {
        for (let i = 0; i < testData.actual.length; ++i) {
            expect(testData.actual[i].kind).to.equal(testData.tokenVec[i].kind);
            expect(testData.actual[i].position).to.equal(testData.tokenVec[i].position);
            expect(testData.actual[i].text).to.equal(testData.tokenVec[i].text);
            expect(testData.actual[i].value).to.equal(testData.tokenVec[i].value);
        }
    }

    it('Lexing Test 01 for basic 4 operators', () => {
        let testVec: ITestStruct = {
            compStr: "+-*/",
            tokenVec: [],
            actual: [
                new SyntaxToken(SyntaxKind.PlusToken, 0, "+", null as any),
                new SyntaxToken(SyntaxKind.MinusToken, 1, "-", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 2, "*", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 3, "/", null as any),
            ]
        };

        let lexer: Lexer = new Lexer(testVec.compStr);
        __assign_w_token(testVec.tokenVec, lexer);
        __verify(testVec);
    });

    it('Lexing Test 02 for only number', () => {
        let testVec: ITestStruct = {
            compStr: "1234567890",
            tokenVec: [],
            actual: [
                new SyntaxToken(SyntaxKind.NumberToken, 0, "1234567890", 1234567890),
            ]
        };

        let lexer: Lexer = new Lexer(testVec.compStr);
        __assign_w_token(testVec.tokenVec, lexer);
        __verify(testVec);
    });

    it('Lexing Test 03 number + plustoken', () => {
        let testVec: ITestStruct = {
            compStr: "123+",
            tokenVec: [],
            actual: [
                new SyntaxToken(SyntaxKind.NumberToken, 0, "123", 123),
                new SyntaxToken(SyntaxKind.PlusToken, 3, "+", null as any),
            ]
        };

        let lexer: Lexer = new Lexer(testVec.compStr);
        __assign_w_token(testVec.tokenVec, lexer);
        __verify(testVec);
    });

    it('Lexing Test 04 All Operators', () => {
        let testVec: ITestStruct = {
            compStr: "()()(())*//*--*+++*/(/*)-*/)",
            tokenVec: [],
            actual: [
                new SyntaxToken(SyntaxKind.OpenParanthesisToken, 0, "(", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 1, ")", null as any),
                new SyntaxToken(SyntaxKind.OpenParanthesisToken, 2, "(", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 3, ")", null as any),
                new SyntaxToken(SyntaxKind.OpenParanthesisToken, 4, "(", null as any),
                new SyntaxToken(SyntaxKind.OpenParanthesisToken, 5, "(", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 6, ")", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 7, ")", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 8, "*", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 9, "/", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 10, "/", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 11, "*", null as any),
                new SyntaxToken(SyntaxKind.MinusToken, 12, "-", null as any),
                new SyntaxToken(SyntaxKind.MinusToken, 13, "-", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 14, "*", null as any),
                new SyntaxToken(SyntaxKind.PlusToken, 15, "+", null as any),
                new SyntaxToken(SyntaxKind.PlusToken, 16, "+", null as any),
                new SyntaxToken(SyntaxKind.PlusToken, 17, "+", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 18, "*", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 19, "/", null as any),
                new SyntaxToken(SyntaxKind.OpenParanthesisToken, 20, "(", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 21, "/", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 22, "*", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 23, ")", null as any),
                new SyntaxToken(SyntaxKind.MinusToken, 24, "-", null as any),
                new SyntaxToken(SyntaxKind.StarToken, 25, "*", null as any),
                new SyntaxToken(SyntaxKind.SlashToken, 26, "/", null as any),
                new SyntaxToken(SyntaxKind.CloseParanthesisToken, 27, ")", null as any),
            ]
        };

        let lexer: Lexer = new Lexer(testVec.compStr);
        __assign_w_token(testVec.tokenVec, lexer);
        __verify(testVec);
    });

    /**
     * @bug
     *  !Fix it
     */
    // it('Lexing Test 04 number + plustoken + number', () => {
    //     let testVec: ITestStruct = {
    //         compStr: "123+123",
    //         tokenVec: [],
    //         actual: [
    //             new SyntaxToken(SyntaxKind.NumberToken, 0, "123", 123),
    //             new SyntaxToken(SyntaxKind.PlusToken, 3, "+", null as any),
    //             new SyntaxToken(SyntaxKind.NumberToken, 4, "123", 123),
    //         ]
    //     };

    //     let lexer: Lexer = new Lexer(testVec.compStr);
    //     __assign_w_token(testVec.tokenVec, lexer);
    //     __verify(testVec);
    // });
});