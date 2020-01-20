import React, { Component } from 'react'

export default class TimerList extends Component {
  state = {
    timeList: [],
  }

  componentDidMount = () => {
    const beginOfDay = this.props.date
      .clone()
      .startOf('day')
      .add(7, 'hours')
      .add(40, 'minutes')
    const endOfDay = this.props.date
      .clone()
      .startOf('day')
      .add(16, 'hours')
      .add(40, 'minutes')
    const timeList = []
    while (beginOfDay.isBefore(endOfDay, 'minutes')) {
      const curTime = beginOfDay.add(20, 'minutes').clone()
      timeList.push({ curTime, vacant: Math.round(Math.random() * 10) % 2 })
    }
    this.setState({ timeList })
  }

  handleClick = time => {
    if (!time.vacant) {
      this.props.onSelect(time.curTime)
    }
  }

  render() {
    const banners = this.state.timeList.map(time => {
      const cls = time.vacant === 1 ? 'used' : 'free'
      return (
        <div
          className={`timeBanner ${cls}`}
          key={time.curTime.toString()}
          onClick={() => this.handleClick(time)}
        >
          <div className="content">
            <span>{time.curTime.format('LT')}</span>
            <span>{time.vacant === 1 ? ' Это время уже занято' : ''}</span>
            <span>{time.vacant === 1 ? '' : ''}</span>
          </div>
        </div>
      )
    })

    return <>{banners}</>
  }
}
