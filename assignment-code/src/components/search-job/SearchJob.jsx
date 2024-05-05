import React, { useState } from 'react'
import { Box } from '@mui/system';
import Filters from '../filters/Filters';
import FilterResult from "../filter-result/FilterResult.jsx";

const SearchJob = () => {
    const [filters, setFilters] = useState({
        roles: [],
        minExperience: 0,
        location: [],
        minBasePay: "",
        companyName: ""
    })
    return (
        <Box className="d-flex flex-col gap-10 align-center w-80 margin-auto">
            <h2 className='border-bottom-grey'>
                Search Jobs
            </h2>
            <Filters
                setFilters={setFilters}
                filters={filters}>
            </Filters>
            <FilterResult filters={filters}></FilterResult>
        </Box>
    )
}

export default SearchJob