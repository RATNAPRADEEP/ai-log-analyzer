import "./App.css";
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

const recoveryData = [
  { time: "10:00", incidents: 82, errors: 3 },
  { time: "11:00", incidents: 78, errors: 5 },
  { time: "12:00", incidents: 72, errors: 4 },
  { time: "13:00", incidents: 55, errors: 2 },
  { time: "14:00", incidents: 60, errors: 3 },
  { time: "15:00", incidents: 58, errors: 1 },
];

const workflowData = [
  { name: "Detection", value: 9 },
  { name: "Analysis", value: 7 },
  { name: "Remediation", value: 5 },
  { name: "Approval", value: 3 },
];

function App() {
  const aiScore = 74;

  return (
    <div className="app">
      <div className="overlay"></div>

      <header className="hero">
        <h1>AI Log Analyzer</h1>
        <p>
          Intelligent Log Monitoring & Incident Detection Dashboard
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Analyze Logs</button>
          <button className="secondary-btn">Upload File</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="card glow-blue">
          <h3>Total Logs</h3>
          <h1>137K</h1>
        </div>

        <div className="card glow-pink">
          <h3>Critical Errors</h3>
          <h1>15</h1>
        </div>

        <div className="card glow-green">
          <h3>Active Monitors</h3>
          <h1>13</h1>
        </div>

        <div className="card glow-cyan">
          <h3>Detection Rate</h3>
          <h1>99%</h1>
        </div>
      </section>

      <section className="main-grid">
        <div className="big-card">
          <h2>AI Incident Analysis</h2>

          <div className="analysis-row">
            <div>
              <span className="label">Incident Severity</span>
              <h3 className="danger">High</h3>
            </div>

            <div>
              <span className="label">Affected Service</span>
              <h3>auth-service</h3>
            </div>

            <div>
              <span className="label">Status</span>
              <h3 className="success">Recovered</h3>
            </div>
          </div>

          <div className="analysis-box">
            <h4>AI Root Cause Detection</h4>
            <p>
              Kubernetes deployment instability detected from retry spikes,
              container orchestration failures, and memory saturation patterns.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item success-item">
              ✓ Failure Detection Completed
            </div>

            <div className="timeline-item success-item">
              ✓ AI Analysis Completed
            </div>

            <div className="timeline-item success-item">
              ✓ Recovery Workflow Triggered
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
            AI operational scoring based on anomaly frequency,
            retry instability, infrastructure health,
            and incident correlations.
          </p>

          <div className="risk-box">
            <span>Operational Risk</span>
            <h3>Medium</h3>
          </div>
        </div>
      </section>

      <section className="chart-grid">
        <div className="chart-card">
          <h2>Incident Recovery Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recoveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#233" />
              <XAxis dataKey="time" stroke="#ccc" />
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
          <h2>Workflow Execution Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#233" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#67f8f8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="upload-card">
        <h2>Upload Log File</h2>

        <div className="upload-box">
          <p>Drag & Drop Logs Here</p>
          <span>.log / .txt / .json</span>
        </div>
      </section>
    </div>
  );
}

export default App;