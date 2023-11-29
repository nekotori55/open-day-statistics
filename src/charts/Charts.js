import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import "./charts.css";

export function Charts(props: { data: [] }) {
    return <div className={"charts-wrapper"}>
        <ResponsiveContainer width={"50%"} height={"50%"} className={"left-top"}>
            <BarChart
                data={props.data}
                layout={"vertical"}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 120
                }}
            >
                <CartesianGrid strokeDasharray={"3 3"}/>
                <XAxis dataKey="count" type={"number"}/>
                <YAxis dataKey="region" type={"category"}/>
                <Legend/>
                <Bar dataKey="count" name={"Количество"} fill="#8884d8" label={{fill: "white"}}/>
            </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={"50%"} height={"50%"} className={"left-bottom"}>
            <PieChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40
                }}
            >
                <Pie data={props.data} dataKey={"count"} nameKey={"region"} label={{fill: "black"}}/>
                <Tooltip/>
                <Legend layout={"vertical"} verticalAlign={"top"} align={"left"}/>
            </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={"50%"} height={"50%"} className={"right-top"}>
            <BarChart data={props.data} layout={"vertical"}
                      margin={{top: 20, right: 20, bottom: 20, left: 120}}
            >
                <CartesianGrid strokeDasharray={"3 3"}/>
                <XAxis dataKey="count" type={"number"}/>
                <YAxis dataKey="region" type={"category"}/>
                <Legend/>
                <Bar dataKey="count" name={"Количество"} fill="#8884d8" label={{fill: "white"}}/>
            </BarChart>
        </ResponsiveContainer>


        <ResponsiveContainer width={"50%"} height={"50%"} className={"right-bottom"}>
            <BarChart data={props.data} layout={"vertical"}
                      margin={{top: 20, right: 20, bottom: 20, left: 100}}
            >
                <CartesianGrid strokeDasharray={"3 3"}/>
                <XAxis dataKey="count" type={"number"}/>
                <YAxis dataKey="region" type={"category"}/>
                <Legend/>
                <Bar dataKey="count" name={"Количество"} fill="#8884d8" label={{fill: "white"}}/>
            </BarChart>
        </ResponsiveContainer>
    </div>;
}