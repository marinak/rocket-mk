import React from 'react';

import Button from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        variant: {
            text: '',
        },
    },
};

const Story = (args) => <Button {...args} />;

export const Default = Story.bind({});
Default.args = {
    text: 'Button'
};

export const Disabled = Story.bind({});
Disabled.args = {
    text: 'Disabled',
    className: 'btn--disabled',
    disabled: true
};

export const Active = Story.bind({});
Active.args = {
    text: 'Active',
    className: 'btn--active'
};

export const Error = Story.bind({});
Error.args = {
    text: 'Error',
    className: 'btn--error'
};
