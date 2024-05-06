import React, { useState } from 'react'
import { Box } from '@mui/system';
import Filters from '../filters/Filters';
import FilterResult from "../filter-result/FilterResult.jsx";
import Badge from '@mui/material/Badge';

const SearchJob = () => {
    const [filters, setFilters] = useState({
        roles: [],
        minExperience: 0,
        location: [],
        minBasePay: 0,
        companyName: ""
    });
    const [numberOfJobs, setNumberOfJobs] = useState(0);
    return (
        <Box className="d-flex flex-col gap-10 align-center w-80 margin-auto">
            <Box className="d-flex align-center gap-16">
                <h2 className='border-bottom-grey'>
                    Search Jobs
                </h2>
                <Badge color="primary" overlap="circular" badgeContent={`${numberOfJobs || 0}`}>
                </Badge>
            </Box>
            <Filters
                setFilters={setFilters}
                filters={filters}>
            </Filters>
            <FilterResult filters={filters} setNumberOfJobs={setNumberOfJobs}></FilterResult>
        </Box>
    )
}

export default SearchJob