import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const RutasPrivadas = ({ component: Component, ...props }) => {
    const authsContext = useContext(authContext);
    const { autenticado } = authsContext;

    return (
        <Route
            { ...props } render = { props => !autenticado ? (
                <Redirect to="/"/>
            ) : (
                <Component {...props} />
            )}
        />
    );
}

export default RutasPrivadas;