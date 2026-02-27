"use client";

export default function Tokenomics() {
  const data = [
    { name: "Community", percent: 40, color: "#65A30D" },
    { name: "Presale", percent: 30, color: "#3B82F6" },
    { name: "Team", percent: 10, color: "#F59E0B" },
    { name: "Liquidity", percent: 10, color: "#A855F7" },
    { name: "Marketing", percent: 7, color: "#EC4899" },
    { name: "Reserve", percent: 3, color: "#64748B" }
  ];

  const gradient = data
    .map((item, index) => {
      const start = data
        .slice(0, index)
        .reduce((sum, a) => sum + a.percent, 0);
      const end = start + item.percent;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(",");

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-8">BPUNCH Tokenomics</h1>

      <div
        className="w-80 h-80 rounded-full flex items-center justify-center"
        style={{ background: `conic-gradient(${gradient})` }}
      >
        <div className="w-40 h-40 rounded-full bg-[#020617] flex flex-col items-center justify-center border-4 border-slate-800">
          <div className="text-4xl mb-2">🐵</div>
          <div className="text-lime-400 font-bold">BPUNCH</div>
        </div>
      </div>

      <div className="mt-8 w-80 space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.percent}%</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-slate-400 text-center">
        Total Supply
        <br />
        1,000,000,000 BPUNCH
      </p>
    </div>
  );
}