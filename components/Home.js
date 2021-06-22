import React from 'react';
//import './Home.css';
import Logs from './Logs';
// import MainTable from './MainTable';
import Dashboard from './Dashboard';
import Devices from './Devices';
import Grid from './Grid'
import Hello from './Hello'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {

    const [currentPage, setCurrentPage] = React.useState(null);
    const [currString, setCurrString] = React.useState(false);

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
        if (page === <Grid />) {
            setCurrString(true)
        }
    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider>
            <h1 style ={{fontSize: 30,color:'white',fontFamily: 'monospace'}}>SPOTFIRE</h1>
            <div className="logo" />
            < Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
           
               <Menu.Item onClick={() => {
                    handleCurrentPage(<Dashboard />)
                }} key="1" icon={<PieChartOutlined />}>
                    Dashboard
            </Menu.Item>
                <Menu.Item onClick={() => {
                    handleCurrentPage(<Grid />)
                }} key="2" icon={<DesktopOutlined />}>
                    Site
            </Menu.Item>
                <Menu.Item onClick={() => {
                    handleCurrentPage(<Logs />)
                }} key="3" icon={<FileOutlined />}>
                    Logs
            </Menu.Item>
                <Menu.Item key="4" icon={<FileOutlined />}>
                    Upgrade
            </Menu.Item>
                <Menu.Item key="5" icon={<FileOutlined />}>
                    Alert
            </Menu.Item>
                <Menu.Item onClick={() => {
                    handleCurrentPage(<Devices />)
                }} key="6" icon={<FileOutlined />}>
                    Devices
            </Menu.Item>
                <Menu.Item key="7" icon={<FileOutlined />}>
                    Service Alert
            </Menu.Item>
                <Menu.Item key="8" icon={<FileOutlined />}>
                    Switch Mode
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {currentPage && currentPage.type.name === 'MainTable' ? <div style={{ marginRight: '100px' }}> {currentPage}</div> : currentPage}
                </div>
            </Content>
        </Layout>
    </Layout>

    {/* <div className="column-left">
        <input type="button" onClick={() =>{ 
            handleCurrentPage(<Dashboard/>)
        }}
        name="button1" value="DashBoard" />
        <br /><br /><br />
        <input type="button" onClick={() => {
           handleCurrentPage(<MainTable/>)
        }} name="button2" value="Site" />
        <br /><br /><br />
        <input type="button" onClick={() => {
           handleCurrentPage(<Logs/>)
        }} name = "button3" value = "Logs" />
        <br /><br /><br />
        <input type="button" name="button4" value="Upgrades" />
        <br /><br /><br />
        <input type="button" name="button5" value="Alerts" />
        <br /><br /><br />
        <input type="button"  onClick={() => {
           handleCurrentPage(<Devices/>)
        }}
        name="button6" value="Devices" />
        <br /><br /><br />
        <input type="button" name="button7" value="Service Alerts" />
        <br /><br /><br />
        <input type="button" name="button8" value="Switch Mode" />
        <br />
        <br />

    </div>
{console.log(currentPage  ? currentPage.type.name : null)}

    {currentPage && currentPage.type.name === 'MainTable' ? <div style={{ marginRight: '100px' }} className="column-right"> {currentPage}</div> : <div style={{ border: `1px solid black`, height: '70vh', width: '60vw' }} class="column-right"  src="./default">
        {currentPage}
    </div>}    
  
     */}


}
export default Home;