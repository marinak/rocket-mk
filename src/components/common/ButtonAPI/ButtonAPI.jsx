import React, { useEffect, useState, useRef } from 'react'
import useApi from '../../../hooks/useApi'
import { Button, Tooltip } from '../.'
import Status from '../../../constants/Status'
import { ReactComponent as Loader } from '../../../assets/common/loader.svg'
import './ButtonAPI.scss'

const ButtonAPI = ({ apiUrl, maxDuration, buttonText, tooltipText }) => {
    const [tooltip, setTooltip] = useState(false);
    const [status, setStatus] = useState(Status.Default);
    const [nextStatus, setNextStatus] = useState(Status.Default);
    const timeoutRef = useRef()

    const onHoverChange = (isOn) => {
        setTooltip(isOn);
    };

    const getLaunchApi = useApi(apiUrl);

    useEffect(() => {
        !getLaunchApi.loading && clearTimeout(timeoutRef.current);

        const status = (getLaunchApi.loading || nextStatus === Status.Error)
            ? nextStatus
            : Status.Default

        setStatus(status);
    }, [nextStatus, getLaunchApi]);


    //TODO handle API error (not timeout)

    const onClick = () => {
        clearTimeout(timeoutRef.current);
        switch (status) {
            case Status.Default:
                getLaunchApi.request();
                setNextStatus(Status.Active)
                timeoutRef.current = setTimeout(() => {
                    getLaunchApi.controller.abort();
                    setNextStatus(Status.Error)
                }, maxDuration * 1000)
                break;
            case Status.Active:
                getLaunchApi.controller.abort();
                setNextStatus(Status.Default);
                break;
        }
    };

    const getButtonText = () => {
        switch (status) {
            case Status.Active:
                return buttonText.active
            case Status.Error:
                return buttonText.error;
            default:
                return buttonText.default;
        }
    }

    const getTooltipText = () => {
        switch (status) {
            case Status.Active:
                return tooltipText.active;
            case Status.Error:
                return tooltipText.error;
            default:
                return tooltipText.default;
        }
    }

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
            <p style={{ 'marginBottom': '20px' }}>{status} - {apiUrl}</p>
            <div className='btn-container'>
                <div onMouseEnter={() => status !== Status.Disabled && onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
                    <Button
                        className={`min-w-11 ${getButtonClass()}`}
                        onClick={onClick}
                        text={getButtonText()}
                        iconRight={status == Status.Active && <Loader />} />
                </div>
                {(tooltip || status == Status.Error) && (
                    <Tooltip
                        className={getTooltipClass()}
                        text={getTooltipText()} />
                )}
            </div>
        </>
    )
}

export default ButtonAPI