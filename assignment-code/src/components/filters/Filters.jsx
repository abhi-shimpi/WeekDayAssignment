import React, { useState } from 'react'
import { Box } from '@mui/system';
import MultiSelectDropdown from '../multi-select-dropdown/MultiSelectDropdown.jsx';
import { Constants } from '../../constants/constants';
import Dropdown from "../custom-dropdown/CustomDropdown.jsx";
import CustomInputField from '../custom-input-search/CustomInputSearch.jsx';

const Filters = () => {
    const roleDropdownOptions = Constants.dummyRoleDropdownOptions;
    const minExperienceDropdownOptions = Constants.dummyExperienceDrodownOptions;
    const locationDropdownOptions = Constants.dummyLocationDropDownOptions;
    const minBasePayDropdownOptions = Constants.dummyBasePayDrodownOptions;

    const [filters, setFilters] = useState({
        roles: [],
        minExperience: "",
        location: [],
        minBasePay: "",
        companyName: ""
    })
    const handleFormDataChange = async (formFieldData) => {
        console.log(formFieldData);
        setFilters({ ...filters, [formFieldData.id]: formFieldData.value })
    };
    console.log(filters);
    return (
        <Box className="d-flex gap-10 align-center flex-wrap">
            {/* Roles */}
            <Box sx={{ minWidth: '200px', maxWidth: "400px" }}>
                <label htmlFor="roles">
                    Roles
                    <MultiSelectDropdown
                        id={"roles"}
                        label={"Roles"}
                        options={roleDropdownOptions}
                        isGroupBy={true}
                        onSelect={handleFormDataChange}
                    />
                </label>
            </Box>

            {/* Min Exp */}
            <Box>
                <label htmlFor="minExperience">
                    Experience
                    <Dropdown
                        id={"minExperience"}
                        label={"Experience "}
                        width={100}
                        options={minExperienceDropdownOptions}
                        onSelect={handleFormDataChange}
                        selectedOption={filters.minExperience}
                    ></Dropdown>
                </label>
            </Box>

            {/* Remote */}
            <Box sx={{ minWidth: '200px', maxWidth: "400px" }}>
                <label htmlFor="location">
                    Remote
                    <MultiSelectDropdown
                        id={"location"}
                        label={"Remote"}
                        options={locationDropdownOptions}
                        onSelect={handleFormDataChange}
                    />
                </label>
            </Box>

            {/* min base pay */}
            <Box>
                <label htmlFor="minBasePay">
                    Min Base Pay
                    <Dropdown
                        id={"minBasePay"}
                        label={"Min Base Pay "}
                        width={100}
                        options={minBasePayDropdownOptions}
                        onSelect={handleFormDataChange}
                        selectedOption={filters.minBasePay}
                    ></Dropdown>
                </label>
            </Box>

            {/* company name */}
            <Box className="pad-tb-12">
                <CustomInputField
                    id="companyName"
                    label={"Search Company Name"}
                    onChange={handleFormDataChange}
                    value={filters.companyName}
                >
                </CustomInputField>
            </Box>

            {/*  */}
        </Box>
    )
}

export default Filters