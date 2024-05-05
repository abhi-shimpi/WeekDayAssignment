import React, { useEffect, useState } from 'react'
import axios from "axios";
import JobCard from '../job-card/JobCard';
import { Constants } from '../../constants/constants';
import { Box } from '@mui/system';

const FilterResult = ({ filters }) => {
	const [jobsData, setJobsData] = useState([]);
	const [filteredJobData, setFilteredJobData] = useState([]);

	const getJobData = () => {

		const body = JSON.stringify({
			"limit": 100,
			"offset": 0
		});

		const requestOptions = {
			method: "POST",
			body
		};

		axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
			.then(
				(response) => {
					console.log(response)
					const jobData = response?.data?.jdList || [];
					setJobsData([...jobData]);
					console.log(jobData)
				},
				(error) => {
					console.log(error);
				}
			)
	};

	useEffect(() => {
		getJobData();
	}, [])

	useEffect(() => {
		if (jobsData?.length) {
			if (jobsData?.length) {
				const filteredJobs = jobsData.filter((job) => {
					let companyNameMatch = filters.companyName?.length ? job.companyName?.toLowerCase()?.includes(filters?.companyName?.toLowerCase()) : true;
					let roleMatch = filters?.roles.some(role => role.value === job.jobRole);
					let minExpMatch = filters.minExperience ? job.minExp >= filters.minExperience && filters.minExperience <= job.maxExp : true;
					let locationMatch = filters.location.length ? filters.location.some(location => location.value === job.location || (job.location !== "hybrid" && job.location !== "remote" && location.value === "in-office")) ? true : false : true;
					let minSalaryMatch = filters.minBasePay >= (job.minJdSalary * 1000 * Constants.currentUSD) && !(filters.minBasePay > (job.maxJdSalary * 1000 * Constants.currentUSD)) ? true : false;
					console.log(minSalaryMatch);

					if (!filters.roles.length) roleMatch = true;
					if (!filters.minExperience) minExpMatch = true;
					if (!filters.minJdSalary) minExpMatch = true;
					return companyNameMatch && roleMatch && minExpMatch && locationMatch && minSalaryMatch;
				});
				console.log(filteredJobs);
				setFilteredJobData(filteredJobs);
			}
		}
	}, [filters]);

	return (
		<div className='d-flex flex-wrap gap-10 pad-tb-10'>
			{
				filteredJobData.length ? (filteredJobData?.map((job) => {
					return (
						<JobCard
							jdUid={job.jdUid}
							jdLink={job.jdLink}
							jobDetailsFromCompany={job.jobDetailsFromCompany}
							maxJdSalary={job.maxJdSalary}
							minJdSalary={job.minJdSalary}
							salaryCurrencyCode={job.salaryCurrencyCode}
							location={job.location}
							minExp={job.minExp}
							maxExp={job.maxExp}
							jobRole={job.jobRole}
							companyName={job.companyName}
							logoUrl={job.logoUrl}
						></JobCard>
					)
				})) :
					(
						<Box> No data Avaiilable</Box>
					)
			}
		</div>
	)
}

export default FilterResult