import PropTypes from 'prop-types';
import MainCard from 'components/MainCard';
import GigCard from './gigCard';
import Slider from "react-slick";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { getGigs } from 'hooks/gigs';
import { useTheme } from '@mui/material/styles';



const RelatedGigs = ({ user, gigId }) => {
  const theme = useTheme()
  const { fname, lname, userId } = user;
  const { data: gigs, isLoading } = useQuery(['gigs'], () => getGigs({userId}));

  if (isLoading) {
    return <div>Loading related gigs...</div>;
  }
  
  const gigOptions = gigs.filter((gig) => gig.published == true && gig.gigId !== gigId);


  const ArrowLeft = (props) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        left: -10,
        top: '50%'
      }}
    >
      <LeftOutlined  style={{ fontSize: 'large', color: theme.palette.primary.light }} />
    </Box>
  );

  const ArrowRight = (props) => (
    <Box
      {...props}
      color="secondary"
      className="next"
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        right: -10,
        top: '50%'
      }}
    >
      <RightOutlined style={{ fontSize: 'large', color: theme.palette.primary.light }} />
    </Box>
  );

  const settings = {
    dots: false,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: false,
    slidesToShow: 4, 
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    slideMargin: 10
  };  
  return (
    <>
      <Typography variant="h4" sx={{ margin: '20px 0px 10px 0px' }}>
        Other Services by {fname} {lname}
      </Typography>
      <MainCard sx={{backgroundColor: '#fff', color: '#111'}}>
      <Slider {...settings}>
        {gigOptions.map((gig) => (
          <Box key={gig.gigId} sx={{padding: '0 10px' }}>
              <GigCard gig={gig} />
          </Box>
        ))}
      </Slider>
      </MainCard>
    </>
  );
};

RelatedGigs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RelatedGigs;
