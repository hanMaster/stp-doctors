import React, { Component } from 'react'
import './App.scss'
import { doctors } from './data/data'
import * as moment from 'moment'
import 'moment/locale/ru'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import interactionPlugin from '@fullcalendar/interaction'

import TextField from './Components/TextField/TextField'
import Doctor from './Components/Doctor/Doctor'

export default class App extends Component {
  state = {
    searchValue: '',
    docs: [],
    week: [],
    daySelected: null,
    docSelected: null,
  }

  componentDidMount() {
    moment.locale('ru')
    const startDay = moment()
    const endDay = startDay.clone().endOf('isoWeek')
    const date = startDay.clone().subtract(1, 'day')
    const week = []
    while (date.isBefore(endDay, 'day')) {
      const currentDay = date.add(1, 'day').clone()
      week.push({ day: currentDay })
    }
    this.setState({
      docs: doctors,
      week,
    })
  }

  handleSearchChange = e => {
    const val = e.target.value.trim()
    if (val) {
      this.setState({ searchValue: val })

      const docs = doctors.filter(doc =>
        doc.name.toLowerCase().includes(val.toLowerCase())
      )
      this.setState({ docs })
    } else {
      this.setState({ searchValue: '', docs: doctors })
    }
  }

  handleDaySelected = (docSelected, daySelected) => {
    this.setState({ docSelected, daySelected })
  }

  handleDateClick = arg => alert('arg' + arg.dateStr)

  render() {
    const doctorsList = this.state.docs.map(doctor => {
      return (
        <Doctor
          {...doctor}
          week={this.state.week}
          key={doctor.id}
          handleDaySelected={this.handleDaySelected}
        />
      )
    })

    return (
      <div className="App">
        <h1>Запись на прием к врачу</h1>

        {!this.state.daySelected && (
          <div className="step1">
            <div className="header">
              <TextField
                value={this.state.searchValue}
                onChange={this.handleSearchChange}
              />
              <p>
                Неделя с <strong>{moment().format('LL')}</strong> по{' '}
                <strong>
                  {moment()
                    .add(6, 'day')
                    .format('LL')}
                </strong>
              </p>
            </div>

            {doctorsList}
          </div>
        )}
        {this.state.daySelected && (
          <div className="step2">
            <p>Пора выбрать время</p>

            <FullCalendar
              locale={ruLocale}
              defaultDate={this.state.daySelected.format('YYYY-MM-DD')}
              defaultView="dayGridDay"
              dateClick={this.handleDateClick}
              plugins={[dayGridPlugin, interactionPlugin]}
            />
          </div>
        )}
      </div>
    )
  }
}
