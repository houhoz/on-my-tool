import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'umi';

const { Header, Content, Footer } = Layout;

export default withRouter((props: any) => {
  const { history, location } = props;
  const pathname = location.pathname;
  function handleClickMenu(menu: { key: string }) {
    history.push(menu.key);
  }
  return (
    <Layout className="layout" style={{ minHeight: '100%' }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="light"
          defaultSelectedKeys={[pathname]}
          mode="horizontal"
          onClick={handleClickMenu}
          items={[
            { key: '/', label: '健康提醒' },
            { key: '/about', label: '基金数据' },
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>{props.children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        onMyTool ©2022 Created by 候亚照
      </Footer>
    </Layout>
  );
});

// const App: React.FC = (props: any) => (

// );

// export default App;
