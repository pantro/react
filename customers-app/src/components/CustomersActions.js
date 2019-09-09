import React from 'react';
import PropTypes from 'prop-types';

const CustomersActions = ({ children }) => {
    return (
        <div>
            <div className="customers-actions">
                <div>{children}</div>
            </div>
        </div>
    );
};

CustomersActions.propTypes = {
    children: PropTypes.node.isRequired,//Node: Cualquier tipo react que se pueda renderizar
};

export default CustomersActions;