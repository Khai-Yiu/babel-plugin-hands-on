import { transform } from '@babel/core';
import prefixFunctionNamesPlugin from './prefix-function-names-plugin';

const transformCode = (code, pluginConfig) => {
    const result = transform(code, {
        plugins: [pluginConfig],
    });

    return result.code;
};

describe('prefix-function-names-plugin', () => {
    it('returns an object with a visitor object', () => {
        const result = prefixFunctionNamesPlugin({});

        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty('visitor', expect.any(Object));
    });
    describe('given default options where "prefix" = "_" and "skipPrefixed" = false', () => {
        describe('and the code contains a function declaration', () => {
            it.skip('prefixes the function name', () => {
                const inputCode = 'function func() {}';
                const pluginConfig = [prefixFunctionNamesPlugin];

                expect(transformCode(inputCode, pluginConfig)).toMatch(
                    'function _func() {}'
                );
            });
            describe('and the start of the function name contains the prefix', () => {
                it.skip('prefixes the function name', () => {
                    const inputCode = 'function _func() {}';
                    const pluginConfig = [prefixFunctionNamesPlugin];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        'function __func() {}'
                    );
                });
            });
        });
        describe('and the code contains an arrow function declaration', () => {
            describe('and the function is anonymous', () => {
                it.skip('does nothing', () => {
                    const inputCode = '() => {}';
                    const pluginConfig = [prefixFunctionNamesPlugin];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        '() => {}'
                    );
                });
            });
            describe('and the function is assigned to a variable', () => {
                it.skip('prefixes the variable name', () => {
                    const inputCode = 'const func = () => {}';
                    const pluginConfig = [prefixFunctionNamesPlugin];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        'const _func = () => {}'
                    );
                });
            });
        });
        describe('and the code contains a function expression', () => {
            describe('and the function is anonymous and assigned to a variable', () => {
                it.skip('prefixes the variable name', () => {
                    const inputCode = 'const func = function () {}';
                    const pluginConfig = [prefixFunctionNamesPlugin];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        'const _func = function () {}'
                    );
                });
            });
            describe('and the function is named and assigned to a variable', () => {
                it.skip('prefixes the variable and function name', () => {
                    const inputCode = 'const funcA = function funcB() {}';
                    const pluginConfig = [prefixFunctionNamesPlugin];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        'const _funcA = function _funcB() {}'
                    );
                });
            });
        });
        describe('and the code contains a function invocation', () => {
            it.skip('prefixes the callee function name', () => {
                const inputCode = 'func()';
                const pluginConfig = [prefixFunctionNamesPlugin];

                expect(transformCode(inputCode, pluginConfig)).toMatch(
                    `_func()`
                );
            });
        });
    });
    describe('given a user defined option to set "prefix" to "my"', () => {
        describe('and the code contains a function declaration', () => {
            it.skip('prefixes the function name', () => {
                const inputCode = 'function func() {}';
                const pluginConfig = [
                    prefixFunctionNamesPlugin,
                    { prefix: 'my' },
                ];

                expect(transformCode(inputCode, pluginConfig)).toMatch(
                    'function myfunc() {}'
                );
            });
        });
    });
    describe('given a user defined option to set "skipPrefixed" to true', () => {
        describe('and the code contains a function declaration', () => {
            describe('and the start of the function name contains the prefix', () => {
                it.skip('does not prefix the function name', () => {
                    const inputCode = 'function _func() {}';
                    const pluginConfig = [
                        prefixFunctionNamesPlugin,
                        { skipPrefixed: true },
                    ];

                    expect(transformCode(inputCode, pluginConfig)).toMatch(
                        'function _func() {}'
                    );
                });
            });
        });
    });
});
