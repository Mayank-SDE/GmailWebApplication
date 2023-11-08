// Whenever we send mail it gets send on smtp simple mail transfer protocol
//we will use it for sending the mails

import { Close, DeleteOutline } from '@mui/icons-material';
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import useApi from '../hooks/useApi';

import { API_URLS } from '../services/api.urls';
const dialogStyle = {
  height: '90%',
  width: '80%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 15px',
  background: '#f2f6fc',
  '& > p': {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 15px',
  '&>div': {
    fontSize: 14,
    borderBottom: '1px solid #f5f5f5',
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 15px',
  alignItems: 'center',
});

const SendButton = styled(Button)({
  background: '#0b57d0',
  color: '#ffffff',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 18,
  width: 100,
});
const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const config = {
    Host: 'smtp.elasticemail.com',
    Username: 'mayankchoudhary@yopmail.com',
    Password: '2F5B2CC559852C4ED05B0E433FA0A3CC6494',
    Port: 2525,
  };
  const closeComposeMail = (event) => {
    event.preventDefault();
    const payload = {
      to: data.to,
      from: 'mayankchoudhary6055@gmail.com',
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: 'Mayank choudhary',
      starred: false,
      type: 'drafts',
    };
    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }
    setOpenDialog(false);
  };
  const sendMail = (event) => {
    event.preventDefault();
    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: 'mayankchoudhary6055@gmail.com',
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }
    const payload = {
      to: data.to,
      from: 'mayankchoudhary6055@gmail.com',
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: 'Mayank choudhary',
      starred: false,
      type: 'sent',
    };
    sentEmailService.call(payload);

    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }
    setOpenDialog(false);
  };

  const onValueChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(event) => closeComposeMail(event)} />
      </Header>
      <RecipientsWrapper>
        <InputBase
          placeholder="Recipients"
          onChange={(event) => onValueChange(event)}
          name="to"
        />
        <InputBase
          name="subject"
          placeholder="Subject"
          onChange={(event) => onValueChange(event)}
        />
      </RecipientsWrapper>

      <TextField
        name="body"
        onChange={(event) => onValueChange(event)}
        multiline
        rows={20}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />

      <Footer>
        <SendButton onClick={(event) => sendMail(event)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
