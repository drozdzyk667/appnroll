import React from "react"
import { StatusProps } from "../helpers/Repos.constants"

const usePagination = (data: StatusProps[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }
  const jump = (_event: unknown, page: number) => {
    setCurrentPage(page)
  }
  return { jump, currentData, currentPage, maxPage }
}

export default usePagination
