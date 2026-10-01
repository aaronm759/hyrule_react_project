import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "./homepage.module.css";


import boko from "/boko.png";
import ganon from "/ganon.png";
import guardian from "/guardian.png";
import link from "/link2.png";
import lynel from "/lynel.png";
const slides = [link, guardian, lynel, ganon, boko];


function Homepage() {

    const navigation = useNavigate();
    const [query, setQuery] = useState("");
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide(current => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    async function searchMonsters(query) {


        const response = await axios.get(`https://api.hyrule-compendium.com/v3/compendium/entry/${query}`);
        const data = response.data;
        const results = data.data ? [data.data] : [];

        console.log('Search results:', results);
        
        if(results.length === 1){
            const isEmptyObject = Object.keys(results[0]).length === 0;
            console.log('object empty', isEmptyObject);
            
            if (isEmptyObject) {
                setLoading(false);
                navigation('/search');
                return;
            }
        }

        setLoading(false);
        navigation('/search', { state: { results } });

    }


    return (
        <div className={styles.homepage}>
            <div className={styles.slideshow} aria-hidden="true">
                {slides.map((slide, index) => (
                    <div
                        key={slide}
                        className={`${styles.slide} ${index === activeSlide ? styles.slideActive : ""}`}
                        style={{ backgroundImage: `url(${slide})` }}
                    />
                ))}
            </div>
            <h1>Welcome to the Hyrule Compendium</h1>
            <form className={styles.monster__search} onSubmit={e => { e.preventDefault(); setLoading(true); searchMonsters(query); }}>
                <input type="text" className={styles.monster__search__input} placeholder="Search for a monster..." value={query} onChange={e => setQuery(e.target.value)} />
                <button type="submit" className={styles.monster__search__button}>{loading ? "Searching..." : "Search"}</button>
            </form>
        </div>
    );
}

export default Homepage;