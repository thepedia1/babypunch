"use client";

export default function VestingPage() {
  const TOTAL_SUPPLY = 1000000000;

  const vestingData = [
    { type: "Presale", total: 300000000, unlocked: 120000000, locked: 180000000 },
    { type: "Airdrop", total: 150000000, unlocked: 60000000, locked: 90000000 },
    { type: "Team", total: 100000000, unlocked: 0, locked: 100000000 }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold mb-10">BPUNCH Vesting</h1>

      <div className="space-y-4">
        {vestingData.map(v => (
          <div key={v.type} className="border border-slate-800 p-6 rounded-xl">
            <div className="text-lg mb-2">{v.type}</div>
            <div className="text-lime-400">
              Unlocked: {v.unlocked.toLocaleString()}
            </div>
            <div className="text-slate-400">
              Locked: {v.locked.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-slate-400">
        Total Supply
        <br />
        {TOTAL_SUPPLY.toLocaleString()} BPUNCH
      </div>
    </div>
  );

}


/* STYLES */

const container = {
  background: "#020617",
  minHeight: "100vh",
  color: "white",
  padding: "40px"
};

const title = {
  fontSize: "32px",
  marginBottom: "30px"
};

const cardRow = {
  display: "flex" as const,
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap" as const
};

const card = {
  background: "#020617",
  border: "1px solid #1E293B",
  padding: "20px",
  borderRadius: "12px",
  width: "260px"
};

const cardTitle = {
  fontSize: "18px",
  marginBottom: "10px"
};

const green = {
  color: "#84CC16",
  fontWeight: "bold" as const,
  marginBottom: "5px"
};

const sub = {
  color: "#64748B",
  fontSize: "13px"
};

const progressSection = {
  marginBottom: "40px"
};

const progressTitle = {
  marginBottom: "10px"
};

const progressBar = {
  height: "8px",
  background: "#1E293B",
  borderRadius: "10px"
};

const progressFill = {
  width: "0%",
  height: "100%",
  background: "#84CC16"
};

const progressText = {
  marginTop: "8px",
  color: "#64748B",
  fontSize: "13px"
};

const table = {
  marginTop: "20px"
};

const headerRow = {
  display: "flex" as const,
  borderBottom: "1px solid #1E293B",
  paddingBottom: "10px",
  marginBottom: "10px",
  color: "#64748B",
  fontSize: "13px"
};

const row = {
  display: "flex" as const,
  padding: "10px 0"
};

const colType = {
  width: "140px"
};

const col = {
  width: "180px"
};

const colSmall = {
  width: "180px",
  fontSize: "12px",
  color: "#94A3B8"
};

const supply = {
  marginTop: "40px",
  color: "#64748B",
  fontSize: "14px"
};