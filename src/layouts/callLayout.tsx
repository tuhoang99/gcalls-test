import { Box, Button, Fade, Grid, IconButton, ListItemIcon, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { IconGridDots, IconLogout, IconMicrophone, IconPhone, IconPlus, IconUserCircle, IconVideoOff, IconVolume } from '@tabler/icons';
import { useEffect, useState } from 'react';
import JsSIP from "jssip";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CallLayout: React.FC = () => {

  const navigate = useNavigate();

  const [phone, setPhone] = useState<string>('');
  const [status, setStatus] = useState<string>('Chưa kết nối! Vui lòng kiểm tra lại!');
  const [color, setColor] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showCall, setShowCall] = useState<any>({ display: 'none' })

  const open = Boolean(anchorEl);
  var ua: any, configuration: any;

  const Call = (first: any, options: any) => `${first}`;
  const name = localStorage.getItem('name');

  const handleChange = (newPhone: any) => {
    setPhone(newPhone.target.value);
    setDisabled(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate('/');
  };

  const data = useSelector((state: any) => state.AppReducer.data)

  useEffect(() => {
    if (phone === '') {
      setDisabled(true);
    }
    if (status !== 'Chưa kết nối! Vui lòng kiểm tra lại!') {
      setColor(true)
    }
  }, [phone, status]);

  const jSsip = () => {
    configuration = {
      sockets: new JsSIP.WebSocketInterface(`${data?.web_socket_uri}`),
      uri: Call(data?.sip_uri, null),
      password: `${data?.sip_password}`,
      'session_timers': false,
    };

    ua = new JsSIP.UA(configuration);

    ua.start();

    ua.on('connected', () => {
      setStatus('Đã kết nối!');
      console.log('connected');
    });
    ua.on('disconnected', () => {
      console.log('disconnected')
    });
    ua.on('registered', () => {
      console.log('registered')
    });
    ua.on('unregistered', () => {
      console.log('unregistered')
    });
    ua.on('registrationFailed', () => {
      console.log('registrationFailed')
    });
    ua.on('newRTCSession', () => console.log('registrationFailed'));
    ua.on('newMessage', () => console.log('newMessage'));

    return ua;
  }

  useEffect(() => {
    if (data.sip_uri !== '' && data.sip_password !== '' && data.web_socket_uri !== '') {
      try {
        jSsip()
      } catch (error) {
        // console.log(error)
      }
    }
  }, [data.sip_uri, data.sip_password, data.web_socket_uri])

  const eventHandlers = {
    progress: function (e: any) {
      console.log("call is in progress: ", e);
    },
    failed: function (e: any) {
      console.log("call failed with cause: ", e);
    },
    ended: function (e: any) {
      console.log("call ended with cause: ", e);
    },
    confirmed: function (e: any) {
      console.log("call confirmed", e);
    }
  };

  const options = {
    eventHandlers: eventHandlers,
    mediaConstraints: { audio: true, video: false },
  };

  return (
    <section className="call-layout">
      <div className="container">
        <div className="card">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '10px' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography>{name?.slice(1, name?.length - 1)}</Typography>
              <Typography color={color ? "#2ed573" : "#ff4757"}>{status}</Typography>
            </Box>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={handleClose}>
                <ListItemIcon>
                  <IconLogout stroke={1.5} size="1.6rem" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '450px', height: '150px', padding: '20px' }}>
            <Grid container spacing={1} sx={{ alignItems: 'center' }} direction="column">
              <Grid item xs={1} md={8}>
                <TextField
                  margin="dense"
                  id="phoneNumber"
                  label="Enter phone number"
                  onChange={handleChange}
                  value={phone}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={1} md={4} sx={{ marginTop: '10px' }}>
                <Button
                  variant='contained'
                  color='success'
                  type='button'
                  disabled={disabled}
                  onClick={() => {
                    jSsip().call(Call(phone, options))
                    setTimeout(() => {
                      if (ua === undefined) {
                        alert('Call Fail')
                      } else {
                        setShowCall({ display: 'block' })
                      }
                    }, 500)
                  }}
                >
                  Call
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className='card-call-overplay' style={showCall}>
        <h3>{phone}</h3>
        <span>
          <div className='icon-phone'>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480.56 480.56">
              <path className="path1" d="M365.35 317.9c-15.7-15.5-35.3-15.5-50.9 0-11.9 11.8-23.8 23.6-35.5 35.6-3.2 3.3-5.9 4-9.8 1.8-7.7-4.2-15.9-7.6-23.3-12.2-34.5-21.7-63.4-49.6-89-81-12.7-15.6-24-32.3-31.9-51.1-1.6-3.8-1.3-6.3 1.8-9.4 11.9-11.5 23.5-23.3 35.2-35.1 16.3-16.4 16.3-35.6-.1-52.1-9.3-9.4-18.6-18.6-27.9-28-9.6-9.6-19.1-19.3-28.8-28.8-15.7-15.3-35.3-15.3-50.9.1-12 11.8-23.5 23.9-35.7 35.5-11.3 10.7-17 23.8-18.2 39.1-1.9 24.9 4.2 48.4 12.8 71.3 17.6 47.4 44.4 89.5 76.9 128.1 43.9 52.2 96.3 93.5 157.6 123.3 27.6 13.4 56.2 23.7 87.3 25.4 21.4 1.2 40-4.2 54.9-20.9 10.2-11.4 21.7-21.8 32.5-32.7 16-16.2 16.1-35.8.2-51.8-19-19.1-38.1-38.1-57.2-57.1z" />
              <path className="path2" d="M346.25 238.2l36.9-6.3c-5.8-33.9-21.8-64.6-46.1-89a164.03 164.03 0 0 0-94-46.9l-5.2 37.1c27.7 3.9 52.9 16.4 72.8 36.3 18.8 18.8 31.1 42.6 35.6 68.8z" />
              <path className="path3" d="M403.95 77.8c-42.6-42.6-96.5-69.5-156-77.8l-5.2 37.1c51.4 7.2 98 30.5 134.8 67.2 34.9 34.9 57.8 79 66.1 127.5l36.9-6.3c-9.7-56.2-36.2-107.2-76.6-147.7z" />
            </svg>
          </div>
          Calling . . .
        </span>
        <div className='row-icon'>
          <IconMicrophone className='icon' stroke={1.5} size="1.6rem" />
          <IconGridDots className='icon' stroke={1.5} size="1.6rem" />
          <IconVolume className='icon' stroke={1.5} size="1.6rem" />
        </div>
        <div className='row-icon'>
          <IconPlus className='icon' stroke={1.5} size="1.6rem" />
          <IconVideoOff className='icon' stroke={1.5} size="1.6rem" />
          <IconUserCircle className='icon' stroke={1.5} size="1.6rem" />
        </div>
        <div className='hangUp'><IconPhone className='hangUp-icon' stroke={1.5} size="1.6rem"
          onClick={() => {
            ua?.stop();
            setShowCall({ display: 'none' });
          }} />
        </div>
      </div>
    </section>
  );
}

export default CallLayout;