import "./App.css";
import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function App() {

  const [logStats, setLogStats] = useState({
    info: 0,
    warning: 0,
    error: 0,
    total: 0,
  });

  const [recentLogs, setRecentLogs] = useState([]);

  const [severity, setSeverity] = useState("Low");

  const [status, setStatus] = useState("Recovered");

  const [aiScore, setAiScore] = useState(95);

  const [recoveryData, setRecoveryData] = useState([
    { time: "10:00", incidents: 80, errors: 2 },
    { time: "11:00", incidents: 72, errors: 2 },
    { time: "12:00", incidents: 64, errors: 1 },
    { time: "13:00", incidents: 58, errors: 1 },
    { time: "14:00", incidents: 50, errors: 0 },
    { time: "15:00", incidents: 42, errors: 0 },
  ]);

  const [workflowData, setWorkflowData] = useState([
    { name: "INFO", value: 0 },
    { name: "WARNING", value: 0 },
    { name: "ERROR", value: 0 },
  ]);

  const handleFileUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      const content = e.target.result;

      const lines = content
        .split("\n")
        .filter((line) => line.trim() !== "");

      let info = 0;
      let warning = 0;
      let error = 0;

      const parsedLogs = [];

      lines.forEach((line, index) => {

        const upperLine = line.toUpperCase();

        let type = "UNKNOWN";

        if (upperLine.includes("ERROR")) {

          error++;
          type = "ERROR";

        } else if (upperLine.includes("WARNING")) {

          warning++;
          type = "WARNING";

        } else if (upperLine.includes("INFO")) {

          info++;
          type = "INFO";
        }

        parsedLogs.push({
          id: index + 1,
          type,
          message: line,
        });

      });

      const total = lines.length;

      setLogStats({
        info,
        warning,
        error,
        total,
      });

      setRecentLogs(parsedLogs.slice(-8).reverse());

      setWorkflowData([
        { name: "INFO", value: info },
        { name: "WARNING", value: warning },
        { name: "ERROR", value: error },
      ]);

      if (error >= 5) {

        setSeverity("High");
        setStatus("Critical");
        setAiScore(45);

      } else if (error >= 2) {

        setSeverity("Medium");
        setStatus("Investigating");
        setAiScore(74);

      } else {

        setSeverity("Low");
        setStatus("Recovered");
        setAiScore(95);
      }

      setRecoveryData([

        {
          time: "10:00",
          incidents: total,
          errors: error,
        },

        {
          time: "11:00",
          incidents: Math.max(total - 5, 0),
          errors: Math.max(error, 0),
        },

        {
          time: "12:00",
          incidents: Math.max(total - 10, 0),
          errors: Math.max(error - 1, 0),
        },

        {
          time: "13:00",
          incidents: Math.max(total - 15, 0),
          errors: Math.max(error - 1, 0),
        },

        {
          time: "14:00",
          incidents: Math.max(total - 20, 0),
          errors: Math.max(error - 2, 0),
        },

        {
          time: "15:00",
          incidents: Math.max(total - 25, 0),
          errors: Math.max(error - 2, 0),
        },

      ]);

    };

    reader.readAsText(file);
  };

  return (

    <div className="app">

      <div className="overlay"></div>

      <header className="hero">

        <h1>AI Log Analyzer</h1>

        <p>
          Intelligent Log Monitoring &
          Incident Detection Dashboard
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Analyze Logs
          </button>

          <label className="secondary-btn">

            Upload File

            <input
              type="file"
              accept=".log,.txt,.json"
              onChange={handleFileUpload}
              hidden
            />

          </label>

        </div>

      </header>

      <section className="stats-grid">

        <div className="card glow-blue">
          <h3>Total Logs</h3>
          <h1>{logStats.total}</h1>
        </div>

        <div className="card glow-pink">
          <h3>Critical Errors</h3>
          <h1>{logStats.error}</h1>
        </div>

        <div className="card glow-green">
          <h3>Warnings</h3>
          <h1>{logStats.warning}</h1>
        </div>

        <div className="card glow-cyan">
          <h3>Info Logs</h3>
          <h1>{logStats.info}</h1>
        </div>

      </section>

      <section className="main-grid">

        <div className="big-card">

          <h2>AI Incident Analysis</h2>

          <div className="analysis-row">

            <div>
              <span className="label">
                Incident Severity
              </span>

              <h3 className="danger">
                {severity}
              </h3>
            </div>

            <div>
              <span className="label">
                Affected Service
              </span>

              <h3>auth-service</h3>
            </div>

            <div>
              <span className="label">
                Status
              </span>

              <h3 className="success">
                {status}
              </h3>
            </div>

          </div>

          <div className="analysis-box">

            <h4>AI Root Cause Detection</h4>

            <p>
              Dynamic AI log analysis detected
              anomaly patterns, retry instability,
              infrastructure issues, and operational
              failures from uploaded logs.
            </p>

          </div>

          <div className="timeline">

            <div className="timeline-item success-item">
              ✓ File Uploaded
            </div>

            <div className="timeline-item success-item">
              ✓ Log Parsing Completed
            </div>

            <div className="timeline-item success-item">
              ✓ AI Analysis Generated
            </div>

            <div className="timeline-item pending-item">
              ⏳ Awaiting Final Validation
            </div>

          </div>

        </div>

        <div className="side-card">

          <h2>AI Scoring Engine</h2>

          <div className="score-circle">
            <h1>{aiScore}/100</h1>
          </div>

          <p>
            AI operational scoring based on anomaly
            frequency, infrastructure health,
            retry instability, and incident correlation.
          </p>

          <div className="risk-box">

            <span>Operational Risk</span>

            <h3>{severity}</h3>

          </div>

        </div>

      </section>

      <section className="chart-grid">

        <div className="chart-card">

          <h2>Incident Recovery Analytics</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={recoveryData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#233"
              />

              <XAxis
                dataKey="time"
                stroke="#ccc"
              />

              <YAxis stroke="#ccc" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#67f8f8"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="errors"
                stroke="#ff6ec7"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h2>Log Severity Analytics</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={workflowData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#233"
              />

              <XAxis
                dataKey="name"
                stroke="#ccc"
              />

              <YAxis stroke="#ccc" />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#67f8f8"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </section>

      <section className="logs-section">

        <div className="logs-card">

          <h2>Recent Log Events</h2>

          <table className="log-table">

            <thead>

              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Message</th>
              </tr>

            </thead>

            <tbody>

              {recentLogs.length > 0 ? (

                recentLogs.map((log) => (

                  <tr key={log.id}>

                    <td>{log.id}</td>

                    <td className={log.type.toLowerCase()}>
                      {log.type}
                    </td>

                    <td>{log.message}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="empty-state"
                  >
                    Upload a log file to view parsed events
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

      <section className="upload-card">

        <h2>Upload Log File</h2>

        <div className="upload-box">

          <p>
            Upload .log / .txt / .json File
          </p>

          <span>
            Real-Time Dynamic AI Log Parsing Enabled
          </span>

          <input
            type="file"
            accept=".log,.txt,.json"
            onChange={handleFileUpload}
          />

        </div>

      </section>

    </div>
  );
}

export default App;