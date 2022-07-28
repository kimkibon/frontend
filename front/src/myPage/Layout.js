import React from 'react';
import { Layout } from 'antd';

import Sidebar from '../commons/Sidebar';
import Header from '../commons/Header';
import Footer from '../commons/Footer';

const Layout = () => {
    
    
    return(
        <div>
            <Layout>
                <Sidebar/>
            </Layout>

            <Header/>
            <Footer/>


        </div>

    );
};

export default Layout;