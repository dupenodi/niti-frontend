import styles from './Card.module.css';

const Card = (props) => {
    return(
        <div className={styles.container}>
            <label className={styles.text}>{props.value}</label>
            
        </div>
    )
};

export default Card;