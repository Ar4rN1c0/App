import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import style from "./messagesDisplay.module.css"
import Latex from "react-latex-next";
import 'katex/dist/katex.min.css'

export default function EquationMenu() {
    const [equation, setEquation] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setEquation((prevValue) => {

            return e.target.value
        })
    }
    function addFraction(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (inputRef.current) {
            const beforeCursor = equation.slice(0, inputRef.current.selectionStart as number)
            const afterCursor = equation.slice(inputRef.current.selectionStart as number, equation.length)
            setEquation(beforeCursor + " \\huge\\frac{h}{b}\\normalsize " + afterCursor)
        }
    }
    return (
        <article className={style.equationMenu}>
            <div className={style.equationContainer}>
                <Latex>{equation && (`$${equation}$`)}</Latex>
            </div>
            <div className={style.equationInputContainer}>
                <span className={style.equationInputSpan}>
                    Input LaTeX
                </span>
                <input ref={inputRef} onChange={handleChange} className={style.equationInput} type="text" placeholder="Introduce the equation" />
            </div>
        </article>
    )
}