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

const ChildCharts = () => {
    const [isLettersLoading, setIsLettersLoading] = useState(false);
    const [letterStats, setLetterStats] = useState<Letter[]>([]);

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                setIsLettersLoading(true);
                const childId = useChildStore.getState().selectedChildId;
                const response = await axiosAPI.get(
                    `/exercises/stats/${childId}/letters`
                );
                console.log(response.data);
                setLetterStats(response.data);
            } catch (error: any) {
                console.error(
                    "Failed to fetch letter stats",
                    error.response?.data || error.message
                );
            } finally {
                setIsLettersLoading(false);
            }
        };
        fetchLetters();
    }, []);

    // Just for testing - pass this instead of letterStats 
    // const getMockLetters = (): Letter[] => {
    //     const letters: string[] = [];

    //     // A-Z
    //     for (let i = 65; i <= 90; i++) {
    //         letters.push(String.fromCharCode(i));
    //     }

    //     // a-z
    //     for (let i = 97; i <= 122; i++) {
    //         letters.push(String.fromCharCode(i));
    //     }

    //     return letters.map(letter => ({
    //         letter,
    //         avg_score: parseFloat((Math.random() * 100).toFixed(1))
    //     }));
    // };

    return (
        <div className={classes.childCharts}>
            <Label>Handwriting Progress</Label>
            {isLettersLoading ? <ClipLoader className={classes.clipLoader} /> :
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
                    </ResponsiveContainer>
            }
        </div>
    );
};

export default ChildCharts;
