import React, { Component } from 'react';
import { ResponsiveContainer } from 'recharts';
import {
    PieChart,
    Pie,
    Tooltip,
} from 'recharts';

class PieChartComponent extends Component {
    render() {
        const data01 = [
            { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
        ];
        const data02 = [
            { name: 'A1', value: 100 },
            { name: 'A2', value: 300 },
            { name: 'B1', value: 100 },
            { name: 'B2', value: 80 },
            { name: 'B3', value: 40 },
            { name: 'B4', value: 30 },
            { name: 'B5', value: 50 },
            { name: 'C1', value: 100 },
            { name: 'C2', value: 200 },
            { name: 'D1', value: 150 },
            { name: 'D2', value: 50 },
        ];

        return (
            <ResponsiveContainer>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <Pie data={data01} nameKey="name" valueKey="value" dataKey="value" outerRadius={60} fill="#e37c6d" />
                    <Pie data={data02} nameKey="name" valueKey="value" dataKey="value" innerRadius={70} outerRadius={90} fill="#26a1a3" label />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default PieChartComponent;