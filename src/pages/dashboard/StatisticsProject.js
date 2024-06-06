import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import customFetch from '../../utils/axios';
import BarChart from '../../components/BarChart';
import Wrapper from '../../assets/wrappers/Statistics';
import LineChart from '../../components/LineChart';
import { useLocation } from 'react-router-dom';

const StatisticsProject = () => {
    const location = useLocation();
    const initialStatistics = location.state?.statistics || {};
    const initialEmail = Object.keys(initialStatistics)[0];
    const [selectedEmail, setSelectedEmail] = useState(initialEmail);
    const [statistics, setStatistics] = useState(initialStatistics[initialEmail] || {});
    // const [statistics, setStatistics] = useState(initialStatistics);
    // const [selectedEmail, setSelectedEmail] = useState(Object.keys(initialStatistics)[0]);

    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
    };

    useEffect(() => {
        if (initialStatistics && selectedEmail) {
            setStatistics(initialStatistics[selectedEmail]);
            console.log(JSON.stringify(statistics));
        }
    }, [selectedEmail, initialStatistics]);
  
    if (!statistics) {
      return <div>Loading...</div>;
    }
  
    return (
      <Wrapper>
      <div>
        <h1>Statistics Dashboard</h1>
        <div>
          <label htmlFor="email-select">Select Email:</label>
          <select id="email-select" value={selectedEmail} onChange={handleEmailChange}>
            {Object.keys(initialStatistics).map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>
        <div className="dashboard-container">
          <div className="chart-container">
            <h2>Priority</h2>
            <BarChart data={statistics.priority} title="Priority Count" />
          </div>
          <div className="chart-container">
            <h2>Category</h2>
            <BarChart data={statistics.category} title="Category Count" />
          </div>
          <div className="chart-container">
            <h2>Deadline</h2>
            <BarChart data={statistics.deadline} title="Deadline Status" />
          </div>
          <div className="chart-container">
            <h2>Weekly Average Completion Times</h2>
            <LineChart data={statistics.weeklyAverageCompletionTimes} title="Weekly Average Completion Times" />
          </div>
          <div className="chart-container">
            <h2>Completed Tasks Per Week</h2>
            <LineChart data={statistics.completedTasksPerWeek} title="Completed Tasks Per Week" />
          </div>
          <div className="chart-container">
            <h2>Received Tasks Per Week</h2>
            <LineChart data={statistics.receivedTasksPerWeek} title="Completed Tasks Per Week" />
          </div>
        </div>
      </div>
      </Wrapper>
    );
};

export default StatisticsProject;
