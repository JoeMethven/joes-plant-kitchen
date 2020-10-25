import React from 'react';
import Error from '@components/Error';
import Layout from '@components/Layout';

const Error404 = () => (
   <Layout>
       <Error title="404" text="It looks like nothing was found, sorry about that." />
   </Layout>
);

export default Error404;
