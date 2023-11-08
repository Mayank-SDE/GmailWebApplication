import { Star, StarBorder } from '@mui/icons-material';
import { Box, Checkbox, Typography, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box)({
  padding: '0px 0px 0px 10px',
  background: '#f2f6fc',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&>div': {
    display: 'flex',
    width: '100%',
    '&>p': {
      fontSize: '14px',
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: '12px !important',
  background: '#dddddd',
  color: '#222222',
  padding: '0px 4px',
  borderRadius: '4px',
  marginRight: '6px',
});

const Date = styled(Typography)({
  marginLeft: 'auto',
  marginRight: '20px',
  fontSize: '12px',
  color: '#5f6368',
});

const Email = ({
  email,
  selectedEmails,
  setRefreshScreen,
  setSelectedEmails,
}) => {
  const navigate = useNavigate();

  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

  const toggleStarredMails = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };
  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
    }
  };
  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => onValueChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: '#fff200' }}
          onClick={() => toggleStarredMails()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredMails()}
        />
      )}

      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography style={{ width: '200px', overFlow: 'hidden' }}>
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject} {email.body && '-'} {email.body}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}
          {new window.Date(email.date).toLocaleString('default', {
            month: 'long',
          })}
        </Date>
      </Box>
    </Wrapper>
  );
};

export default Email;
