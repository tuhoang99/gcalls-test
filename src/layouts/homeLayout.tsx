import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconChevronsRight } from '@tabler/icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { formSchema } from '../utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf } from 'zod';
import { store } from '../store/store';
import { Link } from 'react-router-dom';

const HomeLayout: React.FC = () => {

  type FormInput = TypeOf<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  const [name, setName] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [via, setVia] = useState<string>('data');

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (name !== '') {
      localStorage.setItem('name', JSON.stringify(name))
    }
  }, [isSubmitSuccessful, name]);

  const handleVia = (event: SelectChangeEvent) => {
    setVia(event.target.value);
  };

  const handleChange = (newName: any) => {
    setName(newName.target.value);
    setDisabled(false);
  };

  const handleReset = () => {
    setName('');
    setDisabled(true)
  };

  const handleDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    store.dispatch({ type: 'data', payload: data });
    setOpen(false);
  };

  return (
    <section className="home-layout">
      <div className="container">
        <div className="card">
          <div className="content">
            <h3>Welcome to Gcalls Test</h3>
            <div className="item">
              <TextField
                className="item-input"
                id="yourName-required"
                label="Your Name"
                onChange={handleChange}
                value={name}
                variant="standard"
              />
              <div className="btn-group">
                <Button
                  className="btn-setting"
                  color="warning"
                  variant="contained"
                  onClick={() => handleDialog()}>
                  Setting
                </Button>
                <Button
                  className="btn-reset"
                  variant="contained"
                  onClick={() => handleReset()}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={disabled ? "btn-next-disabled" : "btn-next"}>
          <Button disabled={disabled}>
            <Link to="call">
              <IconChevronsRight width="55" height="55" color={disabled ? "gray" : "white"} />
            </Link>
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>JsSIP UA Settings</DialogTitle>
        <DialogContent>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '450px', height: '550px', maxWidth: '450px' }}
          >
            <Grid container spacing={1}>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="sip_uri"
                  autoComplete='none'
                  label="SIP URI"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!errors['sip_uri']}
                  helperText={Boolean(errors['sip_uri']) ? `${errors['sip_uri']?.message}` : ''}
                  {...register('sip_uri')}
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="sip-password"
                  label="SIP password"
                  type="password"
                  fullWidth
                  variant="standard"
                  error={!!errors['sip_password']}
                  helperText={Boolean(errors['sip_password']) ? `${errors['sip_password']?.message}` : ''}
                  {...register('sip_password')}
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="web-socket-uri"
                  label="WebSocket URI"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!errors['web_socket_uri']}
                  helperText={Boolean(errors['web_socket_uri']) ? `${errors['web_socket_uri']?.message}` : ''}
                  {...register('web_socket_uri')}
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="simple-select-standard-label">Age</InputLabel>
                  <Select
                    labelId="simple-select-standard-label"
                    id="simple-select-standard"
                    value={via}
                    onChange={handleVia}
                    label="Age"
                  >
                    <MenuItem value="data">
                      data
                    </MenuItem>
                    <MenuItem value="TCP">TCP</MenuItem>
                    <MenuItem value="TLS">TLS</MenuItem>
                    <MenuItem value="WS">WS</MenuItem>
                    <MenuItem value="WSS">WSS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="registrar-server"
                  label="Registrar server"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="contact-uri"
                  label="Contact URI"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="authorization-user"
                  label="Authorization user"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <TextField
                  margin="dense"
                  id="instance-id"
                  label="Instance ID"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={1} md={12}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Session Timers</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      value="session-timers"
                      control={<Switch color="primary" />}
                      label="Enable Session Timers as per RFC 4028"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={1} md={12}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Preloaded Route</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      value="preloaded-route"
                      control={<Switch color="primary" />}
                      label="Add a Route header with the server URI"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='inherit'
            type='button'
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
            onClick={handleSubmit(onSubmit)}
            color='success'
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default HomeLayout;