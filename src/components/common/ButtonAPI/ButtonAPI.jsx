import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi'
import { Button, Tooltip } from '../.'
import Status from '../../../constants/Status'
import { ReactComponent as Loader } from '../../../assets/common/loader.svg'
import './ButtonAPI.scss'

const ButtonAPI = ({ apiUrl, maxDuration, buttonText, tooltipText, defaultStatus }) => {
    const [tooltip, setTooltip] = useState(false);
    const [status, setStatus] = useState(Status.Default);

    useEffect(() => {
        defaultStatus && setStatus(defaultStatus);
    });

    const onHoverChange = (isOn) => {
        setTooltip(isOn);
    };

    const getLaunchApi = useApi(apiUrl);

    // api error set status to error
    // api complete set status to default
    // api timeout cancel and return set to error //maxDuration

    /*     useEffect(() => {
            //debugger; WHY IS THIS RUNNING ON LOAD???
            if (getLaunchApi.loading) {
                setStatus(Status.Active);
            } else if (getLaunchApi.error) {
                setStatus(Status.Error);
            } else if (getLaunchApi.data) {
                setStatus(Status.Default);
            }
        }, [getLaunchApi]) */

    const onClick = () => {
        switch (status) {
            case Status.Default:
                //getLaunchApi.request();
                break;
            case Status.Active:
                //getLaunchApi.cancel();
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