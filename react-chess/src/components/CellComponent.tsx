import { FC } from "react"
import { Cell } from "../models/Cell"

interface CellProps {
    cell: Cell
}

const CellComponent: FC<CellProps> = ({cell}) => {
  return (
    <div className={['cell', cell.color].join(" ")}>
        {cell.figure && cell.figure.logo &&
            <img src={cell.figure.logo}/>
        }
    </div>
  )
}

export default CellComponent