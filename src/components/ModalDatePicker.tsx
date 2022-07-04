import { AbsoluteLayout, StackLayout } from '@nativescript/core';
import * as React from 'react'
import * as RNS from 'react-nativescript'
import { DatePicker } from './DatePicker';

// This is needed to keep the reconciler aware that it's the same portal on each render
const portalRoot = new RNS.NSVRoot();
const portalLabel = "Unique label to describe my portal";

type ModalDatePicker = {
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

export default function ModalDatePicker(props: ModalDatePicker) {
    const { onChange, maxDate, minDate, date, dayInMonthStyles, dayOutMonthStyles, selectedDayStyles, todayStyles, calendarMonthNameStyles } = props
    const containerRef = React.useRef(null); // A ref to the container 
    const portalRef = React.useRef(null); // A ref for the react portal

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
                <button text="Choose Date" onTap={handleOpenModal} />
            </stackLayout>

            {/*
                This portal is not rendered below the button.
                It's rendered into a null root, effectively creating a new DOM tree.
            */}
            {RNS.createPortal(
                (
                    <absoluteLayout ref={portalRef}>
                      <DatePicker 
                        onChange={onChange}
                        date={date}
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
