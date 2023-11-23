import { useEffect, useState } from 'react';
import CalendarView from '../../components/CalendarView';
import moment from 'moment';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil';
import { CALENDAR_INITIAL_EVENTS } from '../../utils/dummyData';
import { useDispatch } from 'react-redux';
import { openRightDrawer } from '../../slices/rightDrawerSlice';
import { setPageTitle, showNotification } from '../../slices/headerSlice';

const INITIAL_EVENTS = CALENDAR_INITIAL_EVENTS;

function Calendar() {
  const dispatch = useDispatch();

  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Add your own Add Event handler, like opening modal or random event addition
  // Format - {title :"", theme: "", startTime : "", endTime : ""}, typescript version comming soon :)
  const addNewEvent = (date) => {
    let randomEvent = INITIAL_EVENTS[Math.floor(Math.random() * 10)];
    let newEventObj = {
      title: randomEvent.title,
      theme: randomEvent.theme,
      startTime: moment(date).startOf('day'),
      endTime: moment(date).endOf('day'),
    };
    setEvents([...events, newEventObj]);
    dispatch(showNotification({ message: 'New Event Added!', status: 1 }));
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: 'Calendar' }));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  // Open all events of current day in sidebar
  const openDayDetail = ({ filteredEvents, title }) => {
    dispatch(
      openRightDrawer({
        header: title,
        bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS,
        extraObject: { filteredEvents },
      })
    );
  };

  return (
    <>
      <CalendarView
        calendarEvents={events}
        addNewEvent={addNewEvent}
        openDayDetail={openDayDetail}
      />
    </>
  );
}

export default Calendar;
