import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import DataTree from './lib/custom-quest-tree';
import { Card, Input, Modal, Pagination, Select, Skeleton, Tooltip } from 'antd';
import { mediaSize, useMediaQuery } from '@/_shared/components/responsiveness';
import PromoteItemModal from './lib/promote-item-modal';
import { Pagination as PaginationType } from '@/_shared/namespace';
import { isEmpty, omit } from 'lodash';

interface QuestProps {
  questData: Record<string, any>[];
  isLoadingQuestData: boolean;
  handlePromoteItem: (values: Record<string, any>) => void;
  isLoadingPromoteItem: boolean;
  paginate: Record<'perPage' | 'page', any>;
  pagination: PaginationType;
  tagOptions: Record<string, any>[];
  typesOptions: Record<string, any>[];
  setFilterData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  filterData: Record<string, any>;
  debouncedChangeHandler: (e: string) => void;
}

const Quest = ({
  questData,
  isLoadingQuestData,
  handlePromoteItem,
  isLoadingPromoteItem,
  pagination,
  tagOptions,
  typesOptions,
  setFilterData,
  filterData,
  debouncedChangeHandler,
}: QuestProps) => {
  const [isPromteModalOpen, setIsPromoteModalOpen] = useState<boolean>(false);
  const [isMigrateModalOpen, setIsMigrateModalOpen] = useState<boolean>(false);
  const [currentQuestData, setCurrentQuestData] = useState<Record<string, any>>({});
  const [currentMode, setCurrentMode] = useState<'compare' | 'default'>('default');

  const isMobile = useMediaQuery(mediaSize.mobile);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    debouncedChangeHandler(inputValue);
  };

  useEffect(() => {
    console.log('inner types', typesOptions);
  }, [typesOptions]);

  // const sampleData = {
  //   id: 1,
  //   title: 'John Doe',
  //   age: 30,
  //   isActive: true,
  //   address: {
  //     street: '123 Main St',
  //     city: 'New York',
  //     coordinates: {
  //       lat: 40.7128,
  //       lng: -74.006,
  //     },
  //   },
  //   hobbies: ['Reading', 'Traveling', 'Swimming'],
  //   friends: [
  //     {
  //       id: 11,
  //       title: 'John Doe friend 1',
  //       age: 30,
  //       isActive: true,
  //       address: {
  //         street: '123 Main St',
  //         city: 'New York',
  //         coordinates: {
  //           lat: 40.7128,
  //           lng: -74.006,
  //         },
  //       },
  //       hobbies: ['Reading', 'Traveling', 'Swimming'],
  //       friends: [],
  //     },
  //     {
  //       id: 1,
  //       title: 'John Doe friend 2',
  //       age: 30,
  //       isActive: true,
  //       address: {
  //         street: '123 Main St',
  //         city: 'New York',
  //         coordinates: {
  //           lat: 40.7128,
  //           lng: -74.006,
  //         },
  //       },
  //       hobbies: ['Reading', 'Traveling', 'Swimming'],
  //       friends: [],
  //     },
  //   ],
  // };

  return (
    <div>
      <div className="flex gap-1 mb-2">
        <Tooltip title={'default'}>
          <div
            className={`${currentMode === 'default' ? 'bg-neutral-100 dark:bg-neutral-700' : ''} flex gap-1 items-center justify-center rounded-md px-2 py-1`}
            onClick={() => setCurrentMode('default')}
          >
            <i className="ri-list-check text-[18px]"></i>
            <span className="cursor-default">Default</span>
          </div>
        </Tooltip>

        <Tooltip title={'compare'}>
          <div
            className={`${currentMode === 'compare' ? 'bg-neutral-100 dark:bg-neutral-700' : ''} flex gap-1 items-center justify-center rounded-md px-2 py-1`}
            onClick={() => setCurrentMode('compare')}
          >
            <i className="ri-layout-column-line text-[18px]"></i>
            <span className=" cursor-default">Compare</span>
          </div>
        </Tooltip>
      </div>
      <div className="flex justify-between items-center mb-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Input
            placeholder={'Search Quests...'}
            className="w-80"
            style={{ borderRadius: '5px' }}
            onChange={handleSearch}
            size="large"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Tags:</span>
            <Select
              options={tagOptions ?? []}
              className="quest-tag-select w-[300px]"
              placeholder={'Tag'}
              size="large"
              mode="multiple"
              onChange={(value: any) => {
                console.log('tagssss', value);
                isEmpty(value)
                  ? setFilterData({ ...omit(filterData, 'tag') })
                  : setFilterData({ ...filterData, tags: JSON.stringify(value) });
              }}
              // size="small"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Type:</span>
            <Select
              options={typesOptions ?? []}
              className="w-[300px]"
              placeholder={'Type'}
              size="large"
              onChange={(value: any) =>
                isEmpty(value)
                  ? setFilterData({ ...omit(filterData, 'type') })
                  : setFilterData({ ...filterData, type: value })
              }
              // size="small"
            />
          </div>
        </div>
      </div>

      <Card className="shadow-sm border-neutral-200 dark:border-neutral-600">
        <Skeleton loading={isLoadingQuestData} active={true} title={false} paragraph={{ rows: 10 }}>
          <DataTree
            data={questData}
            setCurrentQuestData={setCurrentQuestData}
            setIsPromoteModalOpen={setIsPromoteModalOpen}
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
          />
        </Skeleton>

        <div className="mt-3">
          <Pagination
            current={pagination?.current}
            pageSize={pagination?.pageSize}
            total={pagination?.total}
            onChange={pagination?.onChange}
            showSizeChanger={pagination?.showSizeChanger}
          />
        </div>

        <Modal
          className="overflow-y-scroll min-w-[600px]"
          title={``}
          open={isPromteModalOpen}
          onCancel={() => {
            setIsPromoteModalOpen(false);
          }}
          style={{ minWidth: isMobile ? '400px' : '700px' }}
          footer={null}
          closable
        >
          <PromoteItemModal
            item={currentQuestData}
            handlePromoteItem={handlePromoteItem}
            isLoadingPromoteItem={isLoadingPromoteItem}
          />
        </Modal>

        <Modal
          className="overflow-y-scroll min-w-[600px]"
          title={``}
          open={isMigrateModalOpen}
          onCancel={() => {
            setIsMigrateModalOpen(false);
          }}
          style={{ minWidth: isMobile ? '400px' : '700px' }}
          footer={null}
          closable
        >
          <PromoteItemModal
            item={currentQuestData}
            handlePromoteItem={handlePromoteItem}
            isLoadingPromoteItem={isLoadingPromoteItem}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default Quest;
