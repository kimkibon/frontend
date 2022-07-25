import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


const DatePicker = (props) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])

  useEffect(() => {
    const dateRange = Math.ceil((date[0].endDate-date[0].startDate)/(1000*3600*24))
    props.propFunction({
      'RES_START_DATE': date[0].startDate.toISOString().split("T", 1)[0],
      'RES_END_DATE': date[0].endDate.toISOString().split("T", 1)[0],
      'RES_DATE_RANGE' : dateRange+1
    })
  }, [date])


  return (

    <DateRange
      editableDateInputs={true}
      minDate={new Date()}
      onChange={(item) => setDate([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={date}
    />

  )
}

export default DatePicker