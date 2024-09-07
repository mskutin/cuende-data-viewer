import React from 'react';

const StatsTable = ({ stats }) => {
  if (!stats) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Road Network Statistics</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td>Total Roads:</td>
            <td>{stats.totalRoads}</td>
          </tr>
          <tr>
            <td>Average Intensity:</td>
            <td>{stats.averageIntensity.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Length (approx.):</td>
            <td>{stats.totalLength} km</td>
          </tr>
          <tr>
            <td>Road Types:</td>
            <td>
              {Object.entries(stats.roadTypes).map(([type, count]) => (
                <div key={type}>{type}: {count}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;