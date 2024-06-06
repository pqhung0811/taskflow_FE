import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import customFetch from '../../utils/axios';
import BarChart from '../../components/BarChart';
import Wrapper from '../../assets/wrappers/Statistics';
import LineChart from '../../components/LineChart';

const Statistics = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await customFetch.get('/statistics');
        // const data = await response.json();
        setStatistics(response.data.statistics);
      };
  
      fetchData();
    }, []);
  
    if (!statistics) {
      return <div>Loading...</div>;
    }
  
    return (
      <Wrapper>
      <div>
        <h1>Statistics Dashboard</h1>
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

export default Statistics;
