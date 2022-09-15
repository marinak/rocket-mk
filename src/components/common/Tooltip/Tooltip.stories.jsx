import React from 'react';

import Tooltip from './Tooltip';

export default {
    title: 'Tooltip',
    component: Tooltip,
    argTypes: {
        variant: {
            text: '',
        },
    },
};

const Story = (args) => <Tooltip {...args} />;

export const Default = Story.bind({});
Default.args = {
    text: 'Tooltip info',
    className: 'inline-block'
};

export const Active = Story.bind({});
Active.args = {
    text: 'Active info',
    className: 'inline-block tooltip--active'
};

export const Error = Story.bind({});
Error.args = {
    text: 'Error info',
    className: 'inline-block tooltip--error'
};
