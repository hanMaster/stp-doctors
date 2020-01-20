import React from 'react'

function Doctor({id, name, specialisation, week, handleDaySelected }) {
  const days = week.map(weekDay => {
    return (
      <div className="doctor-days" key={weekDay.day.format('DD')}>
        <div className="day" onClick={()=>handleDaySelected(id, weekDay.day)}>{weekDay.day.format('DD.MM')}</div>
      </div>
    )
  })
  return (
    <div className="doctor">
      <div className="doctor-wrapper">
        <span className="doctor-name">{name}</span>
        <span className="doctor-spec">{specialisation}</span>
      </div>

      {days}
    </div>
  )
}

export default Doctor
