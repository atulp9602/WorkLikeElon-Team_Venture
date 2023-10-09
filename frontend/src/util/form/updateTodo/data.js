export const updateTodoFormData = [
  {
    label: "Todo",
    fields: [
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
        name: "estimatedTime",
        label: "Estimated Time (Minutes)",
        type: "number",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { name: "todo", value: "todo" },
          { name: "in-progress", value: "in-progress" },
          { name: "completed", value: "completed" },
        ],
      },
    ],
  },
];
