import {useEffect, useState } from 'react';

import Label from '../ui/label/Label';
import classes from './Articles.module.css';
import axios from "../../axiosAPI";

const Articles = () => {
    interface Article {
        id: number;
        title: string;
        description: string;
        link: string;
    }
    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("/exercises/articles/");
                setArticles(response.data);
                console.log(response);
            }
            catch (error: any) {
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className={classes.articlesDiv}>
            <Label>Handwriting Tips</Label>
            {articles.map(article => (
                <div className={classes.article} key={article.id}>
                    <h3>{article.title}</h3>
                    <label>{article.description}</label>
                    <a href={article.link} className={classes.link}>Learn More</a>
                </div>
            ))}
        </div>
    )
}

export default Articles;