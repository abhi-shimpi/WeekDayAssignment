import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./JobCard.css";
import { Constants } from '../../constants/constants';
import JobDetailsPopup from "../job-details-box/JobDetailsPopup";

const JobCard = ({
    jdUid,
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl
}) => {
    const [isJobDetailsPopupOpen,setIsJobDetailsPopupOpen] = useState(false);

    function usdToLpa(minSalaryUSD, maxSalaryUSD) {
        const conversionRate = Constants.currentUSD;
        const usdToInr = conversionRate;
        const inrToLakh = 0.00001;

        const minSalaryINR = (minSalaryUSD * 1000) * usdToInr;
        const maxSalaryINR = (maxSalaryUSD * 1000) * usdToInr;

        const minSalaryLPA = minSalaryINR * inrToLakh;
        const maxSalaryLPA = maxSalaryINR * inrToLakh;

        return `${minSalaryLPA.toFixed(0)} - ${maxSalaryLPA.toFixed(0)} LPA`;
    }

    return (
        <Box className="job-card margin-5">
            <Box className="d-flex gap-10 pad-tb-10">
                <Box className="image">
                    <img src={logoUrl} alt="logo" className='img-wh-100' />
                </Box>
                <Box className="d-flex flex-col">
                    <h3>{companyName || Constants.notMentioned}</h3>
                    <h2>{jobRole || Constants.notMentioned}</h2>
                    <Typography className='experience'>{minExp && maxExp ? `Exp: ${minExp} - ${maxExp}` : "Exp: "+ Constants.notMentioned}</Typography>
                </Box>
            </Box>
            <Box className="pad-tb-10">
                <Typography className='salary pad-tb-10'>Estimated Salary: ₹ {usdToLpa(minJdSalary, maxJdSalary) || Constants.notMentioned} ✅</Typography>
                <Typography className='about-company'>About Company</Typography>
                <Typography className='about-us'>About Us</Typography>
                <Box>
                    <Typography>
                        {jobDetailsFromCompany || Constants.notMentioned}
                    </Typography>
                </Box>
            </Box>
            <Box className="pad-tb-10">
                <h3>Min Experience</h3>
                <Typography>{minExp ? minExp + " Years": Constants.notMentioned} </Typography>
            </Box>
            <Box className="apply-btn pointer">
                <Typography onClick={(e)=>{
                    e.stopPropagation();
                    window.open(jdLink,'_blank');
                }}>⚡ Easy Apply</Typography>
            </Box>
            <Box className="view-job">
                <span className='pointer' onClick={()=>setIsJobDetailsPopupOpen(true)}>View Job</span>
            </Box>
            {isJobDetailsPopupOpen ? 
                <JobDetailsPopup 
                    isOpen={isJobDetailsPopupOpen} 
                    onClose={()=>setIsJobDetailsPopupOpen(false)}
                    companyName={companyName}
                    jobRole={jobRole}
                    salary={usdToLpa(minJdSalary, maxJdSalary) || Constants.notMentioned}
                    experience={minExp}
                    location={location}
                    jobDetailsFromCompany={jobDetailsFromCompany}
                    jdLink={jdLink}
                >
                </JobDetailsPopup> : 
                <></>
            }
        </Box>
    )
}

export default JobCard