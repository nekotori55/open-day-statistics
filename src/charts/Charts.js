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

    const compare = (a, b) => {
        return b.count - a.count;
    }

    return <div className={"charts-wrapper"}>
        <div className={"left-top"}>
            <h2>Субъекты России</h2>

            <RegionBarChart data={props.region_data.filter(item => item.id !== "RU-KLU").sort(compare).slice(0, 10)}/>
        </div>

        <ClassPieChart data={props.class_data}
                       callbackfn={(entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                       )}
                       width={"50%"}
                       height={"50%"}
                       className={"left-bottom"}/>

        <div className={"right-top"}>
            <h2>Районы Калуги</h2>

            <KalugaBarChart data={props.district_data.sort(compare).slice(0, 15)}/>
        </div>

    </div>;

}