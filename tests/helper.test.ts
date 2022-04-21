import * as help from "../src/helper"
import { expect } from 'chai'

describe('Test For is Digit', () => {

    interface ITestStruct {
        ch: string;
        actual: boolean;
    }

    it('Legal isdigit Check', () => {
        let testVec: ITestStruct[] = [
            { ch: "1", actual: true },
            { ch: "2", actual: true },
            { ch: "3", actual: true },
            { ch: "4", actual: true },
            { ch: "5", actual: true },
            { ch: "6", actual: true },
            { ch: "7", actual: true },
            { ch: "8", actual: true },
            { ch: "9", actual: true },
            { ch: "0", actual: true },
        ]

        testVec.forEach(val => {
            expect(help.isDigit(val.ch)).to.equal(val.actual);
        })
    });

    it('Illegal isdigit Check', () => {
        let testVec: ITestStruct[] = [];
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        for (let i = 0; i < alphabet.length; ++i) {
            testVec.push({ ch: alphabet[i], actual: false })
        }

        testVec.forEach(val => {
            expect(help.isDigit(val.ch)).to.equal(val.actual);
        })
    });

    it('check all characters', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 0; i < 65574; i++) {
            if (i < 48 || i > 57) {
                testVec.push({ ch: String.fromCharCode(i), actual: false });
            }
        }
        testVec.forEach(val => {
            expect(help.isDigit(val.ch)).to.equal(val.actual);
        })
    });
});

describe('Test Null  Or WhiteSpace', () => {
    interface ITestStruct {
        str: string;
        actual: boolean;
    }

    it('Check null or white space', () => {
        let testVec: ITestStruct[] = [
            { str: "", actual: true },
            { str: "    ", actual: true },
            { str: "  fds  ", actual: false },
            { str: "                                                     ", actual: true },
            { str: "                             ]}[]{[][{½}]}  ", actual: false },
        ];

        testVec.forEach(val => {
            expect(help.isNullOrWhitSpace(val.str)).to.equal(val.actual);
        })
    })
});