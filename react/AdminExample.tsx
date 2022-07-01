/* eslint-disable prettier/prettier */
import React, { FC } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, InputButton } from 'vtex.styleguide'

// import UsersTable from './UsersTable'
import ProductsTable from './ProductsTable'
import './styles.global.css'

const AdminExample: FC = () => {
  /* const handleSubmit = (value: any) => {
  setLoading(true)
  setState(value)
  setLoading(false)
} */
  const [state, setState] = useState("1")
  const [loading, setLoading] = useState(false)

  const handleChangeState = (e: any) => {
    setState(e)
  }
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <form onSubmit={(e: any) => {
        e.preventDefault
        setLoading(true)
        handleChangeState(e.target.value)
        setLoading(false)
        console.log("getIn", state)
      }}>
        <PageBlock variation="full">
          <InputButton
            placeholder="Placeholder"
            size="regular"
            label="Regular loading"
            button="Submit"
            isLoading={loading}
          />
          {!loading && <ProductsTable params={state} />}
        </PageBlock>
      </form>
    </Layout >
  )
}

export default AdminExample
