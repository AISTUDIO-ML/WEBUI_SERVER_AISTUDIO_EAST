import React, { useEffect } from 'react'
import { Ref, useState, forwardRef, ReactElement } from 'react'
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useImmer } from 'use-immer'
import Title from 'src/views/elements/Title'
import { styled } from '@mui/material/styles'
import SearchBar from 'src/views/groups/SearchBar'
import { TabContext, TabPanel as MUITabPanel } from '@mui/lab'
import { Tab, Tabs } from '@mui/material'
import UsersScreen from 'src/views/users/UsersScreen'
import CustomAccountRoles from 'src/views/users/CustomAccountRoles'
import BreadcrumbsComponent from 'src/views/groups/BreadcrumbsComponent'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import Fade, { FadeProps } from '@mui/material/Fade'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { addUser, fetchData } from 'src/store/apps/user/index'

// import BreadcrumbsComponent from 'src/views/groups/BreadcrumbsComponent'

const TabPanel = styled(MUITabPanel)(({ }) => ({
  margin: 0,
  padding: 0,
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column'
}))

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const UserList = () => {
  const [show, setShow] = useState<boolean>(false)
  const [show_alert, setShowAlert] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({})
  const [languages, setLanguages] = useState<string[]>([])
  const [firstname, setFirstName] = useState<string>('')
  const [lastname, setLastName] = useState<string>('')
  const [username, setUserName] = useState<string>('')
  const [billing_email, setBillingEmail] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [tax_id, setTaxId] = useState<string>('')
  const [phone_number, setPhone] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [shipping_address, setShippingAddress] = useState<boolean>(false)
  const [q, setQuery] = useState<string>('')
  const [state, setState] = useImmer({
    page: 'USERS'
  })
  const error = useSelector((state: any) => state.user.error)
  const message = useSelector((state: any) => state.user.message)
  const dispatch: Dispatch<any> = useDispatch()

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  const submitUserInfo = async (event: any) => {
    event.preventDefault()
    const params = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      billing_email: billing_email,
      status: status,
      tax_id: tax_id,
      contact: phone_number,
      languages: languages,
      country: country,
      role: 'asdasd',
      shipping_address: shipping_address
    }
    dispatch(addUser(params))

    // fetch("/api/users", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     first_name: firstname,
    //     last_name: lastname,
    //     username: username,
    //     billing_email: billing_email,
    //     status: status,
    //     tax_id: tax_id,
    //     contact: phone_number,
    //     languages: languages,
    //     country: country,
    //     shipping_address: shipping_address
    //   })
    // }).then( async response => {
    //   const res_data = await response.json()
    //   if(response.status === 200) {
    //     setNotification({
    //       type: "success",
    //       message: "User is created successfully."
    //     })
    //     setShowAlert(true)
    //     setShow(false)
    //   } else {
    //     setNotification({
    //       type: "error",
    //       message: res_data.message
    //     })
    //     setShowAlert(true)
    //   }

    // }).catch(error => {
    //   setNotification({
    //     type: "error",
    //     message: "User creating is failed. "
    //   })
    //   setShowAlert(true)
    // })
  }
  const onChangeState = React.useCallback(
    (key: keyof typeof state, value: string) => {
      setState(draft => {
        draft[key] = value
      })
    },
    [setState]
  )
  const onCreateButton = () => {
    setShow(true)
  }
  useEffect(() => {
    if (error === 1) {
      setNotification({
        type: 'success',
        message: 'User is created successfully.'
      })
      setShowAlert(true)
      setShow(false)
    } else if (error === 2) {
      setNotification({
        type: 'error',
        message: message
      })
      setShowAlert(true)
    }
  }, [error, message])
  useEffect(() => {
    alert(q)
    const params = {
      q: q,
      role: '',
      status: '',
      currentPlan: ''
    }
    dispatch(fetchData(params))
  }, [dispatch, q])

  // USERS
  // CUSTOM ACCOUNT ROLES

  return (
    <React.Fragment>
      <BreadcrumbsComponent
        list={[
          { href: '/app', name: 'Home' },
          { href: '/app', name: 'Users' }
        ]}
      />
      <Grid spacing={8}>
        <Grid>
          <TabContext value={state.page}>
            <Box>
              <Tabs value={state.page} aria-label='Groups' onChange={(e, value) => onChangeState('page', value)}>
                <Tab label='USERS' value='USERS' />
                <Tab label='CUSTOM ACCOUNT ROLES' value='CUSTOM ACCOUNT ROLES' />
              </Tabs>
            </Box>
            <TabPanel value={'USERS'}>
              <Title heading='Users' openModal={onCreateButton} />
              <SearchBar setQuery={setQuery} />
              <UsersScreen query={q} />
            </TabPanel>
            <TabPanel value={'CUSTOM ACCOUNT ROLES'}>
              <Title
                heading='Custom Account Roles'
                paragraph='Create custom account roles with a custom set of permissions that can be assigned to users to allow fine-grained control over their actions in the Fortanix DSM account.'
              />

              <CustomAccountRoles />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <form onSubmit={submitUserInfo}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => setShow(false)}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Create New User
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Create a new user will receive a privacy audit.</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  fullWidth
                  label='First Name'
                  placeholder='John'
                  onChange={e => {
                    setFirstName(e.target.value)
                  }}
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  fullWidth
                  label='Last Name'
                  placeholder='Doe'
                  onChange={e => {
                    setLastName(e.target.value)
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label='Username'
                  placeholder='johnDoe'
                  onChange={e => setUserName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  fullWidth
                  label='Billing Email'
                  placeholder='johnDoe@email.com'
                  required
                  onChange={e => setBillingEmail(e.target.value)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  select
                  defaultValue='Status'
                  fullWidth
                  id='status-select'
                  label='Status'
                  onChange={e => setStatus(e.target.value)}
                  required
                >
                  <MenuItem value=''>Status</MenuItem>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                  <MenuItem value='Suspended'>Suspended</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  fullWidth
                  label='Tax ID'
                  placeholder='Tax-7490'
                  onChange={e => setTaxId(e.target.value)}
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  fullWidth
                  label='Contact'
                  placeholder='+ 123 456 7890'
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Language'
                  required
                  SelectProps={{
                    multiple: true,
                    value: languages,
                    onChange: e => handleChange(e as SelectChangeEvent<typeof languages>),
                    renderValue: selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )
                  }}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Hindi'>Hindi</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Country'
                  placeholder='UK'
                  id='country-select'
                  defaultValue=''
                  required
                  onChange={e => setCountry(e.target.value)}
                >
                  <MenuItem value=''>Select Country</MenuItem>
                  <MenuItem value='France'>France</MenuItem>
                  <MenuItem value='Russia'>Russia</MenuItem>
                  <MenuItem value='China'>China</MenuItem>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='US'>US</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={e => {
                        if (e.target.value === 'on') setShippingAddress(true)
                        else setShippingAddress(false)
                      }}
                    />
                  }
                  label='Make this default shipping address'
                  sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='contained' sx={{ mr: 1 }} type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar open={show_alert} autoHideDuration={2500} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={notification.type} variant='filled' sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default UserList
