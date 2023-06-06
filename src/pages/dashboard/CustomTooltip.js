import PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'hsl(240, 1%, 26%)',
          color: '#fff',
          borderRadius: '5px',
          padding: '8px',
          minWidth: '150px',
          fontSize: '14px',
          opacity: '0.9'
        }}
      >
        <p style={{ margin: 0, lineHeight: 2, textTransform: 'uppercase', fontWeight: 600 }}>{label}</p>
        {payload.map((item, index) => (
          <p
            style={{ margin: 0, lineHeight: 1.5, color: item.name === 'revenue' ? '#54b79c' : '#e36161' }}
            key={index}
          >{`${item.name}: $${item.value}`}</p>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
};

export default CustomTooltip;
