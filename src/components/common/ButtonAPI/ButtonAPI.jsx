import React, { useState } from 'react'
import { Button, Tooltip } from '../.'
import Status from '../../../constants/Status'
import { ReactComponent as Loader } from '../../../assets/common/loader.svg'
import './ButtonAPI.scss'

const ButtonAPI = () => {
    const [tooltip, setTooltip] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [status, setStatus] = useState(Status.Ready);

    const onHoverChange = (isOn) => {
        setTooltip(isOn);
    };

    const onClick = () => {
        setToggle(!toggle);
        setStatus(toggle ? Status.Ready : Status.Active); // this doesn't make sense, toggle has the wrong value at this point
    };

    const getButtonText = () => {
        switch (status) {
            case Status.Active:
                return 'Launching'; // make this dynamic
            default:
                return 'Launch Rocket'; // make this dynamic
        }
    }

    const getTooltipText = () => {
        switch (status) {
            case Status.Active:
                return 'Cancel launch'; // make this dynamic
            case Status.Error:
                return 'Ignotion error'; // make this dynamic
            default:
                return 'Ignites the fuel'; // make this dynamic
        }
    }

    const getButtonClass = () => {
        switch (status) {
            case Status.Active:
                return 'btn--active';
            case Status.Error:
                return 'btn--error';
            default:
                return null;
        }
    }

    const getTooltipClass = () => {
        switch (status) {
            case Status.Active:
                return 'tooltip--active';
            case Status.Error:
                return 'tooltip--error';
            default:
                return null;
        }
    }

    return (
        <div className='btn-container'>
            <p style={{ 'marginBottom': '10px' }}>{status}</p>
            <div onMouseEnter={() => onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
                <Button
                    className={`min-w-11 ${getButtonClass()}`}
                    onClick={onClick}
                    text={getButtonText()}
                    iconRight={status == Status.Active && <Loader />} />
            </div>
            {tooltip && (
                <Tooltip
                    className={getTooltipClass()}
                    text={getTooltipText()} />
            )}
        </div>
    )
}

export default ButtonAPI