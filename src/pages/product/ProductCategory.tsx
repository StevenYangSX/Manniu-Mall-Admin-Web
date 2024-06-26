import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import type { FormInstance, RadioChangeEvent, TableColumnsType } from "antd";
import { getProductCategoryListApi } from "@/api/product/productCategoryApi";
import { ProductCategoryType } from "@/types/systemDataTypes";
import { UploadOutlined } from "@ant-design/icons";
import useImageUploadManager from "@/hooks/useImageUploadManager";

const columns: TableColumnsType<ProductCategoryType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Category Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Category Status",
    dataIndex: "show",
    key: "id",
  },
  {
    title: "Action",
    key: "action",
    render: (_, _record) => (
      <Space size="middle">
        <a>Modify</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

interface SelectionElement {
  value: number;
  label: string;
}

const ProductCategory: React.FC = () => {
  const [categoryData, setCategoryData] = useState<ProductCategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [categoryModalShow, setCategoryModalShow] = useState<boolean>(false);
  const [categoryStatusRadiovValue, setCategoryStatusRadiovValue] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryLevel, setCategoryLevel] = React.useState<SelectionElement[]>([]);

  const { ImageUploadManagerWrap, toggleImageUploadManager } = useImageUploadManager();

  const handleOk = async (values: any) => {
    console.log(values);
    setConfirmLoading(true);
  };

  const formInitialValues = {
    menuNameL: "",
    path: "",
    menuType: 0,
    uniqAuth: "",
    parendId: undefined,
    icon: "",
    sort: undefined,
  };

  interface SubmitButtonProps {
    form: FormInstance;
  }
  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
  }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={() => handleOk(values)}
        loading={confirmLoading}
      >
        {children}
      </Button>
    );
  };

  useEffect(() => {
    const fetchProductCategoryList = async () => {
      setLoading(true);
      try {
        const response = await getProductCategoryListApi();
        console.log("==>", response);
        setCategoryData(response.data);
        setCategoryLevel([
          {
            value: 0,
            label: "Parent Level",
          },
          ...response.data
            .filter((ele) => ele.parentId === 0)
            .map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
        ]);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProductCategoryList();
  }, []);

  const toggleAddCategoryModal = () => {
    setCategoryModalShow(!categoryModalShow);
  };

  const handleCancel = () => {
    // TODO reset form
    // form.resetFields();

    setCategoryModalShow(false);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setCategoryStatusRadiovValue(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={toggleAddCategoryModal}>
        + Add Category
      </Button>

      <ImageUploadManagerWrap />

      <Modal
        forceRender
        title="Add Category"
        open={categoryModalShow}
        width="55vw"
        onCancel={handleCancel}
        footer={() => (
          <>
            <Form.Item>
              <Space>
                <SubmitButton form={form}>Submit</SubmitButton>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </>
        )}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          style={{ marginTop: "26px" }}
          initialValues={formInitialValues}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="parentId" label="Category Level" rules={[{ required: true }]}>
                <Select options={categoryLevel} placeholder="Parent Level Category" allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
                <Input placeholder="Please enter category name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="image" label="Category Image">
                <UploadOutlined onClick={toggleImageUploadManager} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="show" label="Category Status">
                <Radio.Group onChange={onRadioChange} value={categoryStatusRadiovValue}>
                  <Radio value={0}>Show</Radio>
                  <Radio value={1}>Hide</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="sort" label="Category Sort">
                {/* <Input placeholder="Order of the menu item. More means upper" type="number" /> */}
                <InputNumber
                  min={1}
                  max={1000}
                  placeholder="Order of the menu item. More means upper"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Divider />
      <Table columns={columns} dataSource={categoryData} />
    </>
  );
};

export default ProductCategory;
