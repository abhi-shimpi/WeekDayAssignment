import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { Constants } from '../../constants/constants';
import "./JobDetailsPopup.css";
import CloseIcon from '@mui/icons-material/Close';

const JobDetailsPopup = ({
    isOpen,
    onClose,
    companyName,
    jobRole,
    salary,
    experience,
    location,
    jobDetailsFromCompany,
    jdLink
}) => {

    const handleClose = () => {
        onClose();
    }
    return (
        <div>
            <Dialog onClose={handleClose} open={isOpen}>
                <DialogTitle className='d-flex justify-between'>
                    <Typography className='font-weight-600'>
                        About the Role
                    </Typography>
                    <CloseIcon className='pointer' onClick={onClose}></CloseIcon>
                </DialogTitle>
                <DialogContent>
                    <Typography className='font-size-16 font-weight-600'>Overview</Typography>
                    <Typography className='font-size-16 font-weight-600'>Company name: {companyName}</Typography>
                    <Box className="pad-tb-10">
                        <Typography className='font-size-16 font-weight-600'>
                            Role : {jobRole}
                        </Typography>
                        <ul>
                            <li>
                                salary : {salary ? `Rs ${salary}` : Constants.notMentioned}
                            </li>
                            <li>
                                Experience : {experience ? `${experience} + years` : Constants.notMentioned}
                            </li>
                            <li>
                                location : {location ? `${location}` : Constants.notMentioned}
                            </li>
                        </ul>
                    </Box>

                    <Typography className='font-size-20 font-weight-600'>
                        About the company
                    </Typography>
                    <Typography className='font-size-16 font-weight-600'>
                        About us
                    </Typography>
                    <Typography>
                        {jobDetailsFromCompany ? jobDetailsFromCompany : Constants.notMentioned}
                    </Typography>
                    <Box className="apply-btn pointer d-flex justify-center">
                        <Typography onClick={(e) => {
                            e.stopPropagation();
                            window.open(jdLink, '_blank');
                        }}>Apply for this job</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default JobDetailsPopup