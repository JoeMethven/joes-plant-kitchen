export default [
    `type merlinAccountCustomField implements Node {
        _id: String
        websiteId: String
        addedBy: String
        updatedBy: String
        timestamp: Date
        updatedTimestamp: Date
        accountTypes: [merlinAccountCustomFieldAccountTypes],
        disabled: Boolean
        label: String
        type: String
        value: String
        hint: String
        id: String
        optional: Boolean
    }`,
    `type merlinAccountCustomFieldAccountTypes {
        _id: String
        timestamp: Date
        name: String
        websiteId: String
        addedBy: String
        disabled: Boolean
        id: String
    }`,
];
