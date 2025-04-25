import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const uvMean = data.reduce((acc, item) => acc + item.uv, 0) / data.length;
const uvDiff = data.reduce((acc, item) => acc + (item.uv - uvMean) ** 2, 0);
const uvStdDev = Math.sqrt(uvDiff / data.length);

data.map(
  (item) => (item.uvz = Math.abs((item.uv - uvMean) / uvStdDev) > 1 ? 1 : 0)
);

const LineDot = (props: any) => {
  const { cx, cy, r, fill, stroke, strokeWidth } = props.myprops;
  return (
    <svg>
      <circle
        r={r}
        cx={cx}
        cy={cy}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        padding={{ left: 20, right: 20 }}
        tick={(e) => {
          const {
            payload: { value },
          } = e;
          const result = data.find((item) => item.name === value);
          const color = result?.uvz === 1 ? "red" : "#666";
          e["fill"] = color;
          return <Text {...e}>{value}</Text>;
        }}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        dot={(e) => {
          const {
            payload: { uvz },
          } = e;
          const result = data.find((item) => item.uvz === uvz);
          const color = result?.uvz === 1 ? "red" : "white";
          const radius = result?.uvz === 1 ? 4 : 3;
          e["fill"] = color;
          e["r"] = radius;
          const myprops = { ...e };
          delete myprops.key;
          return <LineDot key={e["key"]} myprops={myprops}></LineDot>;
        }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}
