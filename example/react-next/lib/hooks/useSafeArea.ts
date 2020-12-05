import { useEffect, useState, } from 'react'
import { dataModule } from 'mincu'

export const useSafeArea = () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useEffect(() => {
    setInset(dataModule.inset)
  }, [])

  return inset
}