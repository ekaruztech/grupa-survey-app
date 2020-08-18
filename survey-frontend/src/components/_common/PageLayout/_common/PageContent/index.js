import { Layout } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';

const { Content } = Layout;

/**
 * Container for displaying content of page/routes
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PageContent = props => {
  const { menuCollapsed, children } = props;
  return (
    <motion.div
      /*Handles resize on collapse of side menu manually
        -. Due to the fixed nature of the sidebar.
        -. Position-Fixed content in usually taken out of the normal page flow, so the contents of another (unfixed) view underlaps it.
      */
      initial={{ width: `calc(100% - ${67}px)`, x: 67 }}
      animate={{
        width: `calc(100% - ${menuCollapsed ? 67 : 240}px)`,
        x: menuCollapsed ? 67 : 240,
      }}
      className={'sv-content-layout-wrapper'}
      transition={{ duration: 0.15 }}
    >
      <Layout className={'sv-content-layout'}>
        <Content className="site-layout-background sv-content">
          {children}
        </Content>
      </Layout>
    </motion.div>
  );
};
export default PageContent;
