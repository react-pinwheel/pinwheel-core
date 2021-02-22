import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json"];

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [
    external(),
    babel({
      babelrc: false,
      babelHelpers: "bundled",
      extensions: EXTENSIONS,
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-react",
      ],
      exclude: ["node_modules/**"],
    }),
    commonjs(),
    resolve(),
    del({ targets: ["dist/*"] }),
  ],
};
