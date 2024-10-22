import { Button, Col, Divider, Form, Row, Select, Tree } from 'antd';
import React, { useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { camelCaseToSentence } from '@/_shared/helpers';
import { lowerCase, omit } from 'lodash';
import dayjs from 'dayjs';
import { useForm } from 'antd/lib/form/Form';
import { environmentOptions, serviceOptions } from '@/_shared/constants';

interface PromoteItemModalProps {
  item: Record<string, any>;
  handlePromoteItem: (values: Record<string, any>) => void;
  isLoadingPromoteItem: boolean;
}

function omitProperties(objectsArray: any[]) {
  return objectsArray?.map((obj) =>
    omit(obj, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta'])
  );
}

const convertObjectToTreeData = (data: any, keyPrefix = '0', keyValue: string) => {
  const parentNodeKeys = ['quest', 'objectives', 'interactions'];

  return Object.entries(data).map(([key, item]: any, index): any => {
    const currentKey = `${keyPrefix}-${index}`;
    const hasTitle =
      item?.hasOwnProperty('title') ||
      keyValue === 'quest' ||
      parentNodeKeys.includes(lowerCase(keyValue));

    // For top-level properties
    if (keyPrefix === '0') {
      if (typeof item === 'object' && item !== null) {
        return {
          title: `${camelCaseToSentence(key)}`,
          key: currentKey,
          children: convertObjectToTreeData(
            omit(item, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta']),
            currentKey,
            key
          ),
        };
      } else {
        return {
          title: `${camelCaseToSentence(key)}: ${
            key === 'createdAt' ? dayjs(key).format('MM-DD-YY') : String(item)
          }`,
          key: currentKey,
        };
      }
    }

    // If object has 'title' or special keys, create a node with children
    if (hasTitle) {
      const nodeTitle = <span>{item?.title ?? `Item ${index + 1}`}</span>;

      // Build children for nodes that contain other properties
      const children = Object.entries(
        omit(item, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta'])
      ).reduce((acc: any, [childKey, childValue]: any, idx) => {
        if (childKey === 'title') return acc; // Skip 'title' as it's used for the node's title

        const propKey = `${currentKey}-${childKey}-${idx}`;

        if (Array.isArray(childValue)) {
          if (childValue.length > 0 && typeof childValue[0] === 'object') {
            // Arrays of objects
            acc.push({
              title: `${camelCaseToSentence(childKey)}: [${childValue.length}]`,
              key: propKey,
              children: convertObjectToTreeData(omitProperties(childValue), propKey, childKey),
            });
          } else {
            // Arrays of primitives
            acc.push({
              title: `${camelCaseToSentence(childKey)}: [${childValue.length}]`,
              key: propKey,
              children: childValue.map((arrayItem, arrIdx) => ({
                title: `${arrIdx + 1}: ${String(arrayItem)}`,
                key: `${propKey}-${arrIdx}`,
              })),
            });
          }
        } else if (typeof childValue === 'object' && childValue !== null) {
          // Nested objects
          acc.push({
            title: `${camelCaseToSentence(childKey)}:`,
            key: propKey,
            children: convertObjectToTreeData(
              omit(childValue, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta']),
              propKey,
              childKey
            ),
          });
        } else {
          // Primitives (e.g., 'age', 'isActive')
          acc.push({
            title: `${camelCaseToSentence(childKey)}: ${
              childKey === 'createdAt' ? dayjs(childValue).format('MM-DD-YY') : String(childValue)
            }`,
            key: propKey,
          });
        }

        return acc;
      }, []);

      return {
        title: nodeTitle,
        key: currentKey,
        children,
      };
    } else {
      // If object does NOT have 'title', add its properties directly as children
      if (typeof item === 'object' && item !== null) {
        return {
          title: camelCaseToSentence(key),
          key: currentKey,
          children: convertObjectToTreeData(
            omit(item, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta']),
            currentKey,
            key
          ),
        };
      } else {
        return {
          title: `${camelCaseToSentence(key)}: ${
            key === 'createdAt' ? dayjs(key).format('MM-DD-YY') : String(item)
          }`,
          key: currentKey,
        };
      }
    }
  });
};

const PromoteItemModal = ({
  item,
  handlePromoteItem,
  isLoadingPromoteItem,
}: PromoteItemModalProps) => {
  const treeData = convertObjectToTreeData(
    omit(item, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta']),
    '0',
    'title'
  );
  const [form] = useForm();

  useEffect(() => {
    console.log('currentQuestData', item);
  }, [item]);

  const onFinish = (values: Record<string, any>) => {
    const payload = {
      ...values,
      type: item?.type ?? '',
      dataIds: [item?.id],
    };

    handlePromoteItem(payload);
  };

  return (
    <div className="w-full">
      <div className="font-bold text-[24px] mb-3">Promote Item</div>
      <div
        className="w-full mb-4 h-[380px] max-h-[380px] dark:bg-[#141414] overflow-y-scroll border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm py-1"
        style={{ scrollbarWidth: 'thin', scrollBehavior: 'smooth', scrollbarColor: 'black' }}
      >
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          treeData={treeData ?? {}}
          className="text-[16px]"
        />
      </div>
      {/* <Divider className="!m-0" /> */}
      <Row>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(value) => {
            onFinish(value);
          }}
          name="promote-item-form"
          className="mt-5 w-full"
        >
          <Row gutter={[10, 10]}>
            <Col lg={12} xs={24}>
              <Form.Item
                name="destination"
                rules={[{ required: true, message: 'Enter your business category' }]}
                label={
                  <span className="font-semibold text-muted-foreground">
                    Destination Environment
                  </span>
                }
              >
                <Select
                  options={environmentOptions}
                  className="w-[300px]"
                  placeholder={'Select destination environment'}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="services"
                rules={[{ required: true, message: 'Enter your business category' }]}
                label={<span className="font-semibold text-muted-foreground">Service</span>}
              >
                <Select
                  mode="multiple"
                  options={serviceOptions}
                  className="w-[300px]"
                  placeholder={'Select service(s)'}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button
              className="opacity-100 hover:opacity-70 mt-1.5 bg-black dark:!bg-neutral-100 text-white dark:!text-black !h-14 font-semibold rounded-md"
              type="primary"
              disabled={false}
              block
              loading={isLoadingPromoteItem}
              htmlType="submit"
              // size="large"
            >
              Promote Item
            </Button>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default PromoteItemModal;
