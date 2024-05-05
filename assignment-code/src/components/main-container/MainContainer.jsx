import React from 'react'
import SearchJob from '../search-job/SearchJob'
import { Box } from '@mui/system';
import "./MainContainer.css";

const MainContainer = () => {
  return (
    <Box className="main-container">
        <SearchJob/>
    </Box>
  )
}

export default MainContainer