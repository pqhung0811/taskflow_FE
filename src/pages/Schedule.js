import React, { useEffect, useState } from 'react';
import customFetch from '../utils/axios';
import styled from 'styled-components';

const TaskSchedule = () => {
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await customFetch.get('/tasks/schedule');
        // const data = await response.json();
        setSchedule(response.data.bestSchedule);
      };
  
      fetchData();
    }, []);
  
    if (!schedule) {
      return <div>Loading...</div>;
    }

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });
        return `${formattedTime} ${formattedDate}`;
    };

    return (
        <Wrapper>
            <div>
                <h1>Task Schedule</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Task Name</th>
                            <th>Project ID</th>
                            <th>Project Name</th>
                            <th>Start Doing</th>
                            <th>End Doing</th>
                            <th>Delay In Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((task, index) => (
                            <tr key={index}>
                                <td>{task.taskId}</td>
                                <td>{task.taskName}</td>
                                <td>{task.projectId}</td>
                                <td>{task.projectName}</td>
                                <td>{formatDateTime(task.startDoing)}</td>
                                <td>{formatDateTime(task.endDoing)}</td>
                                <td>{task.delayInHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .table-container {
        width: 80%;
        margin: 0 auto;
        margin-top: 2rem;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead {
        // background-color: #4CAF50;
        background-color: #804AFF;
        color: white;
    }

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tbody tr:hover {
        background-color: #ddd;
    }

    h1 {
        text-align: center;
        margin-top: 2rem;
    }
`

export default TaskSchedule;
