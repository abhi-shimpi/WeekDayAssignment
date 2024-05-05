import { useState } from "react";
import { MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dropdown = ({ id, options, selectedOption, onSelect, label, width, required = false, handleShowPopup = () => { } }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleDropdownChange = (option) => {
        onSelect({
            id: id,
            value: option,
        });
    };

    return (
        <div style={{ width: width }} className="pad-tb-10">
            <FormControl
                fullWidth
                variant="outlined"
                size="small"
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <InputLabel>
                    <span className="field-label">{label}</span>
                </InputLabel>

                <Select
                    className="custom-form-field"
                    // IconComponent={<ExpandMoreIcon/>}
                    value={selectedOption}
                    onChange={(event) => {
                        handleDropdownChange(event.target.value);
                    }}>
                    {options?.map((option, index) => (
                        <MenuItem
                            className="custom-form-field"
                            key={index}
                            value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Dropdown;