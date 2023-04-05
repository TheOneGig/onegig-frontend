import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cal, { getCalApi } from '@calcom/embed-react';

const Calendar = ({ calUrl }) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#000000' } }, hideEventTypeDetails: false });
    })();
  }, []);
  return <Cal calLink={calUrl} style={{ width: '100%', height: '100%', overflow: 'scroll' }} />;
};

Calendar.propTypes = {
  calUrl: PropTypes.string
};

export default Calendar;
