import leftIcon from "../assets/left.png";
import rightIcon from "../assets/right.png";
import activeDot from "../assets/active.png";
import inactiveDot from "../assets/inactive.png";
import Page from "./Page.js";
import styles from './Container.module.css'
import { useEffect, useState } from "react";

const dummyResponseFromAPI = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"];

const pagination = (data, x) => {
    let result = [];
    let i=0;
    while(i<data.length){
        let pageData = [];
        for(let j=0; j<x; j++){
            pageData.push(data[i++]);
            if(i===data.length) break;
        }
        result.push(pageData);
    }
    return result;
};

const Container = () => {
    const [pageSize, setPageSize] = useState(3);
    const [activePage, setActivePage] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [currentActive, setCurrentActive] = useState(0);

    useEffect(() => {
        setPaginatedData(pagination(dummyResponseFromAPI, pageSize));
    }, [pageSize]);

    useEffect(() => {
        let active = [true];
        for(let i=1; i<paginatedData.length; i++){
            active.push(false);
        }
        setActivePage(active);
    }, [paginatedData]);

    const changePageSize = (event) => {
        setPageSize(parseInt(event.target.value));
    };

    const goRight = () => {
        let newActivePage = activePage;
        newActivePage[currentActive] = false;
        if(currentActive+1 === activePage.length){
            newActivePage[0] = true;
            setActivePage(newActivePage);
            setCurrentActive(0);
        }
        else{
            newActivePage[currentActive+1] = true;
            setActivePage(newActivePage);
            setCurrentActive(currentActive+1);
        }
    };

    const goLeft = () => {
        let newActivePage = activePage;
        newActivePage[currentActive] = false;
        if(currentActive-1 === -1){
            newActivePage[activePage.length-1] = true;
            setActivePage(newActivePage);
            setCurrentActive(activePage.length-1);
        }
        else{
            newActivePage[currentActive-1] = true;
            setActivePage(newActivePage);
            setCurrentActive(currentActive-1);
        }
    };

    const goTo = (i) => {
        console.log(i);
        let newActivePage = activePage;
        newActivePage[currentActive] = false;
        newActivePage[i] = true;
        setActivePage(newActivePage);
        setCurrentActive(i);
    };

    return(
        <>
            <div className={styles.header}>
                <label className={styles.text}>Page Size:   </label>
                <select className={styles.select} onChange={changePageSize}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
            

            <div className={styles.container}>
                <img className={styles.icon} src={leftIcon} onClick={goLeft}></img>
                {paginatedData.map((v,i) => (
                    activePage[i] && <Page values={v}></Page>
                ))}
                
                <img className={styles.icon} src={rightIcon} onClick={goRight}></img>
            </div>

            <div className={styles.dotArray}>
                {activePage.map((v,i)=>(
                    (v===true)?<img key={i} className={styles.dot} src={activeDot}></img>:<img key={i} className={styles.dot} src={inactiveDot} onClick={() => goTo(i)}></img>
                ))}
            </div>
        </>
    )
};

export default Container;