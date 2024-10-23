import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function App() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className='h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" onClick={() => window.location.href = '/customer'}>
                        Customer
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => window.location.href = '/employee'}>
                        Employee
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => window.location.href = '/vendor'}>
                        Vendor
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => window.location.href = '/category'}>
                        Category
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => window.location.href = '/purchase'}>
                        Purchase
                    </Menu.Item>
                    <Menu.Item key="6" onClick={() => window.location.href = '/stock'}>
                        Stock
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;