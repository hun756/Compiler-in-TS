import { char, Int } from "../src/CodeAnalysis/helper"
import { expect } from 'chai'

describe('Test For Integer', () => {

    interface ITestStruct {
        num: number;
        actual: boolean;
    }

    it('Legal integer bound check', () => {
        let testVec: ITestStruct[] = [
            { num: 123,         actual: true  },
            { num: 6,           actual: true  },
            { num: 0,           actual: true  },
            { num: -1,          actual: true  },
            { num: 1 << 31,     actual: true  },
            { num: 2147483647,  actual: true  },
            { num: -2147483649, actual: false },
            { num: 2147483650,  actual: false },
        ]
        testVec.forEach(val => {
            expect(Int.checkTrueBound(val.num)).to.equal(val.actual);
        })
    });


    it('True construct check', () => {
        interface ITestForObj {
            num: any,
            actual: number
        };

        let testVec: ITestForObj[] = [
            { num: 123,         actual: 123 },
            { num: "6",         actual: 6 },
            { num: 0,           actual: 0 },
            { num: "-1",        actual: -1 },
            { num: 1 << 31,     actual: -2147483648 },
            { num: 2147483647,  actual: 2147483647 },
            { num: 123.6,       actual: 123 },
            { num: "123.6",     actual: 123 },
        ]
        testVec.forEach(val => {
            let _val = new Int(val.num);
            expect(_val.value).to.equal(val.actual);
        })
    });


    it('Try Parse check', () => {
        interface ITestForObj {
            num: any,
            actual: boolean,
            value: number
        };

        let testVec: ITestForObj[] = [
            { num: 123,                         actual: true,   value: 123          },
            { num: "-1",                        actual: true,   value: -1           },
            { num: 1 << 31,                     actual: true,   value: 1 << 31      },
            { num: 2147483647,                  actual: true,   value: 2147483647   },
            { num: 2147483648,                  actual: false,  value: 0            },
            { num: "-1afse",                    actual: true,   value: -1           },
            { num: "afse",                      actual: false,  value: 0            },
            { num: {},                          actual: false,  value: 0            },
            { num: 
                {   age: 123, year: 2022 },     actual: false,  value: 0            },
            { num: 123.67,                      actual: true,   value: 123          },
            { num: Number.MAX_SAFE_INTEGER,     actual: false,  value: 0            },
        ]

        testVec.forEach(val => {
            let _val = Int.tryParse(val.num);

            expect(_val.isParsed).to.equal(val.actual);
            expect(_val.val).to.equal(val.value);
        })
    });

});