import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis} from "recharts";
import React from "react";
import KalugaBarChart from "./KalugaBarChart";

function RegionBarChart(props: { data: [] }) {
    return <ResponsiveContainer {...props}>
        <BarChart data={props.data} layout={"vertical"}
                  margin={{top: 20, right: 20, bottom: 20, left: 120}}
        >
            <CartesianGrid strokeDasharray={"3 3"}/>
            <XAxis dataKey="count" type={"number"}/>
            <YAxis dataKey="region" type={"category"}/>
            <Legend/>
            <Bar dataKey="count" name={"Количество"} fill="#8884d8" label={{fill: "white"}}/>
        </BarChart>
    </ResponsiveContainer>;
}

export default RegionBarChart;