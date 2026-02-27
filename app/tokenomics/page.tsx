"use client";

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
const container = {
  background: "#020617",
  minHeight: "100vh",
  display: "flex" as const,
  flexDirection: "column" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  color: "white"
};

const title = {
  fontSize: "32px",
  marginBottom: "30px"
};

const chartWrapper = {
  marginBottom: "30px"
};

const donut = {
  width: "360px",
  height: "360px",
  borderRadius: "50%",
  display: "flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const
};

const center = {
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "#020617",
  display: "flex" as const,
  flexDirection: "column" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  border: "4px solid #1E293B"
};

const monkeyIcon = {
  fontSize: "50px",
  marginBottom: "10px",
  background: "#FACC15",
  width: "70px",
  height: "70px",
  borderRadius: "16px",
  display: "flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const
};

const centerText = {
  color: "#84CC16",
  fontWeight: "bold"
};

const legend = {
  width: "320px"
};

const row = {
  display: "flex" as const,
  justifyContent: "space-between" as const,
  marginTop: "10px"
};

const total = {
  marginTop: "20px",
  color: "#94A3B8",
  textAlign: "center" as const
};