// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  tab: string,
  user_id?: string,
  invoiceData: InvoiceType[]
}

const UserView = ({ invoiceData }: Props) => {
  const router = useRouter()
  const { tab, id } = router.query
  const users = useSelector((state: any) => state.user.data)
  const get_cur_user = (id: any) => {

    return users.filter((user: any) => user._id === id)[0]
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft user={get_cur_user(id)} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserView
