export default [
    `type merlinWebsite implements Node {
        store: merlinWebsiteStore!
        meta: merlinWebsiteMeta!
        sendgrid: merlinWebsiteSendgrid!
        features: [merlinWebsiteFeatures!]!
        _id: String
        name: String
        domain: String
        email: String
        navigator: Boolean
    }`,
    `type merlinWebsiteStore {
        currency: merlinWebsiteStoreCurrency!
        shipStation: merlinWebsiteStoreShipStation!
        description: String
        name: String
        stripePublishableKey: String
        stripePublishableKeyTest: String
        stripeSecretKey: String
        stripeSecretKeyTest: String
    }`,
    `type merlinWebsiteStoreCurrency {
        symbol: String
        code: String
    }`,
    `type merlinWebsiteStoreShipStation {
        allowedShippingCodes: [String]!
        apiKey: String
        apiSecret: String
        active: Boolean
    }`,
    `type merlinWebsiteMeta {
        users: [String]!
        origins: [String]!
        stockLimit: Int
        productLimit: Int
        githubRepo: String
        creatorId: String
        timestamp: Date
        type: String
        faviconPath: String
        storeLastUpdatedBy: String
        storeLastUpdatedTimestamp: Date
    }`,
    `type merlinWebsiteSendgrid {
        standardTemplateId: String
    }`,
    `type merlinWebsiteFeatures {
        editor: Boolean
        analytics: Boolean
        dns: Boolean
        email: Boolean
        chat: Boolean
        store: Boolean
        enquiries: Boolean
        settings: Boolean
        newsletters: Boolean
    }`,
];
