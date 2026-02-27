"use client";
import type { CSSProperties } from "react";
export default function VestingPage() {

  const TOTAL_SUPPLY = 1000000000;

  const vestingData = [

    {
      type: "Presale",
      total: 300000000,
      unlocked: 120000000,
      locked: 180000000,
      tge: "40%",
      schedule: "60% over 2 months"
    },

    {
      type: "Airdrop",
      total: 150000000,
      unlocked: 60000000,
      locked: 90000000,
      tge: "40%",
      schedule: "60% over 2 months"
    },

    {
      type: "Team",
      total: 100000000,
      unlocked: 0,
      locked: 100000000,
      tge: "0%",
      schedule: "3 month cliff, then 12 month vesting"
    }

  ];


  return (

    <div style={container}>

      {/* TITLE */}

      <h1 style={title}>
        BPUNCH Vesting
      </h1>


      {/* CARDS */}

      <div style={cardRow}>

        <div style={card}>
          <div style={cardTitle}>
            Presale Vesting
          </div>

          <div style={green}>
            40% at TGE
          </div>

          <div style={sub}>
            60% released over 2 months
          </div>
        </div>


        <div style={card}>
          <div style={cardTitle}>
            Airdrop Vesting
          </div>

          <div style={green}>
            40% at TGE
          </div>

          <div style={sub}>
            60% released over 2 months
          </div>
        </div>


        <div style={card}>
          <div style={cardTitle}>
            Team Vesting
          </div>

          <div style={green}>
            0% at TGE
          </div>

          <div style={sub}>
            3 month cliff, then 12 month vesting
          </div>
        </div>

      </div>


      {/* STATUS */}

      <div style={progressSection}>

        <div style={progressTitle}>
          Vesting Status
        </div>

        <div style={progressBar}>
          <div style={progressFill}/>
        </div>

        <div style={progressText}>
          Vesting has not started
        </div>

      </div>


      {/* TABLE */}

      <div style={table}>

        <div style={headerRow}>

          <div style={colType}>
            Type
          </div>

          <div style={col}>
            Total
          </div>

          <div style={col}>
            Unlocked at TGE
          </div>

          <div style={col}>
            Locked
          </div>

          <div style={colSmall}>
            TGE
          </div>

          <div style={colSmall}>
            Schedule
          </div>

        </div>


        {vestingData.map(v => (

          <div key={v.type} style={row}>

            <div style={colType}>
              {v.type}
            </div>

            <div style={col}>
              {v.total.toLocaleString()}
            </div>

            <div style={{
              ...col,
              color:"#84CC16"
            }}>
              {v.unlocked.toLocaleString()}
            </div>

            <div style={{
              ...col,
              color:"#64748B"
            }}>
              {v.locked.toLocaleString()}
            </div>

            <div style={colSmall}>
              {v.tge}
            </div>

            <div style={colSmall}>
              {v.schedule}
            </div>

          </div>

        ))}

      </div>


      {/* SUPPLY */}

      <div style={supply}>
        Total Supply:
        <br/>
        {TOTAL_SUPPLY.toLocaleString()} BPUNCH
      </div>


    </div>

  );

}


/* STYLES */

const container: CSSProperties = {
  background: "#020617",
  minHeight: "100vh",
  color: "white",
  padding: "40px"
};

const title: CSSProperties = {
  fontSize: "32px",
  marginBottom: "30px"
};

const cardRow: CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap"
};

const card: CSSProperties = {
  background: "#020617",
  border: "1px solid #1E293B",
  padding: "20px",
  borderRadius: "12px",
  width: "260px"
};

const cardTitle: CSSProperties = {
  fontSize: "18px",
  marginBottom: "10px"
};

const green: CSSProperties = {
  color: "#84CC16",
  fontWeight: "bold",
  marginBottom: "5px"
};

const sub: CSSProperties = {
  color: "#64748B",
  fontSize: "13px"
};

const progressSection: CSSProperties = {
  marginBottom: "40px"
};

const progressTitle: CSSProperties = {
  marginBottom: "10px"
};

const progressBar: CSSProperties = {
  height: "8px",
  background: "#1E293B",
  borderRadius: "10px"
};

const progressFill: CSSProperties = {
  width: "0%",
  height: "100%",
  background: "#84CC16"
};

const progressText: CSSProperties = {
  marginTop: "8px",
  color: "#64748B",
  fontSize: "13px"
};

const table: CSSProperties = {
  marginTop: "20px"
};

const headerRow: CSSProperties = {
  display: "flex",
  borderBottom: "1px solid #1E293B",
  paddingBottom: "10px",
  marginBottom: "10px",
  color: "#64748B",
  fontSize: "13px"
};

const row: CSSProperties = {
  display: "flex",
  padding: "10px 0"
};

const colType: CSSProperties = {
  width: "140px"
};

const col: CSSProperties = {
  width: "180px"
};

const colSmall: CSSProperties = {
  width: "180px",
  fontSize: "12px",
  color: "#94A3B8"
};

const supply: CSSProperties = {
  marginTop: "40px",
  color: "#64748B",
  fontSize: "14px"
};