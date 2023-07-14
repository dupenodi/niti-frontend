import styles from './Page.module.css';
import Card from './Card';

const Page = (props) => {
    return(
        <div className={styles.container}>
            {props.values.map((v,i) => (
                <Card value={v} key={i}/>
            ))}
        </div>
    )
};

export default Page;