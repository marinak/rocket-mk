import React from 'react'
import cn from 'classnames'
import './Tooltip.scss'

const Tooltip = ({ text, className }) => {
    return (
        <div className={cn('tooltip', className)}>{text}</div>
    )
}

export default Tooltip