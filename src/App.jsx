import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Buttons_data from './Buttons_data'


const App = () => {
    const [formula, setformula] = useState([])
    const [output, setoutput] = useState(0)
    const [equals, seteq] = useState(false)
    const [deci, usedeci] = useState(false)
    function karo(val, type) {
        makeformula(val, type)
    }

    function makeformula(val, type) {
        if (type == 'number' && formula.length > 0) {
            if (formula[formula.length - 1] != '+' && formula[formula.length - 1] != '-' && formula[formula.length - 1] != '/' && formula[formula.length - 1] != 'x' && equals == false) {
                setformula((formula) => formula.map((f, index) => {
                    if (index == formula.length - 1) {
                        if (val != '.') { return (formula[formula.length - 1] + val) }
                        else if (deci == false) { return (formula[formula.length - 1] + val, usedeci(true)) }
                    }
                    else {
                        return formula[index]
                    }
                }, []))

                setoutput(+(formula[formula.length - 1] + val))
            }
            else if (equals == false) {

                setformula((arr) => [...arr, val])
                setoutput(+val)

            }
        }
        else if (type == 'number') {
            setformula((arr) => [val])
            setoutput(+val)
            console.log(val)
        }
        else if (type == 'operator' && formula.length > 0) {

            if (equals == false) {
                if (formula[formula.length - 1] != '+' && formula[formula.length - 1] != '-' && formula[formula.length - 1] != '/' && formula[formula.length - 1] != '*') {

                    setformula((arr) => [...arr, val])
                    setoutput()
                    usedeci(false)
                }
                else {
                    setformula((formula) => formula.map((f, index) => {
                        if (index == formula.length - 1) {

                            return (
                                val)
                        }
                        else {
                            return formula[index]
                        }
                    }, []))
                    usedeci(false)
                    setoutput()
                }
            }
            else {
                setformula(formula => [formula[formula.length - 1].split('=')[1], val])
                seteq(false)
                setoutput()
                console.log(equals)

            }

        }
        else if (type == 'AC') {
            setformula([])
            setoutput(0)
        }

        else if (type == 'equals') {
            if (formula.length > 0) {
                let result
                let operator = ''
                for (let i = 0; i < formula.length; i++) {
                    if (+formula[i]) {
                        if (operator == '') {
                            result = +formula[i]
                        }
                        else {
                            if (operator == 'x') {
                                result = Number(result) * Number(formula[i])
                            }
                            else if (operator == '/') {
                                result = Number(result) / Number(formula[i])
                            }
                            else if (operator == '+') {
                                result = Number(result) + Number(formula[i])
                            }
                            else if (operator == '-') {
                                result = Number(result) - Number(formula[i])
                            }
                            i
                        }
                    }
                    else {
                        console.log(formula[i])
                        operator = formula[i]
                    }
                    console.log(result)
                }
                setoutput(result)
                setformula(formula => [...formula, '=' + result])
                seteq(true)
            }
        }

    }

    return (
        <div id='body'>
            <section id="calculator">
                <div id='displays'>
                    <div id='formulascreen'>{formula.join(' ')} </div>
                    <div id='display'>{output}</div>
                </div>
                <div id='buttons'>
                    {Buttons_data ?
                        Buttons_data.map((info) => <button key={info.key} className={info.class} id={info.key} onClick={() => karo(info.value, info.type)}>{info.value}</button>)
                        : null}
                </div>
            </section>
            <section className="name">
                <h6>Designed and Coded By <br /> <a href='https://github.com/UnevenCoder' target="_blank" rel="noreferrer">Ameen Shafeeq</a> </h6>
            </section>
        </div>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
