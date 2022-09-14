import React from 'react'
import cn from 'classnames'
import './Button.scss'

const Button = ({ onClick, type, className, text, iconRight }) => {
    return (
        <button onClick={onClick} onKeyDown={onClick} type={type} className={cn('btn', className)} role="">
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
    type: 'submit',
    text: 'Submit',
};

export default Button