import React from "react";

export function Textbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
    let style = {
        padding: "8px",
        fontFamily: "monospace",
    }
    return <input style={style} {...props} />
}