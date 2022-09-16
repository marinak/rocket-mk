import React from 'react'
import cn from 'classnames'
import './Button.scss'

const Button = ({ onClick, type, className, text, iconRight }) => {
    return (
        <button onClick={onClick} onKeyDown={onClick} type={type} className={cn('btn transition-colours', className)}>
            <span className='grid grid--double'>
                <span>
                    {text}
                </span>
                <span className='leading-none'>
                    {iconRight}
                </span>
            </span>
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    text: 'Submit',
};

export default Button