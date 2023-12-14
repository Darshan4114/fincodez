import React, { ChangeEvent } from "react";
import { TextField, createTheme, ThemeProvider } from "@mui/material";

const DarkModeTextField = ({ type, label, name, value, onChange }: { type?: string, label: string, name: string, value: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void }) => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <TextField
                label={label}
                name={name}
                value={value}
                type={type === 'text' ? 'text' : 'number'}
                onChange={onChange}
                variant="outlined"
                sx={{ height: '4rem', fontSize: '3rem' }}
            />
        </ThemeProvider>
    );
};

export default DarkModeTextField;
