import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { Dialogs } from '@nativescript/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
}

export function HomeScreen({ navigation }: HomeScreenProps) {
    console.log('homesreen')
    const [date, setDate] = React.useState(new Date())
    return (
        <stackLayout style={styles.container}>
            <label color="purple" fontSize={30} text={`selected date ${format(date, 'MM dd, yyyy')}`} />
            <DatePicker 
                onChange={(val) => setDate(val)}
                date={date}
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