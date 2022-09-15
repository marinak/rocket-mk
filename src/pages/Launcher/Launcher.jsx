import React from 'react'
import { ButtonAPI } from '../../components/common'
import { getRandomNum } from '../../helpers/numbers'
//import Status from '../../constants/Status'

const launcherApiUrl = `https://httpbin.org/delay/${getRandomNum(10)}`;

const launcherButtonText = {
    default: 'Launch Rocket',
    active: 'Launching',
    error: 'Launch Rocket'
}

const launcherTooltipText = {
    default: 'Ignites the fuel',
    active: 'Cancel launch',
    error: 'Ignition error'
}

const Launcher = () => {
    return (
        <div className='text-center'>
            <div className='launcher-pad'>
                <ButtonAPI
                    buttonText={launcherButtonText}
                    tooltipText={launcherTooltipText}
                    apiUrl={launcherApiUrl}
                    maxDuration={5}
                //defaultStatus={Status.Error}
                />
            </div>
        </div>
    )
}

export default Launcher