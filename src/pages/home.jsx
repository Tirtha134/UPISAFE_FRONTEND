// home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
} from "recharts";

const API = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const navigate = useNavigate();
  const text = "User Dashboard";

  const [displayText, setDisplayText] = useState("");
  const [total, setTotal] = useState(0);
  const [safe, setSafe] = useState(0);
  const [fraud, setFraud] = useState(0);
  const [animTotal, setAnimTotal] = useState(0);
  const [animSafe, setAnimSafe] = useState(0);
  const [animFraud, setAnimFraud] = useState(0);
  const [chartData, setChartData] = useState([]);

  /* ================= TITLE TYPEWRITER ================= */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!API) {
          console.log("API URL Missing");
          toast.error("Backend URL not configured");
          return;
        }

        const res = await axios.get(
          `${API}/api/transactions/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = Array.isArray(res.data) ? res.data : [];

        const totalCount = data.length;

        const safeCount = data.filter(
          (x) => !x.Fraud_Result
        ).length;

        const fraudCount = data.filter(
          (x) => x.Fraud_Result
        ).length;

        setTotal(totalCount);

        setSafe(
          totalCount
            ? Math.round((safeCount / totalCount) * 100)
            : 0
        );

        setFraud(
          totalCount
            ? Math.round((fraudCount / totalCount) * 100)
            : 0
        );

        const latest = data.slice(0, 10);

        const formatted = latest.map((item, index) => ({
          id: index + 1,
          amount: Number(item.amount || 0),
          status: item.Fraud_Result ? "Fraud" : "Safe",
        }));

        setChartData(formatted);

      } catch (error) {

        console.log("FETCH ERROR:", error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to load transaction data.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
    };

    fetchData();

    const refresh = setInterval(fetchData, 5000);

    return () => clearInterval(refresh);

  }, []);
  /* ================= NUMBER ANIMATION ================= */
  useEffect(() => {
    const animate = (setter, target) => {
      let start = 0;
      const interval = setInterval(() => {
        start += Math.ceil(target / 30);
        if (start >= target) { setter(target); clearInterval(interval); }
        else setter(start);
      }, 30);
    };
    animate(setAnimTotal, total);
    animate(setAnimSafe, safe);
    animate(setAnimFraud, fraud);
  }, [total, safe, fraud]);

  /* ================= BAR TOOLTIP ================= */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>Transaction {item.id}</p>
          <p>₹{item.amount.toLocaleString()}</p>
          <p>{item.status}</p>
        </div>
      );
    }
    return null;
  };

  /* ================= PIE INNER LABEL ================= */
  const RADIAN = Math.PI / 180;
  const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={800} fill="#ffffff">
        <tspan x={x} dy="-0.65em">{name}</tspan>
        <tspan x={x} dy="1.45em">{`${(percent * 100).toFixed(1)}%`}</tspan>
      </text>
    );
  };

  /* ================= EMPTY STATE ================= */
  const NoDataState = () => (
    <div className="no-data-state">
      <div className="no-data-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="72" height="72" fill="none">
          <rect x="10" y="4" width="44" height="54" rx="5" ry="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
          <path d="M10 54 l5-5 5 5 5-5 5 5 5-5 5 5 5-5 5 5 4-5" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="20" y1="18" x2="44" y2="18" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="27" x2="44" y2="27" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="36" x2="35" y2="36" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="18" fill="rgba(219,234,254,0.5)" stroke="none" />
          <circle cx="30" cy="30" r="10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <line x1="37.5" y1="37.5" x2="44" y2="44" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="no-data-title">No Transactions Found Yet</p>
      <p className="no-data-sub">Your transaction activity will appear here once you make a payment.</p>
    </div>
  );

  return (
    <div className="home-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main">

          {/* ── TITLE ── */}
          <h1 className="dashboard-title">{displayText}</h1>

          {/* ── CARDS ── */}
          <div className="dashboard-cards">
            <div className="card">
              <div className="card-content">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="profile" />
                <h2>Your Profile</h2>
                <p>View your account details.</p>
              </div>
              <button className="card-btn" onClick={() => navigate("/profile")}>Click Here</button>
            </div>

            <div className="card">
              <div className="card-content">
                <img src="https://cdn-icons-png.flaticon.com/512/1570/1570887.png" alt="predict" />
                <h2>Predict Payment Status</h2>
                <p>Check the safety of your UPI payments instantly.</p>
              </div>
              <button className="card-btn" onClick={() => navigate("/transaction")}>Click Here</button>
            </div>

            <div className="card">
              <div className="card-content">
                <img src="https://cdn-icons-png.flaticon.com/512/1570/1570909.png" alt="history" />
                <h2>Transaction History</h2>
                <p>Review all your past transactions.</p>
              </div>
              <button className="card-btn" onClick={() => navigate("/history")}>Click Here</button>
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="stats-row">
            <div className="stat-box">
              <video src="/transfer.mp4" autoPlay loop muted />
              <h3>{animTotal}</h3>
              <p>Total Transactions</p>
            </div>
            <div className="stat-box">
              <video src="/safe.mp4" autoPlay loop muted />
              <h3>{animSafe}%</h3>
              <p>Safe Transactions</p>
            </div>
            <div className="stat-box">
              <video src="/money-bag.mp4" autoPlay loop muted />
              <h3>{animFraud}%</h3>
              <p>Fraud Transactions</p>
            </div>
          </div>

          {/* ── LAST 10 TRANSACTIONS BAR CHART ── */}
          <div className="chart-wrapper">
            <div className="image-style-chart-box">
              <h2 className="chart-main-title">Last 10 Transactions</h2>
              <p className="chart-sub-title">Amount & Fraud Detection</p>

              {chartData.length === 0 ? (
                <NoDataState />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={420}>
                    <BarChart data={chartData} margin={{ top: 28, right: 15, left: 5, bottom: 28 }} barCategoryGap={14}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#b8b8b8" vertical={false} />
                      <XAxis
                        dataKey="id"
                        axisLine={{ stroke: "#000", strokeWidth: 1.5 }}
                        tickLine={false}
                        tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                        label={{ value: "Transaction Order(Newest to Oldest)", position: "insideBottom", offset: -10 }}
                      />
                      <YAxis
                        width={62}
                        ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]}
                        domain={[0, 100000]}
                        axisLine={{ stroke: "#000", strokeWidth: 1.5 }}
                        tickLine={false}
                        tick={{ fill: "#111827", fontSize: 11, fontWeight: 700 }}
                        tickFormatter={(v) => {
                          if (v === 0) return "0";
                          if (v === 100000) return "1L+";
                          return `${v / 1000}K`;
                        }}
                        label={{ value: "Payment (₹)", angle: -90, position: "insideLeft", style: { fill: "#111827", fontWeight: 700 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="amount" barSize={42} radius={[6, 6, 0, 0]} animationDuration={500}>
                        {chartData.map((item, index) => (
                          <Cell key={index} fill={item.status === "Fraud" ? "#ef6a5b" : "#5aa0d3"} />
                        ))}
                        <LabelList
                          dataKey="amount"
                          position="top"
                          formatter={(v) => `₹${Number(v).toLocaleString()}`}
                          style={{ fill: "#111827", fontSize: 11, fontWeight: 700 }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="custom-legend">
                    <span><b className="safe-box"></b> Safe</span>
                    <span><b className="fraud-box"></b> Fraud</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── TRANSACTION DISTRIBUTION PIE CHART ── */}
          <div className="chart-wrapper">
            <div className="pie-chart-box">
              <h2 className="chart-main-title">Transaction Distribution</h2>
              <p className="chart-sub-title">Safe vs Fraud</p>

              {chartData.length === 0 ? (
                <NoDataState />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={420}>
                    <PieChart margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
                      <Pie
                        data={[
                          { name: "Safe", value: safe },
                          { name: "Fraud", value: fraud },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        innerRadius={0}
                        dataKey="value"
                        paddingAngle={2}
                        labelLine={false}
                        label={renderInnerLabel}
                        strokeWidth={2}
                        stroke="#ffffff"
                      >
                        <Cell fill="#5aa0d3" />
                        <Cell fill="#ef6a5b" />
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontWeight: 700 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pie-legend">
                    <span><b className="safe-dot"></b> Safe</span>
                    <span><b className="fraud-dot"></b> Fraud</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;