/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import { Tab, Tabs, Button } from '@mui/material'
import React from 'react'
import { rows } from 'src/@fake-db/table/static-data'
import CustomChip from 'src/@core/components/mui/chip'
import { fetchData } from 'src/store/apps/user'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const mapUsersData = (users: []) => {
  return users.map((user: any) => {
    return {
      id: user._id,
      avatar: '8.png',
      full_name: user.username,
      post: 'Nuclear Power Engineer',
      email: user.billing_email,
      city: user.country,
      start_date: user.start_date,
      salary: 12312312,
      age: '63',
      experience: '1 Year',
      status: user.status
    }
  })
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'NAME',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.full_name}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => {
      const status = statusObj[params.row.status]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'

          // color={status.color}
          // label={status.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 110,
    field: 'groups',
    headerName: 'GROUPS',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        Groups
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 180,
    field: 'security-objects',
    headerName: 'SECURITY OBJECTS',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        0
      </Typography>
    )
  },
  {
    flex: 0.175,
    type: 'date',
    minWidth: 120,
    headerName: 'CREATED',
    field: 'start_date',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    flex: 0.175,
    type: 'date',
    minWidth: 120,
    headerName: 'LAST LOGIN',
    field: 'last-login',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    field: 'Description',
    minWidth: 150,
    headerName: 'DESCRIPTION',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        Description
      </Typography>
    )
  }
]

const UsersScreen = (props: any) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const users = useSelector((state: any) => {
    console.log(state)

    return state.user.data
  })

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              py: 4,
              px: 6,
              rowGap: 2,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:trash' />}>
                Delete Selected
              </Button>
              <Button color='secondary' variant='text'>
                Disable
              </Button>
              <Button color='secondary' variant='text'>
                Enable
              </Button>
            </Box>
            <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant='contained' sx={{ '& svg': { mr: 2 } }}>
                <Icon fontSize='1.125rem' icon='tabler:download' />
                Download as CSV
              </Button>
            </Box>
          </Box>
          <Card>
            <DataGrid
              autoHeight
              rows={mapUsersData(users)}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[7, 10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default UsersScreen
