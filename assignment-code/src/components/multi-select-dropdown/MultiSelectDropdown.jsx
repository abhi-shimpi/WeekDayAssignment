import { useEffect, useState } from "react";
import { TextField, Paper, Chip, Autocomplete } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Constants } from "../../constants/constants";
import "./MultiSelectDropdown.css";

const MultiSelectDropdown = ({ id, label, options, value, onSelect, required = false, isGroupBy = false }) => {
    const chipStyles = Constants.multiselectDropdownChipStyles;
    const [selectedOptions, setSelectedOptions] = useState(value);

    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const groupBy = (option) => option.category;

    const renderGroup = (params) => (
        <li key={params.group}>
            <span style={{ color: "grey" }}>{params.group.toUpperCase()}</span>: {params.children}
        </li>
    );

    const handleSelect = (event, selectedOptions) => {
        setSelectedOptions(selectedOptions);
        if (onSelect) {
            onSelect({
                id: id,
                value: selectedOptions,
            });
        }
    };

    return (
        <Autocomplete
            multiple
            size="small"
            className="custom-form-field pad-tb-10"
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedOptions || value}
            onChange={handleSelect}
            PaperComponent={({ children }) => (
                <Paper>{children}</Paper>
            )}
            icon={<ExpandMoreIcon />}
            renderInput={(params) => (
                <TextField
                    size="small"
                    {...params}
                    label={
                        label
                    }
                    variant="outlined" />
            )}
            groupBy={isGroupBy ? groupBy : ""}
            renderGroup={isGroupBy ? renderGroup : ""}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...otherProps } = getTagProps({ index });
                    return (
                        <Chip
                            key={index}
                            label={option.label}
                            variant="outlined"
                            style={chipStyles}
                            {...otherProps}
                        />
                    );
                })
            }
        />
    );
};

export default MultiSelectDropdown;