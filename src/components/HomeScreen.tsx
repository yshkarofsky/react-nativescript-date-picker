import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import { DatePicker } from "./DatePicker";
import { addDays, format } from "date-fns";
import ModalDatePicker from "./ModalDatePicker";
import DateRangePickerModal from "./DateRangePickerModal";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
}

export function HomeScreen({ navigation }: HomeScreenProps) {
    console.log('homesreen')
    const [date, setDate] = React.useState(new Date())
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(addDays(new Date(), 7))
    return (
        <stackLayout style={styles.container}>
            <label color="purple" fontSize={30} text={`selected date ${format(date, 'MM dd, yyyy')}`} />
            <DatePicker 
                onChange={(val) => setDate(val)}
                date={date}
            />
            <ModalDatePicker 
                onChange={(val) => setDate(val)}
                date={date}
            />
            <DateRangePickerModal
                startDate={startDate}
                endDate={endDate}
                onChange={({startDate, endDate}) => { setStartDate(startDate); setEndDate(endDate) }}
            />
        </stackLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
    },
    text: {
        textAlignment: "center",
        fontSize: 24,
        color: "black",
    },
    button: {
        fontSize: 24,
        color: "#2e6ddf",
    },
});