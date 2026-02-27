"use client";
import type { CSSProperties } from "react";
export default function Tokenomics(){

  const data = [

    {
      name:"Community",
      percent:40,
      color:"#65A30D"
    },

    {
      name:"Presale",
      percent:30,
      color:"#3B82F6"
    },

    {
      name:"Team",
      percent:10,
      color:"#F59E0B"
    },

    {
      name:"Liquidity",
      percent:10,
      color:"#A855F7"
    },

    {
      name:"Marketing",
      percent:7,
      color:"#EC4899"
    },

    {
      name:"Reserve",
      percent:3,
      color:"#64748B"
    }

  ];


  const gradient =
    data
      .map((item,index)=>{

        const start =
          data
            .slice(0,index)
            .reduce(
              (sum,a)=>sum+a.percent,
              0);

        const end =
          start + item.percent;

        return `${item.color} ${start}% ${end}%`;

      })
      .join(",");



  return(

    <div style={container}>


      <h1 style={title}>
        BPUNCH Tokenomics
      </h1>



      {/* DONUT */}

      <div style={chartWrapper}>


        <div
          style={{
            ...donut,
            background:`conic-gradient(${gradient})`
          }}
        >


          {/* CENTER */}

          <div style={center}>


            {/* MONKEY LOGO */}

            <div style={monkeyIcon}>
              🐵
            </div>


            <p style={centerText}>
              BPUNCH
            </p>


          </div>


        </div>


      </div>



      {/* LEGEND */}

      <div style={legend}>


        {data.map((item,i)=>(

          <div key={i} style={row}>


            <div
              style={{
                width:"14px",
                height:"14px",
                background:item.color,
                borderRadius:"4px"
              }}
            />


            <span>
              {item.name}
            </span>


            <span>
              {item.percent}%
            </span>


          </div>

        ))}


      </div>



      <p style={total}>
        Total Supply:
        <br/>
        1,000,000,000 BPUNCH
      </p>



    </div>

  );

}



/* STYLES */
const container: CSSProperties = {
  background: "#020617",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white"
};

const title: CSSProperties = {
  fontSize: "32px",
  marginBottom: "30px"
};

const chartWrapper: CSSProperties = {
  marginBottom: "30px"
};

const donut: CSSProperties = {
  width: "360px",
  height: "360px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const center: CSSProperties = {
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "#020617",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "4px solid #1E293B"
};

const monkeyIcon: CSSProperties = {
  fontSize: "50px",
  marginBottom: "10px",
  background: "#FACC15",
  width: "70px",
  height: "70px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const centerText: CSSProperties = {
  color: "#84CC16",
  fontWeight: "bold"
};

const legend: CSSProperties = {
  width: "320px"
};

const row: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px"
};

const total: CSSProperties = {
  marginTop: "20px",
  color: "#94A3B8",
  textAlign: "center"
};