import preloader from "../../../assets/images/preloader.svg";
import React from "react";
import {Spin} from "antd";

export const Preloader = () => {
    return <Spin tip="Loading" size="large" style={{margin: " 25% 50%"}}>
    </Spin>
}