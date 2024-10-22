// components/DataTree.js
import React from 'react';
import { Button, Col, Row, Select, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { lowerCase, omit } from 'lodash';
import { camelCaseToSentence } from '@/_shared/helpers';
import dayjs from 'dayjs';
import {
  environmentOptions,
  mockShortQuestData,
  mockShortQuestDataSecond,
  serviceOptions,
} from '@/_shared/constants';

export interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}

function omitProperties(objectsArray: any[]) {
  return objectsArray?.map((obj) =>
    omit(obj, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta'])
  );
}

/**
 * DataTree Component
 * @param {Array} data - Array of objects to display
 *
 *
 */
interface DataTreeInterface {
  data: Record<string, any>[];
  setCurrentQuestData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setIsPromoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentMode: 'compare' | 'default';
  setCurrentMode: React.Dispatch<React.SetStateAction<'compare' | 'default'>>;
}

const DataTree = ({
  data,
  setCurrentQuestData,
  setIsPromoteModalOpen,
  currentMode,
}: DataTreeInterface) => {
  const handlePromoteItemButtonClick = (questData: Record<string, any>) => {
    setCurrentQuestData(questData);
    setIsPromoteModalOpen(true);
  };

  const convertToTreeData = (
    data: any,
    keyPrefix = '0',
    keyValue: string,
    mode: 'default' | 'compare'
  ) => {
    if (!Array.isArray(data)) {
      return [];
    }
    const parentNodeKeys = ['quest', 'objectives', 'interactions'];
    return data.flatMap((item, index) => {
      const currentKey = `${keyPrefix}-${index}`;
      const hasTitle =
        item.hasOwnProperty('title') ||
        keyValue === 'quest' ||
        parentNodeKeys.includes(lowerCase(keyValue));
      if (hasTitle) {
        // Use 'title' property as the node's title
        const nodeTitle =
          mode === 'compare' ? (
            `${item.title}`
          ) : (
            <div className="flex gap-5 items-center">
              <span>{item.title ?? `Item ${index + 1}`}</span>
              <Button
                className="opacity-100 hover:opacity-95 mt-1.5 font-normal border-cyan-500 text-cyan-500"
                disabled={false}
                loading={false}
                htmlType="submit"
                size="small"
                onClick={() => {
                  handlePromoteItemButtonClick?.(item);
                }}
              >
                Promote
              </Button>
            </div>
          );
        const children = Object.entries(item).reduce((acc: any, [key, value]: any, idx) => {
          if (key === 'title') return acc; // Skip 'title' as it's used for the node's title

          const propKey = `${currentKey}-${key}-${idx}`;

          if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              // Handle arrays of objects (e.g., 'friends')
              acc.push({
                title: `${camelCaseToSentence(key)}: [${value?.length}]`,
                key: `${propKey}`,
                children: convertToTreeData(omitProperties(value), propKey, key, currentMode),
              });
            } else {
              // Handle arrays of primitives (e.g., 'hobbies')
              acc.push({
                title: `${camelCaseToSentence(key)}:[${value.length}]`,
                key: `${propKey}`,
                children: value.map((arrayItem, arrIdx) => ({
                  title: `${arrIdx + 1}: ${String(arrayItem)}`,
                  key: `${propKey}-${arrIdx}`,
                })),
              });
            }
          } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects
            acc.push({
              title: `${camelCaseToSentence(key)}:`,
              key: `${propKey}`,
              children: convertToTreeData(
                [omit(value, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta'])],
                `${propKey}`,
                key,
                currentMode
              ),
            });
          } else {
            // Handle primitive values (e.g., 'age', 'isActive')
            acc.push({
              title: `${camelCaseToSentence(key)}: ${key === 'createdAt' ? dayjs(value).format('MM-DD-YY') : camelCaseToSentence(String(value))}`,
              key: `${propKey}`,
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
        // If object does NOT have 'title', directly add its properties as child nodes
        return Object.entries(item).reduce((acc: any, [key, value]: any, idx) => {
          const propKey = `${currentKey}-${key}-${idx}`;

          if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              // Handle arrays of objects (e.g., 'friends')
              acc.push({
                title: `${camelCaseToSentence(key)}: [${value.length}]`,
                key: `${propKey}`,
                children: convertToTreeData(omitProperties(value), propKey, key, currentMode),
              });
            } else {
              // Handle arrays of primitives (e.g., 'hobbies')
              acc.push({
                title: `${camelCaseToSentence(key)}:[${value.length}]`,
                key: `${propKey}`,
                children: value.map((arrayItem, arrIdx) => ({
                  title: `${arrIdx + 1}: ${String(arrayItem)}`,
                  key: `${propKey}-${arrIdx}`,
                })),
              });
            }
          } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects
            acc.push({
              title: `${camelCaseToSentence(key)}:`,
              key: `${propKey}`,
              children: convertToTreeData(
                [omit(value, ['_id', '__v', 'updatedAt', 'publicId', 'navigatorQuestMeta'])],
                `${propKey}`,
                key,
                currentMode
              ),
            });
          } else {
            // Handle primitive values (e.g., 'age', 'isActive')
            acc.push({
              title: `${camelCaseToSentence(key)}: ${key === 'createdAt' ? dayjs(value).format('MM-DD-YY') : camelCaseToSentence(String(value))}`,
              key: `${propKey}`,
            });
          }

          return acc;
        }, []);
      }
    });
  };

  const treeData = convertToTreeData(omitProperties(data), '0', 'quest', currentMode);
  // const treeData = convertToTreeData(omitProperties(mockShortQuestData), '0', 'quest');

  function compareAndHighlightArrays(
    first: any[],
    second: any[]
  ): { firstResult: any[]; secondResult: any[]; arrDifferences: number } {
    let differences = 0; // Keep track of the number of differences found

    // Count differences between the two arrays
    // function getDifference(fArr: any[], sArr: any[]) {
    //   fArr.forEach((fItem, index) => {
    //     const sItem = sArr[index];

    //     // Handle case when one array has more items than the other
    //     if (!sItem) return;

    //     // Compare titles
    //     if (fItem.title !== sItem.title) {
    //       differences++;
    //     }

    //     // Recursively check for children if both have them and they are arrays
    //     if (Array.isArray(fItem.children) && Array.isArray(sItem.children)) {
    //       getDifference(fItem.children, sItem.children);
    //     }
    //   });
    // }

    function getDifference(fArr: any[], sArr: any[]) {
      if (fArr.length !== sArr.length) {
        differences += Math.abs(fArr.length - sArr.length); // Count the difference in length
      }

      fArr.forEach((fItem, index) => {
        const sItem = sArr[index];

        // Handle case when one array has more items than the other
        if (!sItem) return;

        // Compare titles (using loose equality to handle type coercion or change this if needed)
        if (fItem.title !== sItem.title) {
          differences++;
        }

        // Recursively check for children if both have them and they are arrays
        if (Array.isArray(fItem.children) && Array.isArray(sItem.children)) {
          getDifference(fItem.children, sItem.children);
        }
      });
    }

    function deepCompareAndHighlight(
      fArr: any[],
      sArr: any[]
    ): { updatedFirstResult: any[]; updatedSecondResult: any[] } {
      const updatedFirstResult = fArr.map((fItem, index) => {
        const sItem = sArr[index];

        // Handle case when one array has more items than the other juvb.fgf df zxnmka bvmkmkd
        if (!sItem) return fItem;

        let updatedFirstItem = { ...fItem };
        let updatedSecondItem = { ...sItem };
        let childChanged = false; // Track if a change occurred in children

        // Compare titles (direct comparison)
        if (fItem.title !== sItem.title) {
          updatedFirstItem.title = (
            <span className="bg-red-200 dark:bg-red-500">{fItem.title}</span>
          );
          updatedSecondItem.title = (
            <span className="bg-green-200 dark:bg-green-600">{sItem.title}</span>
          );
        }

        // Recursively check for children if both have them and they are arraysndfhbjdsa
        if (Array.isArray(fItem.children) && Array.isArray(sItem.children)) {
          const {
            updatedFirstResult: childrenFirstResult,
            updatedSecondResult: childrenSecondResult,
          } = deepCompareAndHighlight(fItem.children, sItem.children);

          updatedFirstItem.children = childrenFirstResult;
          updatedSecondItem.children = childrenSecondResult;

          // Check if any child had a difference (contains a highlight class)
          if (childrenFirstResult.some((child) => child.title?.props?.className.includes('bg-'))) {
            childChanged = true;
          }
        }

        // If any child has a difference, highlight the parent's title (only if no direct change was found)
        // if (childChanged && !updatedFirstItem.title?.props?.className.includes('bg-red-200')) {
        //   updatedFirstItem.title = <span className="bg-blue">{fItem.title}</span>;
        // }

        if (childChanged && !updatedFirstItem.title?.props?.className.includes('bg-red-200')) {
          updatedFirstItem.title = (
            <span className="bg-transparent flex items-center gap-2">
              <span>{fItem.title}</span>
              <i className="ri-circle-fill mt-[2px] text-[8px] text-red-400 dark:text-red-600"></i>
            </span>
          );
        }

        return updatedFirstItem;
      });

      const updatedSecondResult = sArr.map((sItem, index) => {
        const fItem = fArr[index];

        // Handle case when one array has more items than the other
        if (!fItem) return sItem;

        let updatedFirstItem = { ...fItem };
        let updatedSecondItem = { ...sItem };
        let childChanged = false; // Track if a change occurred in children

        // Compare titles (direct comparison)
        if (fItem.title !== sItem.title) {
          updatedFirstItem.title = (
            <span className="bg-red-200 dark:bg-red-500">{fItem.title}</span>
          );
          updatedSecondItem.title = (
            <span className="bg-green-200 dark:bg-green-700">{sItem.title}</span>
          );
        }

        // Recursively check for children if both have them and they are arrays
        if (Array.isArray(fItem.children) && Array.isArray(sItem.children)) {
          const {
            updatedFirstResult: childrenFirstResult,
            updatedSecondResult: childrenSecondResult,
          } = deepCompareAndHighlight(fItem.children, sItem.children);

          updatedFirstItem.children = childrenFirstResult;
          updatedSecondItem.children = childrenSecondResult;

          // Check if any child had a difference (contains a highlight class)
          if (childrenSecondResult.some((child) => child.title?.props?.className.includes('bg-'))) {
            childChanged = true;
          }
        }

        // If any child has a difference, highlight the parent's title (only if no direct change was found)
        // if (childChanged && !updatedSecondItem.title?.props?.className.includes('bg-green-200')) {
        //   updatedSecondItem.title = <span className="bg-blue">{sItem.title}</span>;
        // }

        if (childChanged && !updatedSecondItem.title?.props?.className.includes('bg-green-200')) {
          updatedSecondItem.title = (
            <span className="bg-transparent flex items-center gap-2">
              <span>{sItem.title}</span>
              <i className="ri-circle-fill text-[8px] mt-[2px] text-green-400 dark:text-green-600"></i>
            </span>
          );
        }

        return updatedSecondItem;
      });

      return { updatedFirstResult, updatedSecondResult };
    }

    // First, count the differences
    getDifference(first, second);

    // Then, highlight the differences in the arrays
    const { updatedFirstResult, updatedSecondResult } = deepCompareAndHighlight(first, second);

    return {
      firstResult: updatedFirstResult,
      secondResult: updatedSecondResult,
      arrDifferences: differences,
    };
  }

  const { firstResult, secondResult, arrDifferences } = compareAndHighlightArrays(
    convertToTreeData(omitProperties(mockShortQuestData), '0', 'quest', currentMode),
    convertToTreeData(omitProperties(mockShortQuestDataSecond), '0', 'quest', currentMode)
  );

  // const { firstResult, secondResult, arrDifferences } = compareAndHighlightArrays(
  //   convertToTreeData(omitProperties(data), '0', 'quest', currentMode),
  //   convertToTreeData(omitProperties(data), '0', 'quest', currentMode)
  // );

  console.log(
    'my exampleee',
    convertToTreeData(omitProperties(mockShortQuestData), '0', 'quest', currentMode)
  );

  return (
    <>
      {currentMode === 'default' && (
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandAll={false}
          treeData={treeData ?? []}
          // style={{ display: currentMode !== 'default' ? 'none' : 'block' }} a nsd gbfdsh d dfbkahf
          className="text-[16px]"
        />
      )}
      {currentMode === 'compare' && (
        <div>
          <Row gutter={[10, 10]} className="mb-2">
            <Col lg={12} xs={24}>
              <span className="text-muted-foreground">current</span>
            </Col>
            <Col lg={12} xs={24}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Environment:</span>
                  <Select
                    options={environmentOptions}
                    className="w-[180px]"
                    placeholder={'Environment'}
                    // size="small"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Service:</span>
                  <Select
                    options={serviceOptions}
                    className="w-[180px]"
                    placeholder={'Service'}
                    // size="small"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col lg={12} xs={24} className="">
              <div className="w-full border border-neutral-200">
                <Tree
                  showLine
                  switcherIcon={<DownOutlined />}
                  defaultExpandAll={false}
                  treeData={firstResult ?? []}
                  className="text-[16px]"
                />
              </div>
            </Col>
            <Col lg={12} xs={24} className="">
              <div className="w-full border border-neutral-200 h-full">
                <Tree
                  showLine
                  switcherIcon={<DownOutlined />}
                  defaultExpandAll={false}
                  treeData={secondResult ?? []}
                  className="text-[16px]"
                />
              </div>
            </Col>
          </Row>
          <div className="flex flex-col mt-3 gap-1">
            <div className="font-semibold text-[16px]">{`${arrDifferences} changes made`}</div>
            <Button
              className="opacity-100 hover:opacity-70 inline w-[120px] bg-black dark:bg-neutral-200 text-white dark:text-black !h-10 px-4 font-semibold rounded-md"
              type="primary"
              disabled={false}
              onClick={() => setIsPromoteModalOpen(true)}
              // size="large"d dsbdbs,m
            >
              Migrate
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTree;
