import { useEffect, useState ,useRef} from 'react';
import style from './history.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HistoryYear(props) {
    let loginVal = props.loginState[0];
    let dateVal = props.dateCreated[0];
    // let loginVal , dateVal;
    // useEffect(() => {
    //     const loginval = JSON.parse(localStorage.getItem('loginVal'));
    //     if (loginval) {
    //      loginVal = loginval;
    //     }
    //     else{
    
    //     }
    //     const items = JSON.parse(localStorage.getItem('dateCreated'));
    //     if (items) {
    //      dateVal = items;
    //     }
    //   },[loginVal,dateVal]);
    //   console.log(dateVal,loginVal)

    const navigate = useNavigate();
    while(!dateVal)
    {
        return <div>Loading...</div>
    }
    var currentYear = new Date().getFullYear();
    console.log(dateVal)
    var differenceInYear= (currentYear-parseInt(dateVal.slice(0,4)))

    const nextYears = (currentYear) =>{
        const yearList = []
        var count = 5
        for(var j =0; j>-5; j--)
        {
            yearList.push(<p id={`style.year${count}`}>{currentYear-j}</p>)
            // yearList.push(currentYear-j)
            // yearList.push(" ")
            count ++
        }
        return yearList
    }
    const prevYears = (currentYear) =>{
        const yearList = []
        var count=0;
        for(var j =6; j>1; j--)
        {
            yearList.push(<p id={`style.year${count}`}>{currentYear-j}</p>)
            // yearList.push(currentYear-j)
            // yearList.push(" ")  
            count ++
        }
        return yearList
    }

    const dynamicallyRenderYear = ()=>{
        const yearCards = [];
        for(var i =0;i<=differenceInYear;i++)
        {
            yearCards.push(
                        <div className={style.yearCard} id={currentYear-i} onClick={handleYearCardClick}>
                        <div className={style.yearCardTitle}>
                            YEAR
                        </div>
                        <div className={style.yearCardText}>
                            {prevYears(currentYear)}
                            <h3 style={{color:'plum' , fontSize:'30px'}} id={style.yearSpl}>{currentYear-i}</h3>
                            {nextYears(currentYear)}
                        </div>
                        {/* <div className={style.yearCardText}>
                            {currentYear-i}
                        </div> */}
                        </div>

            )
        }
        return yearCards
    }
    const handleYearCardClick = (event) =>{
        navigate(`/history/${event.currentTarget.id}`)
    }

    return ( 
        <div className={style.content}>
            <div className={style.cardPage}>
                {dynamicallyRenderYear()}
            </div>
            <div className={style.backDiv}>
                <button className={style.backButton} onClick={()=>{navigate(-1)}}>Go Back</button>
            </div>  
        </div>
     );
}

export default HistoryYear;

{/* <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2024
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2025
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2026
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2027
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2028
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2029
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2030
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                            YEAR
                        </div>
                        <div className={style.cardText}>
                            2031
                        </div>
                    </div> */}