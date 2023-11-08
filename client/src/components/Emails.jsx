import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';
import { Checkbox, Box, List } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email';
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constants';
const Emails = () => {
  const [refreshScreen, setRefreshScreen] = useState(false);
  const { openDrawer } = useOutletContext();
  const { type } = useParams();
  const [selectedEmails, setSelectedEmails] = useState([]);

  const getEmailService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailService = useApi(API_URLS.deleteEmail);

  useEffect(() => {
    getEmailService.call({}, type);

  }, [type, refreshScreen]);

  const selectAllEmails = (event) => {
    if (event.target.checked) {
      const emails = getEmailService?.response?.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = (event) => {
    if (type === 'bin') {
      deleteEmailService.call(selectedEmails);
    } else {
      moveEmailsToBinService.call(selectedEmails);
    }
    setRefreshScreen((prevState) => !prevState);
  };

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: 'calc(100%-250px)' }
          : { width: '100%' }
      }
    >
      <Box
        style={{
          padding: '20px 10px 0 10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Checkbox size="small" onChange={(event) => selectAllEmails(event)} />
        <DeleteOutline onClick={(event) => deleteSelectedEmails(event)} />
      </Box>
      <List>
        {getEmailService?.response?.map((email, index) => {
          return (
            <Email
              key={index}
              email={email}
              selectedEmails={selectedEmails}
              setRefreshScreen={setRefreshScreen}
              setSelectedEmails={setSelectedEmails}
            />
          );
        })}
      </List>
      {getEmailService?.response?.length === 0 && (
        <NoMails message={EMPTY_TABS[type]} />
      )}
    </Box>
  );
};

export default Emails;
