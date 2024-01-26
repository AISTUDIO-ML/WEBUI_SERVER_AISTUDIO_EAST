// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string,
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await axios.post('/api/users/list', {
    params
  })

  return response.data
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string | string[] | boolean }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/api/users/add-user', {
      ...data
    })
  
    dispatch(fetchData(getState().user.params))
  
    return response.data
  }
)

// ** Edit User
export const editUser = createAsyncThunk(
  'appUsers/editUser',
  async (data: { [key: string]: number | string | string[] | boolean }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/api/users/edit-user', {
      ...data
    })
  
    dispatch(fetchData(getState().user.params))
  
    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(`/api/users/delete/${id}`)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    error: 0,
    message: ""
  
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      if(!action.payload.status){
        state.error = 2;
        state.message = action.payload.message
      } else {
        state.error = 1;
        state.message = ""
      }
    })
  }
})


export default appUsersSlice.reducer
