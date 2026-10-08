import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Saludo({ nombre }) {
    return /*#__PURE__*/ _jsxs("div", {
        className: "tarjeta",
        children: [
            /*#__PURE__*/ _jsxs("h1", {
                children: [
                    "Hola, ",
                    nombre
                ]
            }),
            /*#__PURE__*/ _jsx("p", {
                children: "Esto es JSX."
            })
        ]
    });
}

