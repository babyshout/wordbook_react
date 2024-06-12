import {useState} from 'react'
import {formatDate} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from './event-utils'
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";

export default function Calendar() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])

    function handleWeekendsToggle() {
        console.log('handleWeekendsToggle called! weekendsVisible: ', weekendsVisible);
        setWeekendsVisible(!weekendsVisible)
    }

    function handleDateSelect(selectInfo) {
        console.log('handleDateSelect called selectInfo -> ', selectInfo)
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    function handleEventClick(clickInfo) {
        console.log('handleEventClick called!! clickInfo -> ', clickInfo)
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    function handleEventsSet(events) {
        console.log('handleEventsSet called!! events -> ', events)
        setCurrentEvents(events)
    }

    function handleEventAdd(arg) {
        console.log("eventAdd !! arg -> ", arg);

        console.log('arg.event -> ', arg.event)
        console.log('arg.revert', arg.revert)
        console.log('arg.relatedEvents', arg.relatedEvents)

        const data = arg.event;
        console.log('data', data);

        axios.post(
            serverUrl.calendar.postSchedule,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Data-Type": "xml",
                },
                withCredentials: true
            }
        ).then(response => {
            console.log(response)
        }).catch(reason => {
            console.log(reason)
            alert("remove 실패..  해당 이벤트 요청 revert 함!\n" +
                ""+ reason.response.data.message)
            arg.revert()
        })
    }

    function handleEventChange(arg) {
        console.log("eventChange !! arg -> ", arg);

        console.log('arg.event -> ', arg.event)
        console.log('arg.revert', arg.revert)
        console.log('arg.relatedEvents', arg.relatedEvents)
    }

    function handleEventRemove(arg) {
        console.log("eventRemove !! arg -> ", arg);

        console.log('arg.event -> ', arg.event)
        console.log('arg.revert', arg.revert)
        console.log('arg.relatedEvents', arg.relatedEvents)

        axios.delete(
            serverUrl.calendar.deleteSchedule(12)
        ).then(response => {
            console.log(response)
        }).catch(reason => {
            console.log(reason)
            alert("remove 실패..  해당 이벤트 요청 revert 함!\n" +
                ""+ reason.response.data.message)
            arg.revert()
        })
    }

    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
            ]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            locale={'kr'}
            // editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}

            // weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEventsSet} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove}

        />
    )
}

function renderEventContent(eventInfo) {
    console.log('renderEventContent called!!!! eventInfo -> ', eventInfo);
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function Sidebar({weekendsVisible, handleWeekendsToggle, currentEvents}) {
    return (
        <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
                <h2>Instructions</h2>
                <ul>
                    <li>Select dates and you will be prompted to create a new event</li>
                    <li>Drag, drop, and resize events</li>
                    <li>Click an event to delete it</li>
                </ul>
            </div>
            <div className='demo-app-sidebar-section'>
                <label>
                    <input
                        type='checkbox'
                        checked={weekendsVisible}
                        onChange={handleWeekendsToggle}
                    ></input>
                    toggle weekends
                </label>
            </div>
            <div className='demo-app-sidebar-section'>
                <h2>All Events ({currentEvents.length})</h2>
                <ul>
                    {currentEvents.map((event) => (
                        <SidebarEvent key={event.id} event={event}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function SidebarEvent({event}) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}
