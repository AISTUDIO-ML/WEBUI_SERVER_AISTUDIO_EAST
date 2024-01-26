// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'

const UserView = ({ tab, id, invoiceData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UserViewPage tab={tab} user_id={id} invoiceData={invoiceData} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account', id: "65b33c181368f1a3d4011205" } },
      { params: { tab: 'security', id: "65b33c181368f1a3d4011205" } },
      { params: { tab: 'billing-plan', id: "65b33c181368f1a3d4011205" } },
      { params: { tab: 'notification', id: "65b33c181368f1a3d4011205" } },
      { params: { tab: 'connection', id: "65b33c181368f1a3d4011205" } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData: InvoiceType[] = res.data.allData

  return {
    props: {
      invoiceData,
      user_id: params?.id,
      tab: params?.tab
    }
  }
}

export default UserView
