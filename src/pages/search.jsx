import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import styles from "./search.module.css";

function Search() {


    const location = useLocation();
    const navigation = useNavigate();
    const results = location.state?.results || [];
console.log('Search page loaded', location.state );
    const [query, setQuery] = useState("");
    const [monsters, setMonsters] = useState(results);

    async function fetchMonsters() {

        try {

            const response = await axios.get(`https://api.hyrule-compendium.com/v3/compendium/category/monsters`);
            const data = response.data;
            setMonsters(data.data || []);

            return
        } catch (error) {

            console.error('Error fetching monsters:', error);
            setMonsters([]);
            return [];
        }
    }

    async function searchMonsters(query) {

        try {
            const response = await axios.get(`https://api.hyrule-compendium.com/v3/compendium/entry/${query}`);
            const data = response.data;
            const results = data.data ? [data.data] : [];

            setMonsters(results);

            return

        } catch (error) {

            console.error('Error searching monsters:', error);
            setMonsters([]);

            return;

        }
    }

    function sortMonsters(order) {

        const sortedMonsters = [...monsters];

        if (order === 'a-to-z') {
            sortedMonsters.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'z-to-a') {
            sortedMonsters.sort((a, b) => b.name.localeCompare(a.name));
        }

        setMonsters(sortedMonsters);

        return
    }

    function getDetails(monster) {


        navigation("/details", { state: { monster } });
    }


    return (
        <main>

            <form className={styles.monster__search} onSubmit={e => { e.preventDefault(); searchMonsters(query); }}>
                <input type="text" className={styles.monster__search__input} placeholder="Search for a monster..." value={query} onChange={e => setQuery(e.target.value)} />
                <button type="submit" className={styles.monster__search__button}>Search</button>
                <button className={styles.monster__search__all} onClick={fetchMonsters} type="button">Get All Monsters</button>
            </form>
            <div className={styles.monster__filter}>
                <p>Filter</p>
                <button className={`${styles.monster__filter__button} ${styles.filter__a_to_z}`} onClick={() => sortMonsters('a-to-z')} type="button">A to Z</button>
                <button className={`${styles.monster__filter__button} ${styles.filter__z_to_a}`} onClick={() => sortMonsters('z-to-a')} type="button">Z to A</button>
            </div>
            <div className={styles.monster__list}>
                {monsters.length === 0 && <p>No monsters found.</p>}
                {monsters.map((monster, index) => (
                    <div className={styles.monster} key={index} onClick={() => getDetails(monster)}>
                        <h2>{monster.name}</h2>
                        <p>Description: {monster.description}</p>
                        <figure>
                            <img src={monster.image} alt={monster.name} />
                        </figure>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Search;