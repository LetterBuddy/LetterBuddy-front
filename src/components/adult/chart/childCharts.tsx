import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

const ChildCharts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [letterStats, setLetterStats] = useState<Letter[]>([]);
    const [levelStats, setLevelStats] = useState<Level[]>([]);

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
            <Label>Progress By Letter</Label>
            {isLoading ? <ClipLoader className={classes.clipLoader} /> :
                letterStats.length === 0 ? <Label>No Letters Info...</Label> :
                    <ResponsiveContainer className={classes.chartContainer}>
                        <BarChart
                            data={letterStats}
                        >
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
                    </ResponsiveContainer>}
            <Label>Progress By Level</Label>
            {isLoading ? <ClipLoader className={classes.clipLoader} /> :
                levelStats.length === 0 ? (
                    <Label>No Level Info...</Label>
                ) : (
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
            )}
        </div>
    );
};

export default ChildCharts;
