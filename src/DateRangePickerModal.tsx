import { AbsoluteLayout, StackLayout } from '@nativescript/core';
import * as React from 'react'
import * as RNS from 'react-nativescript'
import { DateRangePicker } from './DateRangePicker';

// This is needed to keep the reconciler aware that it's the same portal on each render
const portalRoot = new RNS.NSVRoot();
const portalLabel = "Unique label to describe my portal";

type ModalDateRangePicker = {
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

export default function DateRangePickerModal(props: ModalDateRangePicker) {
    const { onChange, maxDate, minDate, startDate, endDate, dayInMonthStyles, dayOutMonthStyles, selectedDayStyles, todayStyles, calendarMonthNameStyles, betweenDatesStyles } = props
    const containerRef = React.useRef(null); // A ref to the container 
    const portalRef = React.useRef(null); // A ref for the react portal
    console.log(startDate, endDate)

    const handleOpenModal = () => {
        const containerView = containerRef.current?.nativeView as StackLayout
        const portalView = portalRef.current?.nativeView as AbsoluteLayout

        containerView.showModal(portalView, {
            animated: true,
            //fullscreen: true, // uncomment to make modal fullscreen 
            context: {},
            closeCallback: (args) => {
                console.log(`Closed with args`, args);
            }
        });
    }

    const handleCloseModal = () => {
        const portalView = portalRef.current?.nativeView as AbsoluteLayout

        portalView.closeModal({ name: 'react-nativescript is king' })
    }

    return (
        <>
            <stackLayout ref={containerRef}>
                <button text="Choose Date Range" onTap={handleOpenModal} />
            </stackLayout>

            {/*
                This portal is not rendered below the button.
                It's rendered into a null root, effectively creating a new DOM tree.
            */}
            {RNS.createPortal(
                (
                    <absoluteLayout ref={portalRef}>
                      <DateRangePicker 
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        betweenDatesStyles={betweenDatesStyles}
                        minDate={minDate}
                        maxDate={maxDate}
                        dayInMonthStyles={dayInMonthStyles}
                        dayOutMonthStyles={dayOutMonthStyles}
                        selectedDayStyles={selectedDayStyles}
                        todayStyles={todayStyles}
                        calendarMonthNameStyles={calendarMonthNameStyles}
                      />
                    </absoluteLayout>
                ),
                portalRoot,
                portalLabel
            )}
        </>
    );
}
