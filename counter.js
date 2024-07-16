import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext(2);


export const Counter = () => {
    let [theme, setTheme] = useState(0);

    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <Count />

                <button onClick={() => { setTheme(theme += 1) }}>Augmenter </button>
                <button onClick={() => { setTheme(theme -= 1) }}>Diminuer </button>
            </div>
        </ThemeContext.Provider>
    )
}
export const Count = () => {
    const theme = useContext(ThemeContext);

    return (

        <p>{theme}</p>

    )
}