import { useNavigate, useParams} from 'react-router-dom';
import style from './history.module.css';
import { useEffect, useState } from 'react';

function HistoryMonth(props) {
    const navigate = useNavigate()
    const {year} = useParams();
    const monthIndex = {
        0 : 'January',
        1 : 'February',
        2 : 'March',
        3 : 'April',
        4 : 'May',
        5 : 'June',
        6 : 'July',
        7 : 'August',
        8 : 'September',
        9 : 'October',
        10: 'November',
        11: 'December'
    }
    const monthIndex0 = {
        0 : 'Jan',
        1 : 'Feb',
        2 : 'Mar',
        3 : 'Apr',
        4 : 'May',
        5 : 'Jun',
        6 : 'Jul',
        7 : 'Aug',
        8 : 'Sep',
        9 : 'Oct',
        10: 'Nov',
        11: 'Dec'
    }
    let loginVal = props.loginState[0];
    let dateVal = props.dateCreated[0];
    while(!dateVal)
    {
        return <div>Loading...</div>
    }
    var currentYear = new Date().getFullYear();

    const prevMonths = (j) =>{
        const monthList = []
        for(var i =0;i<j;i++)
        {
            // monthList.push(monthIndex[i])
            monthList.push(<p id={`style.month${i}`}>{monthIndex0[i]}</p>)
            // monthList.push(" ")
        }
        return monthList
    }
    const nextMonths = (j) =>{
        const monthList = []
        for(var i=j+1;i<12;i++)
        {
                monthList.push(<p id={`style.month${i}`}>{monthIndex0[i]}</p>)
                // monthList.push(monthIndex[i])
                // monthList.push(" ")
        }
        return monthList
    }

    

    const dynamicallyRenderMonths = ()=>{
        const monthPass = []
        var currentMonth = new Date().getMonth();
        var createdyear = dateVal.slice(0,4)
        var initialMonth =  dateVal.slice(5,7)

        if(currentYear == year && currentYear == createdyear)
            for(var i = initialMonth-1;i<=currentMonth;i++)
                monthPass.push(
                    <div className={style.monthCard} id={i} onClick={handleMonthCardClick}>
                            <div className={style.monthCardTitle}>
                                MONTH
                            </div>
                            <div className={style.monthCardText}>
                                {prevMonths(i)}
                                <h1 style={{color:'plum'}} id={`style.month${i}`}>{monthIndex[i]}</h1>
                                {nextMonths(i)}
                            </div>
                    </div>
                )
        else if(currentYear == year)
            for(var i = 0;i<=currentMonth;i++)
                monthPass.push(
                    <div className={style.monthCard} id={i} onClick={handleMonthCardClick}>
                            <div className={style.monthCardTitle}>
                                MONTH
                            </div>
                            <div className={style.monthCardText}>
                                {prevMonths(i)}
                                <h3 style={{color:'plum'}}  id={`style.month${i}`}>{monthIndex[i]}</h3>
                                {nextMonths(i)}
                            </div>
                    </div>
                )
        else if(year == createdyear)
            for(var i = initialMonth-1;i<12;i++)
                monthPass.push(
                    <div className={style.monthCard} id={i} onClick={handleMonthCardClick}>
                            <div className={style.monthCardTitle}>
                                MONTH
                            </div>
                            <div className={style.monthCardText}>
                                {prevMonths(i)}
                                <h3 style={{color:'plum'}} id={`style.month${i}`}>{monthIndex[i]}</h3>
                                {nextMonths(i)}
                            </div>
                    </div>
                )
        else
            for(var i = 0;i<12;i++)
                monthPass.push(
                    <div className={style.monthCard} id={i} onClick={handleMonthCardClick}>
                            <div className={style.monthCardTitle}>
                                MONTH
                            </div>
                            <div className={style.monthCardText}>
                                {prevMonths(i)}
                                <h3 style={{color:'plum'}}  id={`style.month${i}`}>{monthIndex[i]}</h3>
                                {nextMonths(i)}
                            </div>
                    </div>
        )
        
        return monthPass
    }

    
    const handleMonthCardClick = (event)=>{
        navigate(`./${event.currentTarget.id}`)
    }
    
    return ( 
        <div className={style.content}>
            <div className={style.cardPage}>
                {dynamicallyRenderMonths()}
            </div>
            <div className={style.backDiv}>
                <button className={style.backButton} onClick={()=>{navigate(-1)}}>Go Back</button>
            </div>
        </div>
     );
}

export default HistoryMonth;