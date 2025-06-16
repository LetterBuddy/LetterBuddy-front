import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Label from "../../ui/label/Label";
import classes from "./childCharts.module.css";
import axiosAPI from "../../../axiosAPI";
import useChildStore from "../../../store/useChildStore";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface Letter {
    letter: string;
    avg_score: number;
}

interface Level {
    level: string;
    avg_score: number;
}

interface DailyStats {
    day: string;
    avg_score: number;
    exercise_count: number;
}

interface ConfusedLetter {
    letter: string,
    confused_with: string,
    times: number,
    confusion_percentage: number
}


const ChildCharts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [letterStats, setLetterStats] = useState<Letter[]>([]);
    const [levelStats, setLevelStats] = useState<Level[]>([]);
    const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
    const [confusedLetters, setConfusedLetters] = useState<ConfusedLetter[]>([]);
    useEffect(() => {
        const fetchLetters = async () => {
            try {
                setIsLoading(true);
                const childId = useChildStore.getState().selectedChildId;
                const response = await axiosAPI.get(
                    `/exercises/stats/${childId}/`
                );
                console.log(response.data);
                setLetterStats(response.data.letter_scores);
                setLevelStats(response.data.level_scores);
                setDailyStats(response.data.daily_scores);
                setConfusedLetters(response.data.often_confused_letters);
            } catch (error: any) {
                console.error(
                    "Failed to fetch letter stats",
                    error.response?.data || error.message
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchLetters();
    }, []);

    return (
        <div className={classes.childCharts}>
            {isLoading && <ClipLoader className={classes.clipLoader} />}
            {!isLoading && letterStats.length === 0 && dailyStats.length === 0 && 
             confusedLetters.length === 0 && levelStats.length === 0 && (
                <Label>No Data Available...</Label>
            )}
            {!isLoading && (
                <>
                    {letterStats.length > 0 && (
                        <>
                            <Label>Progress By Letter</Label>
                            <ResponsiveContainer className={classes.chartContainer}>
                                <BarChart data={letterStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="letter" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        fill="#2A004E"
                                        dataKey="avg_score"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {dailyStats.length > 0 && (
                        <>
                            <Label>Daily Progression</Label>
                            <ResponsiveContainer className={classes.chartContainer}>
                                <LineChart data={dailyStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(label, payload) => {
                                            const exerciseCount = payload[0]?.payload?.exercise_count;
                                            return `Date: ${label} (Exercised ${exerciseCount} Exercises)`;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="avg_score"
                                        stroke="#2A004E"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {confusedLetters.length > 0 && (
                        <>
                            <Label>Often Confused Letters</Label>
                            <ResponsiveContainer className={classes.chartContainer}>
                                <BarChart data={confusedLetters}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="category"
                                        dataKey={(entry) => `${entry.letter} was confused with ${entry.confused_with}`}/>
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, _, entry) => {
                                            const times = entry?.payload?.times;
                                            return [
                                                `Confusion Percentage: ${value} (Confused ${times} times)`,
                                            ];
                                        }}/>
                                    <Bar
                                        fill="#2A004E"
                                        dataKey="confusion_percentage"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {levelStats.length > 0 && (
                        <>
                            <Label>Progress By Level</Label>
                            <ResponsiveContainer className={classes.chartContainer}>
                                <BarChart data={levelStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="level" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        fill="#2A004E"
                                        dataKey="avg_score"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ChildCharts;
