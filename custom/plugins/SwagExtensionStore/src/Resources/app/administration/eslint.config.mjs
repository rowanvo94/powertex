import { resolve } from 'path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import swESLintBase from '@shopware-ag/eslint-config-base';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';
import internalRules from './internal-rules/index.mjs';

process.env.ADMIN_PATH =
    process.env.ADMIN_PATH ??
    resolve('../../../../../../../src/Administration/Resources/app/administration');

const twigVuePlugin = await import(`${process.env.ADMIN_PATH}/twigVuePlugin/lib/index.js`);

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.ts', '**/*.js'],
        ignores: ['**/*.d.ts'],

        plugins: {
            import: importPlugin,
            stylistic,
            internalRules,
        },

        extends: [
            ...tseslint.configs.recommendedTypeCheckedOnly,
        ],

        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                Shopware: true,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        settings: {
            'import/resolver': {
                node: {},
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },

        rules: {
            ...swESLintBase.rules,
            indent: 'off',
            'comma-dangle': 'off',
            'max-len': 'off',

            'no-console': ['error', { allow: ['warn', 'error'] }],
            'internal-rules/no-src-imports': 'off',

            /* import rules */
            'internalRules/no-src-imports': 'error',
            'import/no-extraneous-dependencies': 'off',
            'import/no-useless-path-segments': 'off',
            'import/extensions': [
                'error',
                'ignorePackages',
                { js: 'never', ts: 'never' },
            ],
            /* import rules */

            /* stylistic rules */
            'stylistic/semi': ['error', 'always'],
            'stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            'stylistic/member-delimiter-style': ['error'],
            'stylistic/no-multi-spaces': ['error'],
            'stylistic/object-curly-spacing': ['error', 'always'],
            'stylistic/space-before-function-paren': ['error', {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            }],
            'stylistic/spaced-comment': ['error', 'always'],
            'stylistic/no-tabs': ['error'],
            'stylistic/no-mixed-spaces-and-tabs': ['error'],
            'stylistic/max-len': 'off',
            'stylistic/quote-props': ['error', 'as-needed'],
            'stylistic/no-extra-semi': ['error'],
            'stylistic/comma-dangle': ['error', 'always-multiline'],
            /* stylistic rules */

            /* typescript rules */
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': false }],
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_|^(e|err)$',
            }],
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            /* typescript rules */
        },
    },
    {
        files: ['**/*.html.twig'],

        plugins: { twigVuePlugin },

        processor: 'twigVuePlugin/twig-vue',

        extends: vue.configs['flat/recommended'],

        rules: {
            'vue/no-v-html': 'warn',

            'vue/multiline-html-element-content-newline': 'off',

            'vue/max-attributes-per-line': ['error', { singleline: 3 }],
            'vue/component-definition-name-casing': ['error', 'kebab-case'],
            'vue/require-explicit-emits': ['error'],
            'vue/block-lang': ['error', { script: { lang: 'ts' } }],
            'vue/html-indent': ['error', 4, { baseIndent: 0 }],
            'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
            'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'always' }],
            'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: true }],
        },
    },
    {
        files: [
            '**/*.spec.js',
            '**/*.spec.ts',
        ],

        plugins: { jest: pluginJest },

        languageOptions: {
            globals: {
                ...globals.node,
                ...pluginJest.environments.globals.globals,
                wrapTestComponent: true,
                flushPromises: true,
            }
        },

        rules: {
            'jest/expect-expect': 'error',
            'jest/no-duplicate-hooks': 'error',
            'jest/no-test-return-statement': 'error',
            'jest/prefer-hooks-in-order': 'error',
            'jest/prefer-hooks-on-top': 'error',
            'jest/prefer-to-be': 'error',
            'jest/require-top-level-describe': 'error',
            'jest/prefer-to-contain': 'error',
            'jest/prefer-to-have-length': 'error',
            'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
            '@typescript-eslint/no-unsafe-member-access': 'off', // Needed for any/VueComponent typed wrappers
            '@typescript-eslint/prefer-promise-reject-errors': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },
    {
        files: ['**/*.js'],

        extends: [tseslint.configs.disableTypeChecked],
    },
);
