import React from "react"

interface Error {
  [key: string]: string
}

const useFetch = (url: string) => {
  const [response, setResponse] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error>()

  const getRepoData = React.useCallback(async () => {
    setIsLoading(true)
    await fetch(url)
      .then((res) => {
        return res.ok ? res.json() : null
      })
      .then((data) => {
        setResponse(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  React.useEffect(() => {
    getRepoData()
  }, [getRepoData])

  return { isLoading, error, response }
}

export default useFetch
