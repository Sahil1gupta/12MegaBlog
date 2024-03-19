/* eslint-disable react/prop-types */
import React from 'react';

function Button({
     children,  //dont confused with children isko we can say text which we see on button
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}) {
    return (
        <button className={` px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props} type={type}>
            {/* Click me */}
            {children}
        </button>
    );
}

export default Button;