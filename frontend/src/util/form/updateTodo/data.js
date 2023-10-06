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
        name: "assignDueDate",
        label: "Due Date",
        type: "date",
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
