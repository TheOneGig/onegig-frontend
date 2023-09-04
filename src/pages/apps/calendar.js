import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useMediaQuery, Box, Dialog, SpeedDial, Tooltip } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

// project import
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import { useMutation } from 'react-query';
import Toolbar from 'sections/apps/calendar/Toolbar';
import AddEventForm from 'sections/apps/calendar/AddEventForm';
import { getEvents, selectEvent, selectRange, toggleModal, updateCalendarView, updateEvent } from 'store/reducers/calendar';
// import { showNotification } from '@mantine/notifications';
// import { IconCheck } from '@tabler/icons-react';
import { createNotification } from 'hooks/notifications';
import useAuth from 'hooks/useAuth';
// assets
import { PlusOutlined } from '@ant-design/icons';

const selectedEventHandler = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((event) => event.id === selectedEventId);
  }
  return null;
};

// ==============================|| CALENDAR - MAIN ||============================== //

const Calendar = () => {
  const { user } = useAuth();
  const userId = user.id;
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const createNotificationMutation = useMutation(createNotification);
  const calendar = useSelector((state) => state.calendar);
  const { calendarView, events, isModalOpen, selectedRange } = calendar;
  const selectedEvent = useSelector(selectedEventHandler);

  useEffect(() => {
    dispatch(getEvents(userId));
  }, [dispatch]);

  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  const [date, setDate] = useState(new Date());

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // calendar events
  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    dispatch(selectRange(arg.start, arg.end));
  };

  const handleEventSelect = (arg) => {
    dispatch(selectEvent(arg.event.eventId));
  };

  const handleEventUpdate = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.eventId, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        }),
        createNotificationMutation.mutate({
          variables: {
            userId: userId,
            message: 'A event has been updated'
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />

        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          eventDrop={handleEventUpdate}
          eventClick={handleEventSelect}
          eventResize={handleEventUpdate}
          height={matchDownSM ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      <Dialog maxWidth="sm" fullWidth onClose={handleModal} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isModalOpen && <AddEventForm event={selectedEvent} range={selectedRange} onCancel={handleModal} />}
      </Dialog>
      <Tooltip title="Add New Event">
        <SpeedDial
          ariaLabel="add-event-fab"
          sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
          icon={<PlusOutlined style={{ fontSize: '1.5rem' }} />}
          onClick={handleModal}
        />
      </Tooltip>
    </Box>
  );
};

export default Calendar;
