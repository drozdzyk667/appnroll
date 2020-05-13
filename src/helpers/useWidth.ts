import React from "react"
export const useWindowProperties = () => {
  const globalAny: any = global
  const appWindow =
    typeof window === "undefined" ? globalAny.window : window.innerWidth
  const [width, setWidth] = React.useState<number>(appWindow)

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return { width }
}

export default useWindowProperties
