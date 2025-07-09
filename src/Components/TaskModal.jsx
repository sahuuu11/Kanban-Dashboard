import React from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const statuses = ["To Do", "In Progress", "Done"];

const TaskModal = ({ visible, onCancel, onSubmit, task }) => {
  return (
    <Modal
      title={task ? "Edit Task" : "Create Task"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        layout="vertical"
        initialValues={{
          title: task?.title,
          description: task?.description,
          status: task?.status || "To Do",
          created: task?.created || dayjs(),
          assignee: task?.assignee,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            {statuses.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Created Date" name="created" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Assignee" name="assignee">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
