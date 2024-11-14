import './index.scss';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
const apiUrl = process.env.REACT_APP_API_URL;
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : R$${payload[0].value} Reais`}</p>
                <p className="desc">Ganhos mensais.</p>
            </div>
        );
    }
    return null;
};

export default function App() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}valoresmensais`);
            const formattedData = response.data.map(item => ({
                name: `${item.mes}/${item.ano}`,
                pv: item.valor_total
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pv" fill="#8884d8" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
