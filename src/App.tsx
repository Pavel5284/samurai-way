import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom"
import {initializeApp} from "./redux/appReducer";
import {useAppDispatch, useAppSelector} from "./redux/redux-store";
import {UsersPage} from './components/Users/UsersPage';
import {HeaderPage} from './components/Header/HeaderPage';
import {Breadcrumb, Layout, Menu, MenuProps, Spin, theme} from 'antd';
import {LoginPage} from './components/Login/LoginPage';
import {DesktopOutlined, PieChartOutlined, UserOutlined, WechatOutlined} from '@ant-design/icons';
import { withSuspense } from './hoc/withSuspense';
import {Preloader} from "../src/components/common/Preloader/Preloader";





const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedChat = withSuspense(ChatPage)


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
                        <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/' element={<ProfileContainer/>}/>
                            <Route path="/profile/:userId?" element={<SuspendedProfile/>}/>
                            <Route path="/dialogs" element={<SuspendedDialogs/>}/>
                            <Route path="/chat" element={<SuspendedChat/>}/>
                            <Route path="/users" element={<UsersPage pageTitle={'Samurais'}/>}/>

                            <Route path="/login" element={<LoginPage/>}/>

                            <Route path='*' element={() => <div>404 NOT FOUND</div>}/>
                        </Routes>
                        </Suspense>
                    </div>
                </Content>


                <Footer style={{textAlign: 'center'}}>© by Pavel Cherniakov</Footer>
            </Layout>

        </Layout>


    );
}


