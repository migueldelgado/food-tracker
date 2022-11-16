import React, { useState } from 'react';
import Select from '../common/Select';
import CalendarCSS from './Calendar.module.css';
import { SelectValue } from '../common/Select';

interface Props {
    selectedDate?: Date;
    startWithSunday?: boolean;
}

const Calendar: React.FC<Props> = ({selectedDate = new Date(), startWithSunday = false}) => {

    const months: SelectValue[] = [
        { id: 0, name: 'January' },
        { id: 1, name: 'February' },
        { id: 2, name: 'March' },
        { id: 3, name: 'April' },
        { id: 4, name: 'May' },
        { id: 5, name: 'June' },
        { id: 6, name: 'July' },
        { id: 7, name: 'August' },
        { id: 8, name: 'September' },
        { id: 9, name: 'October' },
        { id: 10, name: 'November' },
        { id: 11, name: 'December' }
    ];

    let currentDate: Date = selectedDate;
    const calendarMatrix = getCalendarMatrix(currentDate, startWithSunday);
    const weekDays = getWeekDays(calendarMatrix[0]);

    const years: SelectValue[] = getYears();
    const defaultYear: SelectValue = getDefaultYear(years, currentDate);
    const defaultMonth: SelectValue = months[currentDate.getMonth()];

    const [calendarMonth, setCalendarMonth] = useState<Date[][]>(calendarMatrix);
    const [weekDayNames, setweekDayNames] = useState<string[]>(weekDays);

    function getDefaultYear(yearsAvailable: SelectValue[], currentDate: Date): SelectValue {
        const currentYear = currentDate.getFullYear().toString();
        const yearSelected = yearsAvailable.find(year => year.name.toString() === currentYear);
        return yearSelected || yearsAvailable[0];
    }

    function getYears(): SelectValue[] {
        const pastYears = 15;
        const year = [];
        const currentYear = new Date().getFullYear();

        let startingYear = currentYear - pastYears;

        for (let i=0 ; i <= pastYears ; i++) {
            year.push({
                id: i,
                name: startingYear++
            })
        }

        return year
    }

    function getCalendarMatrix(date: Date, startWithSunday: boolean): Date[][] {

        const calendarMatrix: Date[][] = [];
        let calendarWeek: Date[] = [];

        const firstDayOfCalendar = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfCalendar = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        /* This will allow to start week with Monday instead of Sunday */
        let startDayPosition = (firstDayOfCalendar.getDay() + 6) % 7;
        let endDayPosition = (lastDayOfCalendar.getDay() + 6) % 7;

        if (startWithSunday) {
            startDayPosition = firstDayOfCalendar.getDay();
            endDayPosition = lastDayOfCalendar.getDay();
        }

        /* 
            It will adjust the first day of the month in case that it doesnt start with monday
            and same for the last day in case that is not sunday
        */
        firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - startDayPosition);
        lastDayOfCalendar.setDate(lastDayOfCalendar.getDate() + (6 - endDayPosition));

        while(firstDayOfCalendar <= lastDayOfCalendar) {
            calendarWeek.push(new Date(firstDayOfCalendar));
            if (calendarWeek.length === 7) {
                calendarMatrix.push(calendarWeek);
                calendarWeek = [];
            }
            firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() + 1);
        }

        return calendarMatrix;
    }

    function getDayNameByDate(dayDate: Date): string {
        return new Intl.DateTimeFormat('default', { weekday: 'long' }).format(dayDate);
    }

    function getWeekDays(week: Date[]): string[] {
        const result: string[] = [];
        week.forEach(day => result.push(getDayNameByDate(day)));
        return result;
    }

    function onChangeYear(selectedValue: SelectValue): void {
        currentDate.setFullYear(selectedValue.name as number);
        setCalendarMonth(getCalendarMatrix(currentDate, startWithSunday));
    }

    function onChangeMonth(selectedValue: SelectValue): void {
        currentDate.setMonth(selectedValue.id);
        setCalendarMonth(getCalendarMatrix(currentDate, startWithSunday));
    }

    function onClickDay(evt: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Date): void {
        console.log(date);
    }


  return (
    <div className={CalendarCSS['calendar']}>
        <div className={CalendarCSS['calendar-header']}>
            <Select options={months} defaultValue={defaultMonth} onChange={(evt: SelectValue) => onChangeMonth(evt)} />
            <Select options={years} defaultValue={defaultYear} onChange={(evt: SelectValue) => onChangeYear(evt)} />
        </div>
        <div>
            <div className={CalendarCSS.row}>
                {
                    weekDayNames.map((dayName, idxWeek) => (
                        <div key={idxWeek} className={CalendarCSS.calendarDayTitle}>
                            <h4>{dayName}</h4>
                        </div>
                    ))
                }
            </div>
            {
                calendarMonth.map((week, idxDay) => (
                    <div key={idxDay} className={CalendarCSS.row}>
                        {
                            week.map((day, idx) => (
                                <div 
                                    key={idx} className={CalendarCSS.calendarDay} 
                                    onClick={(evt) => onClickDay(evt, day)}
                                >
                                    <div className="dayNumber">{day.getDate()}</div>
                                    <div className="day-tasks">TASKS</div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    </div>

  )
}

export default Calendar