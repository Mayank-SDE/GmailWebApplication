import { ArrowBack, Delete } from '@mui/icons-material';
import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constants';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';
const Container = styled(Box)({
  marginLeft: '15px',
  width: '100%',
  '&>div': {
    display: 'flex',
    '&>p>span': {
      fontSize: '12px',
      color: '#5e5e5e',
    },
  },
});

const IconWrapper = styled(Box)({
  padding: '15px',
});
const Image = styled('img')({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  margin: '5px 10px 0px 10px',
  background: '#cccccc',
});
const Subject = styled(Typography)({
  fontSize: '22px',
  margin: '10px 0 20px 75px',
  display: 'flex',
});

const Indicator = styled(Box)({
  fontSize: '12px',
  background: '#dddddd',
  color: '#222222',
  padding: '2px 4px',
  marginLeft: '6px',
  borderRadius: '4px',
  alignSelf: 'center',
});

const Date = styled(Box)({
  margin: '0px 50px 0 auto',
  color: '#5e5e5e',
});
const ViewEmail = () => {
  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmail = () => {
    moveEmailsToBinService.call([email._id]);
    window.history.back();
  };
  return (
    <Box style={openDrawer ? { marginLeft: 250 } : { width: '100%' }}>
      <IconWrapper>
        <ArrowBack
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
        />
        <Delete
          fontSize="small"
          color="action"
          style={{ marginLeft: '40px' }}
          onClick={() => {
            deleteEmail();
          }}
        />
      </IconWrapper>
      <Subject>
        {email.subject}
        <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style={{ display: 'flex' }}>
        <Image src={emptyProfilePic} alt="dp" />
        <Container>
          <Box>
            <Typography style={{ marginTop: 10 }}>
              {email.name}
              <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Date>
              {new window.Date(email.date).getDate()}&nbsp;
              {new window.Date(email.date).toLocaleString('default', {
                month: 'long',
              })}
              &nbsp;
              {new window.Date(email.date).getFullYear()}
            </Date>
          </Box>
          <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ViewEmail;
