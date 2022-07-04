import { addDays, addMonths, format, getDay, startOfMonth, startOfWeek } from "date-fns";
import * as React from "react";
import { range } from 'ramda'
import { StyleSheet } from "react-nativescript";

type DatePicker = {
    onChange: (value: Date) => void
    maxDate?: Date
    minDate?: Date
    date: Date | null
    dayInMonthStyles?: any
    dayOutMonthStyles?: any
    selectedDayStyles?: any
    todayStyles?: any
    calendarMonthNameStyles?: (date: Date) => JSX.Element
}

export function DatePicker(props: DatePicker) {
    const { date: dateSelected, onChange, dayInMonthStyles, dayOutMonthStyles, selectedDayStyles, todayStyles } = props

    const [firstDateOnMonth, setFirstDateOnMonth] = React.useState(startOfMonth(dateSelected || new Date()))
        
    React.useEffect(() => {
        setFirstDateOnMonth(startOfMonth(dateSelected || new Date()))
    }, [dateSelected])

    const firstDateOnMonthCalendar = startOfWeek(firstDateOnMonth)
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']

    const getStylesForDay = (date: Date) => {
        if (format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
            return todayStyles || styles.today
        } else if (dateSelected && format(date, 'yyyy-MM-dd') === format(dateSelected, 'yyyy-MM-dd')) {
            return selectedDayStyles || styles.selectedDate
        } else if (format(date, 'yyyy-MM') !== format(firstDateOnMonth, 'yyyy-MM')) {
            return dayOutMonthStyles || styles.dayOutOfMonth
        } else {
            return dayInMonthStyles || styles.dayInMonth
        }
    }

    return (
        <stackLayout>
            <flexboxLayout justifyContent="space-around">
                <label text="<" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, -1))} />
                <label text={format(firstDateOnMonth, 'MMMM yyyy')} />
                <label text=">" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, 1))} />
            </flexboxLayout>
            <gridLayout rows="*, *, *, *, *, *, *" columns="*, *, *, *, *, *, *" >
                {
                    range(0, 7).map(i => <label key={i} style={styles.nameOfDay} row={0} col={i} text={daysOfWeek[i]} />)
                }
                {
                    range(1, 43).map(i => {
                        const dateInCal = addDays(firstDateOnMonthCalendar, i - 1)
                        return (
                            <flexboxLayout 
                                style={getStylesForDay(dateInCal)} 
                                row={Math.ceil(i/7)} 
                                col={getDay(dateInCal)} 
                                key={i} onTap={() => onChange(dateInCal)} 
                            >
                                <label text={format(dateInCal, 'dd')} />
                            </flexboxLayout>
                        )
                    })
                }
            </gridLayout>
        </stackLayout>
    );
}

const styles = StyleSheet.create({
    today: {
        borderColor: "purple",
    },
    selectedDate: {
        color: "white",
        backgroundColor: "purple",
        borderRadius: '50%',
        justifyContent: 'center',
    },
    dayInMonth: {
        justifyContent: 'center',
        color: "black",
    },
    dayOutOfMonth: {
        justifyContent: 'center',
        color: 'grey'
    },
    nameOfDay: {
        justifyContent: 'center',
        fontWeight: 'bold'
    }
});
