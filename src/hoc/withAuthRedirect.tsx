import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateRootType} from "../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateRootType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAutRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        console.log(props)
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>;
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps, {})(RedirectComponent)


}
