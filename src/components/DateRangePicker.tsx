import { addDays, addMonths, format, getDay, startOfMonth, startOfWeek } from "date-fns";
import * as React from "react";
import { range } from 'ramda'
import { StyleSheet } from "react-nativescript";

type DateRangePicker = {
    onChange: ({startDate, endDate}) => void
    maxDate?: Date
    minDate?: Date
    startDate: Date | null
    endDate: Date | null
    dayInMonthStyles?: any
    dayOutMonthStyles?: any
    selectedDayStyles?: any
    todayStyles?: any
    betweenDatesStyles?: any
    calendarMonthNameStyles?: (date: Date) => JSX.Element
}

export function DateRangePicker(props: DateRangePicker) {
    const { endDate, startDate, onChange, dayInMonthStyles, dayOutMonthStyles, selectedDayStyles, todayStyles, betweenDatesStyles } = props

    const [firstDateOnMonth, setFirstDateOnMonth] = React.useState(startOfMonth(startDate || new Date()))
    
    React.useEffect(() => {
        setFirstDateOnMonth(startOfMonth(startDate || new Date()))
    }, [startDate, endDate])

    const firstDateOnMonthCalendar = startOfWeek(firstDateOnMonth)
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat']

    const getStylesForDay = (date: Date) => {
        if (startDate && format(date, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd')) {
            return selectedDayStyles || styles.selectedDates
        } else if (endDate && format(date, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
            return selectedDayStyles || styles.selectedDates 
        } else if (startDate && endDate && format(date, 'yyyy-MM-dd') < format(endDate, 'yyyy-MM-dd') && format(date, 'yyyy-MM-dd') > format(startDate, 'yyyy-MM-dd')) {
            return betweenDatesStyles || styles.inBetweenDates
        } else if (format(date, 'yyyy-MM') !== format(firstDateOnMonth, 'yyyy-MM')) {
            return dayOutMonthStyles || styles.dayOutOfMonth
        } else if (format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
            return todayStyles || styles.today
        } else {
            return dayInMonthStyles || styles.dayInMonth
        }
    }

    const onDateRangeChange = (val) => {
        if (!startDate && !endDate) return {
            startDate: val,
            endDate: undefined
        } 
        else if (!endDate) return {
            startDate,
            endDate: val
        }
        else return {
            startDate: val,
            endDate: undefined
        }

    }

    return (
        <flexboxLayout flexDirection="column" width={330} padding={10} borderColor="lightgrey" borderWidth={2} backgroundColor="transparent">
            <flexboxLayout order={1} justifyContent="space-around">
                <label fontSize='20px' text="<" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, -1))} />
                <label style={styles.nameOfMonth} text={format(firstDateOnMonth, 'MMMM yyyy')} />
                <label fontSize='20px' text=">" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, 1))} />
            </flexboxLayout>
            <gridLayout order={2} alignSelf="center" rows="40, 40, 40, 40, 40, 40, 40" columns="40, 40, 40, 40, 40, 40, 40" >
                {
                    range(0, 7).map(i => <flexboxLayout 
                            style={styles.nameOfDay} 
                            row={0} col={i}                        
                            key={i} 
                        >
                            <label key={i} style={styles.nameOfDay}  text={daysOfWeek[i]} />
                        </flexboxLayout>
                    )
                }
                {
                    range(1, 43).map(i => {
                        const dateInCal = addDays(firstDateOnMonthCalendar, i - 1)
                        return (
                            <flexboxLayout 
                                style={getStylesForDay(dateInCal)} 
                                row={Math.ceil(i/7)} 
                                col={getDay(dateInCal)} 
                                key={i} onTap={() => onChange(onDateRangeChange(dateInCal))} 
                            >
                                <label text={format(dateInCal, 'd')} />
                            </flexboxLayout>
                        )
                    })
                }
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    today: {
        backgroundColor: "lightgrey",
        fontSize: 18,
        borderRadius: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedDates: {
        color: "white",
        backgroundColor: "purple",
        // borderRadius: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inBetweenDates: {
        color: "white",
        backgroundColor: "#e1bee7",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayInMonth: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "#344054",
        fontSize: '16px',
        fontWeight: '500'
    },
    dayOutOfMonth: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#667085'
    },
    nameOfDay: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontWeight: 'bold',

    },
    nameOfMonth: {
        color: '#344054',
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'normal'
    }
});
