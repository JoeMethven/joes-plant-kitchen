import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import Axios from 'axios';
import { createRemoteFileNode } from 'gatsby-source-filesystem';

import storeTypes from './types/store';
import accountCustomFieldTypes from './types/accountCustomField';
import websiteTypes from './types/website';
import formTypes from './types/form';

const { website_id: websiteId, x_api_key: apiKey, paths } = yaml.safeLoad(
    fs.readFileSync('./merlin.config.yml', 'utf8')
);

export const onCreateNode = async ({
    node,
    actions: { createNode },
    store,
    cache,
    createNodeId,
}) => {
    if (node.internal.type === 'merlinStoreProduct') {
        if (!!node.images && !!node.images.length) {
            for (let image of node.images) {
                const fileNode = await createRemoteFileNode({
                    url: image.url, // string that points to the URL of the image
                    parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
                    createNode, // helper function in gatsby-node to generate the node
                    createNodeId, // helper function in gatsby-node to generate the node id
                    cache, // Gatsby's cache
                    store, // Gatsby's redux store
                });

                // if the file was created, attach the new node to the parent node
                if (fileNode) {
                    image.url___NODE = fileNode.id;
                }
            }
        }
    }
};

export const createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes, createFieldExtension } = actions;

    createFieldExtension({
        name: 'fileByMerlinPath',
        extend: () => ({
            resolve: (src, args, context, info) => {
                const partialPath = src[info.fieldName];

                if (!partialPath) {
                    return null;
                }

                if (Array.isArray(partialPath)) {
                    return partialPath.map(partialPath => {
                        const filePath = path.resolve(__dirname, paths.media, partialPath);
                        const fileNode = context.nodeModel.runQuery({
                            firstOnly: true,
                            type: 'File',
                            query: {
                                filter: {
                                    absolutePath: {
                                        eq: filePath,
                                    },
                                },
                            },
                        });

                        if (!fileNode) {
                            return null;
                        }

                        return fileNode;
                    });
                }

                const filePath = path.resolve(__dirname, paths.media, partialPath);
                const fileNode = context.nodeModel.runQuery({
                    firstOnly: true,
                    type: 'File',
                    query: {
                        filter: {
                            absolutePath: {
                                eq: filePath,
                            },
                        },
                    },
                });

                if (!fileNode) {
                    return null;
                }

                return fileNode;
            },
        }),
    });

    const typeDefs = [
        //     `type MarkdownRemark implements Node {
        //         frontmatter: Frontmatter
        //     }
        //
        //     type Frontmatter {
        //
        //     }`,
        ...storeTypes,
        ...accountCustomFieldTypes,
        ...websiteTypes,
        ...formTypes,
    ];

    createTypes(typeDefs);
};

export const sourceNodes = async ({
    actions: { createNode },
    createNodeId,
    createContentDigest,
}) => {
    try {
        const API_ROUTE =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://api2.merlinpanel.com';

        const { data: website } = await Axios.get(`${API_ROUTE}/client/siteData`, {
            params: { websiteId },
            headers: { 'x-api-key': apiKey },
        });

        const { data: store } = await Axios.get(`${API_ROUTE}/client/product`, {
            params: { websiteId },
            headers: { 'x-api-key': apiKey },
        });

        const { data: categories } = await Axios.get(`${API_ROUTE}/client/category`, {
            params: { websiteId },
            headers: { 'x-api-key': apiKey },
        });

        const { data: accountCustomFields } = await Axios.get(
            `${API_ROUTE}/client/account/customFields`,
            {
                params: { websiteId },
                headers: { 'x-api-key': apiKey },
            }
        );

        const { data: forms } = await Axios.get(`${API_ROUTE}/client/form`, {
            params: { websiteId },
            headers: { 'x-api-key': apiKey },
        });

        createNode({
            ...website,
            websiteId: website._id,
            id: createNodeId(`merlin_website_${website._id}`),
            parent: null,
            children: [],
            internal: {
                type: `merlinWebsite`,
                content: JSON.stringify(website),
                contentDigest: createContentDigest(website),
            },
        });

        for (let product of store.products) {
            createNode({
                ...product,
                id: createNodeId(`merlin_store_product_${product._id}`),
                parent: null,
                children: [],
                internal: {
                    type: `merlinStoreProduct`,
                    content: JSON.stringify(product),
                    contentDigest: createContentDigest(product),
                },
            });
        }

        for (let category of categories) {
            createNode({
                ...category,
                websiteId: website._id,
                id: createNodeId(`merlin_store_category_${category._id}`),
                parent: null,
                children: [],
                internal: {
                    type: `merlinStoreCategory`,
                    content: JSON.stringify(category),
                    contentDigest: createContentDigest(category),
                },
            });
        }

        for (let accountCustomField of accountCustomFields) {
            createNode({
                ...accountCustomField,
                merlinId: accountCustomField.id,
                id: createNodeId(`merlin_account_custom_field_${accountCustomField._id}`),
                parent: null,
                children: [],
                internal: {
                    type: `merlinAccountCustomField`,
                    content: JSON.stringify(accountCustomField),
                    contentDigest: createContentDigest(accountCustomField),
                },
            });
        }

        for (let form of forms) {
            createNode({
                ...form,
                websiteId: form._id,
                id: createNodeId(`merlin_form_${form._id}`),
                parent: null,
                children: [],
                internal: {
                    type: `merlinForm`,
                    content: JSON.stringify(form),
                    contentDigest: createContentDigest(form),
                },
            });
        }
    } catch (error) {
        console.log({ error });
        console.log('response', error && error.response && error.response.data);
    }
};

export const createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const Register = path.resolve(`src/pages/register/index.js`);
    const Product = path.resolve(`src/templates/Product/index.js`);
    const Category = path.resolve(`src/templates/Category/index.js`);

    try {
        const {
            data: {
                allMerlinStoreProduct: { nodes: products },
                allMerlinStoreCategory: { nodes: categories },
            },
        } = await graphql(`
            query {
                allMerlinStoreProduct {
                    nodes {
                        _id
                        shortName
                    }
                }
                allMerlinStoreCategory {
                    nodes {
                        _id
                    }
                }
            }
        `);

        products.forEach(({ _id: id, shortName }) => {
            const path = `/store/product/${shortName}`;

            createPage({
                path,
                component: Product,
                context: {
                    id,
                },
            });
        });

        categories.forEach(({ _id: id }) => {
            createPage({
                path: `/store/category/${id}`,
                component: Category,
                context: {
                    id,
                },
            });
        });

        // createPage({
        //     path: `/register/dealer`,
        //     component: Register,
        //     context: {
        //         id: 'dealer',
        //     },
        // });
    } catch (error) {
        console.log({ error });
    }
};

exports.onCreateWebpackConfig = ({ stage, actions, plugins, getConfig }) => {
    actions.setWebpackConfig({
        plugins: [
            // Add the environment variables to webpack.DefinePlugin with define().
            plugins.define({
                'process.env.websiteId': JSON.stringify(websiteId),
            }),
        ],
    });

    if (stage === 'build-javascript') {
        const config = getConfig();
        const miniCssExtractPlugin = config.plugins.find(
            plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
        );
        if (miniCssExtractPlugin) {
            miniCssExtractPlugin.options.ignoreOrder = true;
        }
        actions.replaceWebpackConfig(config);
    }
};
