import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const[input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompts , setPrevPrompts] = useState([]);
    const[showResult , setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const onSent = async (prompt) =>{

        setResult('')
        setLoading(true);
        setShowResult(false);
        const response =  await runChat(input);
        setResult(response)
        setLoading(false)
        setInput('')
    }

    // onSent(prompt)

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        input,
        setInput,
        

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;