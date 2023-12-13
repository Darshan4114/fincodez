import React, { ChangeEvent } from "react";
import { TextField, createTheme, ThemeProvider } from "@mui/material";

const DarkModeTextField = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
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
                onChange={onChange}
                variant="outlined"
                sx={{ height: '4rem', fontSize: '3rem' }}
            />
        </ThemeProvider>
    );
};

export default DarkModeTextField;
