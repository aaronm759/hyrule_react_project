import { useLocation } from "react-router"
import styles from "./getDetails.module.css";


export default function Details() {

    const location = useLocation();
    const monster = location.state?.monster || {};
    return (
        <div className={styles.monster}>
            <h1 className={styles.monster__name}>{monster.name}</h1>
            <p className={styles.monster__id}>ID: {monster.id}</p>
            <figure className={styles.monster__image}>
                <img src={monster.image} alt={monster.name} />
            </figure>
            <p className={styles.monster__description}>Description: {monster.description}</p>
            <p className={styles.monster__location}>Location: {monster.common_locations?.join(", ") || "Unknown"}</p>
            <p className={styles.monster__drops}>Drops: {monster.drops?.join(", ") || "None"}</p>


        </div>
    )
}