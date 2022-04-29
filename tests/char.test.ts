import { char } from "../src/CodeAnalysis/helper"
import { expect } from 'chai'

describe('Test For Char', () => {

    interface ITestStruct {
        ch: string;
        actual: boolean;
    }

    it('Legal isdigit Check for char', () => {
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
            let _val: char = new char(val.ch)
            expect(_val.isDigit()).to.equal(val.actual);
        })
    });

    it('Illegal isdigit Check for char', () => {
        let testVec: ITestStruct[] = [];
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        for (let i = 0; i < alphabet.length; ++i) {
            testVec.push({ ch: alphabet[i], actual: false })
        }

        testVec.forEach(val => {
            let _val: char = new char(val.ch)
            expect(_val.isDigit()).to.equal(val.actual);
        })
    });

    it('check isLowerCase', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 97; i <= 122; i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: true });
        }
        testVec.forEach(val => {   
            let _val: char = new char(val.ch)
            expect(_val.isLowerCase()).to.equal(val.actual);
        })
    });

    it('check isletterOr Digit', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0); i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: true });
        }
        for (let i = 'A'.charCodeAt(0); i < 'Z'.charCodeAt(0); i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: true });
        }
        for (let i = '0'.charCodeAt(0); i < '9'.charCodeAt(0); i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: true });
        }
        testVec.forEach(val => {

            let _val: char = new char(val.ch)
            expect(_val.isLetterOrDigit()).to.equal(val.actual);
        })
    });

    it('check isUppercase 01', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0); i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: false });
        }
        testVec.forEach(val => {

            let _val: char = new char(val.ch)
            expect(_val.isUppercase()).to.equal(val.actual);
        })
    });

    it('check isUppercase 02', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 'A'.charCodeAt(0); i < 'Z'.charCodeAt(0); i++) {
            testVec.push({ ch: String.fromCharCode(i), actual: true });
        }
        testVec.forEach(val => {

            let _val: char = new char(val.ch)
            expect(_val.isUppercase()).to.equal(val.actual);
        })
    });

    it('check all characters for char', () => {
        let testVec: ITestStruct[] = [];
        for (let i = 0; i < 65574; i++) {
            if (i < 48 || i > 57) {
                testVec.push({ ch: String.fromCharCode(i), actual: false });
            }
        }

        testVec.forEach(val => {
            let _val: char = new char(val.ch)
            expect(_val.isDigit()).to.equal(val.actual);
        })

    });

    it('check multiple character', () => {
        let testVec: ITestStruct[] = [
            { ch: "14312", actual: false},
            { ch: "  ", actual: false},
            { ch: "\n\b\t", actual: false},
            { ch: "[[]}}}}[]{[]][][]}]}{[{[()=)(", actual: false},
            { ch: "qw", actual: false},
        ];

        testVec.forEach(val => {
            expect(  () => {let a = new char(val.ch)}).to.throw('Cahracter muts be sized 1 byte');
        })

    });

    interface ITestStructwParam {
        ch: string;
        param: string;
        actual: boolean;
    }

    it('Check isEqual', () => {
        let testVec: ITestStructwParam[] = [
            { ch: "+", param:"+", actual: true },
            { ch: "-", param:"-", actual: true },
            { ch: "*", param:"*", actual: true },
            { ch: "/", param:"/", actual: true },
            { ch: "(", param:"(", actual: true },
            { ch: ")", param:")", actual: true },
            { ch: "1", param:"2", actual: false },
            { ch: "1", param:"", actual: false },
            { ch: "A", param:" ", actual: false },
        ];

        testVec.forEach(val => {
            let _val: char = new char(val.ch)
            expect(_val.isEqual(val.param)).to.equal(val.actual);
        })
    })
});