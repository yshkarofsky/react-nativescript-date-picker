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
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat']

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
        <flexboxLayout flexDirection="column" width={330} padding={10} borderColor="lightgrey" borderWidth={2} borderRadius="50px" backgroundColor="transparent">
            <flexboxLayout order={1} justifyContent="space-around">
                <label text="<" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, -1))} />
                <label style={styles.nameOfMonth} text={format(firstDateOnMonth, 'MMMM yyyy')} />
                <label text=">" onTap={() => setFirstDateOnMonth(addMonths(firstDateOnMonth, 1))} />
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
                                key={i} onTap={() => onChange(dateInCal)} 
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
        borderColor: "purple",
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedDate: {
        color: "white",
        backgroundColor: "purple",
        borderRadius: '30%',
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
        color: 'grey'
    },
    nameOfDay: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontWeight: 'bold',

    },
    nameOfMonth: {
        color: '#344054',
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'normal'
    }
});
