export default [
  `type merlinForm implements Node {
        _id: String
        name: String
        description: String
        sections: [merlinFormSections]
        meta: merlinFormMeta
    }`,
  `type merlinFormSections {
        title: String
        description: String
        type: String
        description: String
        multiple: Boolean
        fields: [merlinFormSectionsForms]
        min: Int
        max: Int
    }`,
  `type merlinFormSectionsForms {
        type: String
        label: String
        options: [merlinFormSectionsFormsOptions]
        optional: Boolean
        hint: String
    }`,
  `type merlinFormSectionsFormsOptions {
      _id: String
      label: String
    }`,
  `type merlinFormMeta {
        createdBy: Date
        timestamp: Date
        name: String
        updatedBy: String
        updatedTimestamp: Date
        websiteId: String
    }`,
];
