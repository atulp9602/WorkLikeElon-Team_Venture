export const getCreateTodoFormData = (options) => {
  return [
    {
      label: "Todo",
      fields: [
        {
          name: "groupId",
          label: "Group Name",
          type: "select",
          options,
        },
        {
          name: "title",
          label: "Name",
          type: "text",
        },
        {
          name: "description",
          label: "Notes",
          type: "textArea",
          textareaRows: 2,
        },
        {
          name: "assignDueDate",
          label: "Due Date",
          type: "date",
        },
      ],
    },
  ];
};
