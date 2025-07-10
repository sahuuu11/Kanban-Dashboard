import React from "react";
import { Modal, Input, Select, DatePicker, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

const { Option } = Select;

const statuses = ["To Do", "In Progress", "Done"];

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  status: Yup.string().required("Status is required"),
  created: Yup.date().required("Created date is required"),
  assignee: Yup.string(),
});

const TaskModal = ({ visible, onCancel, onSubmit, task }) => {
  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "To Do",
    created: task?.created ? dayjs(task.created) : dayjs(),
    assignee: task?.assignee || "",
  };

  return (
    <Modal
      title={task ? "Edit Task" : "Create Task"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={(values) => {
          onSubmit({ ...values, created: dayjs(values.created) });
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Title */}
            <div style={{ marginBottom: 12 }}>
              <label>Title</label>
              <Field name="title" as={Input} />
              <ErrorMessage name="title" component="div" style={{ color: "red" }} />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 12 }}>
              <label>Description</label>
              <Field name="description" as={Input.TextArea} rows={3} />
              <ErrorMessage name="description" component="div" style={{ color: "red" }} />
            </div>

            {/* Status */}
            <div style={{ marginBottom: 12 }}>
              <label>Status</label>
              <Select
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                style={{ width: "100%" }}
              >
                {statuses.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
              <ErrorMessage name="status" component="div" style={{ color: "red" }} />
            </div>

            {/* Created Date */}
            <div style={{ marginBottom: 12 }}>
              <label>Created Date</label>
              <DatePicker
                style={{ width: "100%" }}
                value={values.created}
                onChange={(date) => setFieldValue("created", date)}
              />
              <ErrorMessage name="created" component="div" style={{ color: "red" }} />
            </div>

            {/* Assignee */}
            <div style={{ marginBottom: 12 }}>
              <label>Assignee</label>
              <Field name="assignee" as={Input} />
              <ErrorMessage name="assignee" component="div" style={{ color: "red" }} />
            </div>

            {/* Actions */}
            <div style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                Save
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TaskModal;
