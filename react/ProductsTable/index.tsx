/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import {
  EXPERIMENTAL_Table as Table /* ,
  Input,
  Button,
  Tag, */
} from 'vtex.styleguide'
import useTableMeasures from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import React, { FC, useEffect, useState } from 'react';
import { withRuntimeContext } from 'vtex.render-runtime';
import { useLazyQuery } from "react-apollo";

import productSearch from '../graphql/queries/productSearch.gql';

interface Props {
  params: any
}

const ProductsTable: FC<Props> = ({ params }) => {
  const [productSearchQuery, { data: dataProducts, loading: loadingProducts, error: errorProducts }] = useLazyQuery(productSearch)
  const [state, setState] = useState([{ id: '0', nombre: 'Product0', fabricacion: 'Industrial' }])

  useEffect(() => {
    productSearchQuery({ variables: { category: params } })
  }, [])

  useEffect(() => {
    if (dataProducts) {
      const productsInCategory = dataProducts.productSearch.products
      console.log("productosAhora sí", productsInCategory)
      setState(productsInCategory.map((item: any) => {
        const allSpecifications = item.specificationGroups.find((data: any) => data.name === 'allSpecifications')
        const typeFabricacion = allSpecifications.specifications.find((data: any) => data.name === 'Tipo de Fabricación')
        let fabricacion = ''
        if (typeof typeFabricacion !== 'undefined') {
          fabricacion = typeFabricacion.values[0]
        }
        return { id: item.productId, nombre: item.productName, fabricacion }
      }))
    }
    if (loadingProducts) {
      console.log("loadingProducts", loadingProducts)
    }
    if (errorProducts) {
      console.log("errorProducts", errorProducts)
    }
  }, [dataProducts, loadingProducts, errorProducts])

  const columns = [
    {
      id: 'id',
      title: 'ID'
    }, {
      id: 'nombre',
      title: 'Nombre'
    },
    {
      id: 'fabricacion',
      title: 'Tipo de fabricación'
    },
    {
      id: 'action',
      title: 'Action'
    }
  ]

  const measures = useTableMeasures({ size: 10 })
  return (
    <Table
      measures={measures}
      items={state}
      columns={columns}
      highlightOnHover
    />
  )
}

export default withRuntimeContext(ProductsTable)
