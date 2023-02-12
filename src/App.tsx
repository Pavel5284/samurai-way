import React, {useEffect, useState} from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom"
import {initializeApp} from "./redux/appReducer";
import {useAppDispatch, useAppSelector} from "./redux/redux-store";
import {UsersPage} from './components/Users/UsersPage';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {HeaderPage} from './components/Header/HeaderPage';
import {Breadcrumb, Layout, Menu, MenuProps, Spin, theme} from 'antd';
import {LoginPage} from './components/Login/LoginPage';
import {DesktopOutlined, PieChartOutlined, UserOutlined, WechatOutlined} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';


const {Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const {token: {colorBgContainer},} = theme.useToken();

    const initialized = useAppSelector(state => state.app.initialized)
    const myId = useAppSelector(state => state.auth.userId)
    const [collapsed, setCollapsed] = useState(false);

    const items: MenuItem[] = [
        getItem(<NavLink to={`/profile/${myId}`}>Profile</NavLink>, 'profile',
            <PieChartOutlined/>),
        getItem(<NavLink to="/dialogs">Message</NavLink>, 'dialogs', <DesktopOutlined/>),
        getItem(<NavLink to="/users">Users</NavLink>, 'users', <UserOutlined/>),
        getItem(<NavLink to="/chat">Chat</NavLink>, 'chat', <WechatOutlined/>),

    ];


    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Spin tip="Loading" size="large" style={{margin: " 25% 50%"}}>
        </Spin>
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark"
                      selectable={false}
                      mode="inline"
                      items={items}
                />

            </Sider>
            <Layout style={{background: "none"}}>
                <HeaderPage/>
                <Content style={{margin: '0 16px'}}>

                    <Breadcrumb style={{margin: '16px 0'}}>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        <Routes>
                            <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/users" element={<UsersPage pageTitle={'Samurais'}/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path='*' element={() => <div>404 NOT FOUND</div>}/>
                        </Routes>
                    </div>
                </Content>


                <Footer style={{textAlign: 'center'}}>© by Pavel Cherniakov</Footer>
            </Layout>

        </Layout>


    );
}


