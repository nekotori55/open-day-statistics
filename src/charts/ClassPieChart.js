import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";
import KalugaBarChart from "./KalugaBarChart";

function ClassPieChart(props: { data: [], callbackfn: (entry, index) => any }) {
    return <ResponsiveContainer {...props}>
        <PieChart
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 40
            }}
        >
            <Pie data={props.data}
                 dataKey={"count"}
                 nameKey={"class"}
                 label={{fill: "black"}}
                 fill="#82ca9d">
                {props.data.map(props.callbackfn)}
            </Pie>
            <Tooltip/>
            <Legend layout={"vertical"} verticalAlign={"top"} align={"left"}/>
        </PieChart>
    </ResponsiveContainer>;
}

export default ClassPieChart;
