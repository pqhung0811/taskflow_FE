import styled from "styled-components";

const Wrapper = styled.section`
    .dashboard-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }

    .chart-container {
    flex: 0 0 48%; /* Adjust to fit two charts per row */
    margin-bottom: 20px;
    }

    .full-width-chart {
    flex: 0 0 100%;
    }

    h1 {
        font-size: 30px; 
      }
      
    h2 {
        font-size: 20px;
    }
      
`;
export default Wrapper;
