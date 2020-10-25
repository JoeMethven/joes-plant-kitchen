export default [
    `type merlinStore implements Node {
        meta: merlinStoreMeta!
        products: [merlinStoreProduct!]!
    }`,
    `type merlinStoreMeta {
        total: Int
        pages: Int
    }`,
    `type merlinStoreProduct implements Node {
        meta: merlinStoreProductMeta
        images: [merlinStoreProductImage!]!
        tags: [String]!
        _id: String
        name: String
        price: Float
        description: String
        shortName: String
        quantity: Int
        category: merlinStoreCategory
    }`,
    `type merlinStoreProductImage {
        url: File @link(from: "url___NODE")
        fileName: String
    }`,
    `type merlinStoreProductMeta {
        timestamp: String
        publicationDate: String
        lastUpdated: String
        lastUpdatedByUserId: String
        creatorId: String
        websiteId: String
        deleted: Boolean
    }`,
    `type merlinStoreCategory implements Node {
        _id: String
        merlinId: String
        timestamp: Date
        name: String
        websiteId: String
        addedBy: String
    }`
];
