import buble from "rollup-plugin-buble"
import nodeResolve from "rollup-plugin-node-resolve"
import commonJS from "rollup-plugin-commonjs"
import strip from "rollup-plugin-strip"
import {
    terser
} from "rollup-plugin-terser"
import pkg from "./package.json"

const banner = `\
/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 *
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @preserve
 */
`

export default [
    {
        input: "src/index.js",
        output: {
            format: "cjs",
            file: pkg.main,
            sourcemap: true,
            banner
        },
        plugins: [
            nodeResolve({
                main: true,
                browser: true
            }),
            commonJS({
                include: '../**',
                sourceMap: true
            }),
            strip(),
            buble(),
            terser()
        ]
    },
    {
        input: "src/index.js",
        output: {
            format: "esm",
            file: pkg.module,
            name: "lib",
            sourcemap: true,
            banner
        },
        plugins: [
            nodeResolve({
                main: true,
                browser: true
            }),
            commonJS({
                include: '../**',
                sourceMap: false
            }),
            strip(),
            terser()
        ]
    }
]