import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";

const DynamicForm = ({
  validationSchema,
  formConfig,
  initialValues,
  defaultValues,
  onSubmit,
  layout = "vertical",
  buttonLabel = "Submit",
  buttonClass = "btn btn-primary w-100",
  errorTextClassName = "text-danger",
  suggestForSignup,
  suggestForLogin,
  suggestForForgotPassword,
  options,
  isResponseLoading,
  ...formProps
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    trigger,
    getValues,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    values: initialValues ?? {},
    defaultValues,
  });

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }
    reset(defaultValues);
  }, [isSubmitSuccessful]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
    trigger(name);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
    const currentValues = Array.isArray(getValues(name))
      ? [...getValues(name)]
      : [];

    if (checked) {
      currentValues.push(value);
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }

    setValue(name, currentValues);
    trigger(name);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    trigger(name);
  };

  const renderField = (field) => {
    const {
      name,
      label,
      type,
      options,
      validation,
      textareaRows,
      multiple,
      readOnly,
      hidden,
    } = field;

    switch (type) {
      case "text":
      case "number":
      case "email":
      case "password":
      case "date":
        return (
          <Form.Group controlId={name} key={name} className="mb-2">
            <Form.Label hidden={hidden ? true : false}>{label}</Form.Label>
            <Form.Control
              type={type}
              {...register(name, validation)}
              onChange={handleInputChange}
              onBlur={handleBlur}
              readOnly={readOnly ? true : false}
              hidden={hidden ? true : false}
            />
            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );
      case "textArea":
        return (
          <Form.Group controlId={name} key={name} className="mb-2">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              as="textarea"
              rows={textareaRows}
              name={name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              {...register(name, validation)}
            />
            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );

      case "checkbox":
        return (
          <Form.Group key={name} controlId={name} className="mb-3">
            <Form.Label>{label}</Form.Label>
            {options.map((option) => (
              <Form.Check
                key={`${name}-${option}`}
                type="checkbox"
                id={`${name}-${option}`}
                value={option}
                label={option}
                defaultChecked={
                  defaultValues && defaultValues[name]?.includes(option)
                }
                {...register(name, validation)}
                onChange={handleCheckboxChange}
                onBlur={handleBlur}
              />
            ))}
            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );

      case "radio":
        return (
          <Form.Group key={name} controlId={name} className="mb-2">
            <Form.Label>{label}</Form.Label>
            {options.map((option) => (
              <Form.Check
                key={`${name}-${option}`}
                type="radio"
                id={`${name}-${option}`}
                value={option}
                label={option}
                defaultChecked={defaultValues && defaultValues[name] === option}
                {...register(name, validation)}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            ))}
            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );

      case "select":
        return (
          <Form.Group controlId={name} key={name} className="mb-2">
            <Form.Label>{label}</Form.Label>
            <Form.Select
              as="select"
              {...register(name, validation)}
              onChange={handleInputChange}
              onBlur={handleBlur}>
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option key={`${name}-${index}`} value={option?.value}>
                  {option?.name}
                </option>
              ))}
            </Form.Select>
            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );

      case "file":
        return (
          <Form.Group controlId={name} key={name} className="mb-2">
            <Form.Label>{label}</Form.Label>
            <Controller
              control={control}
              name={name}
              rules={{ required: "Required !" }}
              render={({ field: { value, onChange, ...fields } }) => {
                return (
                  <Form.Control
                    {...fields}
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    value={value?.fileName}
                    onChange={(event) => {
                      onChange(event.target.files);
                    }}
                    // onBlur={handleBlur}
                    multiple={multiple}
                  />
                );
              }}
            />

            {errors[name] && (
              <Form.Text className={errorTextClassName}>
                {errors[name].message}
              </Form.Text>
            )}
          </Form.Group>
        );

      default:
        return null;
    }
  };

  const renderFieldsRecursive = (fields) => {
    return fields.map((field, index) => {
      if (field.fields) {
        return (
          <div key={index}>
            <h3 align="center" className="mb-3">
              {field.label.toUpperCase()}
            </h3>
            <Row>{renderFieldsRecursive(field.fields)}</Row>
          </div>
        );
      }
      return renderField(field);
    });
  };

  const renderFields = (fields) => {
    return <div>{renderFieldsRecursive(fields)}</div>;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...formProps} noValidate>
      {renderFields(formConfig)}
      <Button
        type="submit"
        disabled={isResponseLoading}
        className={`${buttonClass} my-2`}>
        {isResponseLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          buttonLabel
        )}
      </Button>
      {suggestForSignup || suggestForLogin}
      {suggestForForgotPassword}
    </Form>
  );
};

export default DynamicForm;
