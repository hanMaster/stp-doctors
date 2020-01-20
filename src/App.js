import React, { Component } from 'react'
import './App.scss'
import { doctors } from './data/data'
import * as moment from 'moment'
import 'moment/locale/ru'
import TextField from './Components/TextField/TextField'
import Doctor from './Components/Doctor/Doctor'
import TimerList from './Components/TimeList/TimeList'

export default class App extends Component {
  state = {
    step: 1,
    searchValue: '',
    docs: [],
    week: [],
    daySelected: null,
    docSelected: null,
    timeSelected: null,
    fio: '',
    phone: '',
    fioSent: false
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
    this.setState({ docSelected, daySelected, step: 2 })
  }

  handleTimeSelect = (timeSelected) => {
    this.setState({ timeSelected, step: 3 })
  }

  handlePhoneValue = e => {
    this.setState({ phone: e.target.value })
  }
  handleFioValue = e => {
    this.setState({ fio: e.target.value.trim() })
  }

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
        {this.state.step === 1 && (
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
        {this.state.step === 2 && (
          <div className="step2">
            <p>Пожалуйста выберите время</p>
            <TimerList date={this.state.daySelected} onSelect={this.handleTimeSelect} />
          </div>
        )}
        {this.state.step === 3 && (
          <div className="step3">
            <p>Вы сделали заявку на посещение врача: <strong>
              {doctors[this.state.docSelected].name}
            </strong> ({doctors[this.state.docSelected].specialisation})</p>
            <p>Дата посещения: <strong>{this.state.timeSelected.format('LL')}</strong> </p>
            <p>Время посещения: <strong>{this.state.timeSelected.format('LT')}</strong> </p>

            {!this.state.fioSent && <>
              <h2>Укажите свои данные для заявки</h2>
              <div className="info-group">
                <label htmlFor="name" className="info-group-label">ФИО</label>
                <input type="text" id='name' className="info-group-input" autoComplete="off" value={this.state.fio} onChange={this.handleFioValue} />
              </div>
              <div className="info-group">
                <label htmlFor="phone" className="info-group-label">Телефон</label>
                <input type="number" id='phone' className="info-group-input" autoComplete="off" value={this.state.phone}
                  onChange={this.handlePhoneValue} />
              </div>
              <button className="submit" onClick={() => this.setState({ fioSent: !this.state.fioSent })}>Отправить заявку</button>
            </>}

            {this.state.fioSent && <>
              <p>Ваша фамилия: <strong>{this.state.fio}</strong></p>
              <p>Ваш номер телефона: <strong>{this.state.phone}</strong></p>
            </>}
          </div>
        )}

      </div>
    )
  }
}
