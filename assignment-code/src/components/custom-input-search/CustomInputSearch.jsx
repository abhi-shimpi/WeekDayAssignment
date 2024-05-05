import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

const CustomInputField = ({
    id,
    label,
    helperText,
    onChange,
    value,
    index = 0,
    ...otherProps
}) => {

    const handleInputChange = (event) => {
        const inputTextValue = event.target.value;
        if (onChange) {
            onChange({
                id: id,
                value: inputTextValue,
                index: index
            });
        }
    };

    return (
        <TextField
            label={
                label
            }
            className="custom-form-field"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleInputChange}
            value={value}
            size="small"
            {...otherProps}
        />
    );
};

export default CustomInputField;
