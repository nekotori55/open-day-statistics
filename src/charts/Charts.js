import {
    Bar,
    BarChart,
    CartesianGrid, Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import KalugaBarChart from "./KalugaBarChart";
import ClassPieChart from "./ClassPieChart";
import RegionBarChart from "./RegionBarChart";
import "./charts.css";


export function Charts(props: { district_data: [], class_data: [], region_data: [] }) {

    const COLORS = [
        "#EAB0E3",
        "#F0A8A8",
        "#95DBDA",
        "#9BAADD",
        "#F2EAC4"
    ];

    return <div className={"charts-wrapper"}>
        <KalugaBarChart data={props.district_data}
                        width={"50%"}
                        height={"50%"}
                        className={"left-top"}/>

        <ClassPieChart data={props.class_data}
                       callbackfn={(entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                       )}
                       width={"50%"}
                       height={"50%"}
                       className={"left-bottom"}/>

        <RegionBarChart data={props.region_data}
                        width={"50%"}
                        height={"100%"}
                        className={"right-top"}/>

    </div>;

}