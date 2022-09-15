import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi'
import { Button, Tooltip } from '../.'
import Status from '../../../constants/Status'
import { ReactComponent as Loader } from '../../../assets/common/loader.svg'
import './ButtonAPI.scss'

const ButtonAPI = ({ apiUrl, maxDuration, buttonText, tooltipText }) => {
    const [tooltip, setTooltip] = useState(false);
    const [status, setStatus] = useState(Status.Default);

    const onHoverChange = (isOn) => {
        setTooltip(isOn);
    };

    const getLaunchApi = useApi(apiUrl, maxDuration);

    useEffect(() => {
        const nextStatus = getLaunchApi.error && getLaunchApi.error !== 'canceled'
            ? Status.Error
            : getLaunchApi.loading
                ? Status.Active
                : Status.Default;

        setStatus(nextStatus);
    }, [getLaunchApi]);

    const onClick = () => {
        switch (status) {
            case Status.Default:
                getLaunchApi.request();
                break;
            case Status.Active:
                getLaunchApi.abort();
                break;
        }
    };

    //TODO turn to object
    const getButtonClass = () => {
        switch (status) {
            case Status.Disabled:
                return 'btn--disabled';
            case Status.Active:
                return 'btn--active';
            case Status.Error:
                return 'btn--error';
            default:
                return null;
        }
    }

    //TODO turn to object
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
        <>
            <div className='btn-container'>
                <div onMouseEnter={() => status !== Status.Disabled && onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
                    <Button
                        className={`min-w-11 ${getButtonClass()}`}
                        onClick={onClick}
                        text={buttonText[status]}
                        iconRight={status == Status.Active && <Loader />} />
                </div>
                {(tooltip || status == Status.Error) && (
                    <Tooltip
                        className={getTooltipClass()}
                        text={tooltipText[status]} />
                )}
            </div>
            <p data-info='testing only' style={{ 'position': 'absolute', 'bottom': 0 }}>{apiUrl}</p>
        </>
    )
}

export default ButtonAPI