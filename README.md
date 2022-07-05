## Getting started

There are four components that are exported from this repository

```
DatePicker
DatePickerModal
DateRangePicker
DateRangePickerModal
```

example
```
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
```
