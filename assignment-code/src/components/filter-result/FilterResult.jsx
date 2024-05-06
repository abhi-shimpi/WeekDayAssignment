import React, { useEffect, useState } from 'react'
import axios from "axios";
import JobCard from '../job-card/JobCard';
import { Constants } from '../../constants/constants';
import { Box } from '@mui/system';
import InfiniteScroll from 'react-infinite-scroll-component';

const FilterResult = ({ filters,setNumberOfJobs }) => {
	const [jobsData, setJobsData] = useState([]);
	const [filteredJobData, setFilteredJobData] = useState([]);
	const [hasMore,setHasMore] = useState(true)
	const [offset,setOffset] = useState(0);

	const getJobData = () => {

		const body = {
			limit: 10,
			offset: 0
		};

		axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", body)
			.then(
				(response) => {
					const jobData = response?.data?.jdList || [];
					setJobsData([...jobData]);
					setOffset(1);
					setNumberOfJobs(jobData.length)
				},
				(error) => {
					console.log(error);
				}
			)
	};

	useEffect(() => {
		getJobData();
	}, [filters]);

	const fetchMoreData = () => {
		const body = {
			limit: 10,
			offset: offset
		};
		setOffset(offset+1);

		axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", body)
			.then(
				(response) => {
					let currentJobsData = response?.data?.jdList || [];
					setJobsData([...jobsData, ...currentJobsData]);
					setNumberOfJobs(currentJobsData.length + jobsData.length);
				},
				(error) => {
					console.log(error);
				}
			)
	}

	const filterJobsData = () => {
		if (jobsData?.length) {
			if (jobsData?.length) {
				const filteredJobs = jobsData.filter((job) => {
					let companyNameMatch = filters.companyName?.length ? job.companyName?.toLowerCase()?.includes(filters?.companyName?.toLowerCase()) : true;
					let roleMatch = filters?.roles.some(role => role.value === job.jobRole);
					let minExpMatch = filters.minExperience ? job.minExp >= filters.minExperience && filters.minExperience <= job.maxExp : true;
					let locationMatch = filters.location.length ? filters.location.some(location => location.value === job.location || (job.location !== "hybrid" && job.location !== "remote" && location.value === "in-office")) ? true : false : true;
					let minSalaryMatch = ((job.minJdSalary * 1000 * Constants.currentUSD) >= filters.minBasePay) || ((job.maxJdSalary * 1000 * Constants.currentUSD) >= filters.minBasePay) ? true : false;
					
					if (!filters.roles.length) roleMatch = true;
					if (!filters.minExperience) minExpMatch = true;
					if (!filters.minBasePay) minExpMatch = true;
					return companyNameMatch && roleMatch && minExpMatch && locationMatch && minSalaryMatch;
				});
				setFilteredJobData(filteredJobs);
			}
		}
	};

	useEffect(() => {
		filterJobsData();
	}, [jobsData]);

	return (
		<div className='pad-tb-10'>
			<InfiniteScroll
				className='d-flex flex-wrap justify-center gap-10 overflow-y-auto pad-tb-10'
				dataLength={filteredJobData.length}
				next={fetchMoreData}
				hasMore={hasMore}
				height={filteredJobData.length<=3 ? "67vh" :Constants.height80vh}
				loader={filteredJobData.lenght && <p>Loading jobs...</p>}
				endMessage={<p>That's all jobs for given filter</p>}
			>
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
			</InfiniteScroll>
		</div>
	)
}

export default FilterResult