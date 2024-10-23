import { ColumnsType } from 'antd/es/table';
import React from 'react';
import moment from 'moment';
import { capitalize, startCase } from 'lodash';
import { Skeleton, Tag } from 'antd';
import { Table } from 'antd/lib';
import { Pagination } from '@/_shared/namespace';
import { mediaSize, useMediaQuery } from '@/_shared/components/responsiveness';

interface MigrationsTableProps {
  isLoadingMigrations: boolean;
  pagination: Pagination;
  migrationsData: Record<string, any>[];
  handleRowClick?: (record: any) => void;
}

const MigrationsTable = ({isLoadingMigrations, pagination, migrationsData, handleRowClick}:MigrationsTableProps) => {
    const isMobile = useMediaQuery(mediaSize.mobile);

     const columns: ColumnsType<any> = [
       {
         dataIndex: 'entry',
         key: 'entry',
         width: 40,
         render: (text) => (
           <span>
             {text === 'debit' && <i className="ri-arrow-left-up-line text-red-600"></i>}
             {text === 'credit' && <i className="ri-arrow-right-down-line text-green-500"></i>}
           </span>
         ),
       },
       {
         title: (
           <span className="flex text-[14px] font-semibold text-gray-500 items-center gap-1">
             <span>Date</span>
           </span>
         ),
         ellipsis: {
           showTitle: true,
         },
         dataIndex: 'createdAt',
         key: 'createdAt',
         render: (text) => {
           return <span>{moment(text).format('MMM DD, YYYY hh:mm A')}</span>;
         },
       },
       {
         title: (
           <span className="flex text-[14px] font-semibold text-gray-500 items-center gap-1">
             <span className="w-full text-center">Source</span>
           </span>
         ),
         dataIndex: 'sourceService',
         key: 'sourceService',
         width: '150px',
         align: 'center',
         render: (text) => <span className=" font-semibold">{startCase(capitalize(text))}</span>,
       },
       {
         title: (
           <span className="flex text-[14px] font-semibold text-gray-500 items-center gap-1">
             <span className="w-full text-center">Destination</span>
           </span>
         ),
         dataIndex: 'destination',
         key: 'destination',
         ellipsis: {
           showTitle: true,
         },
         align: 'center',
         render: (text) => <span className=" font-semibold">{startCase(capitalize(text))}</span>,
       },
       {
         title: (
           <span className="flex text-[14px] font-semibold text-gray-500 items-center gap-1">
             <span>Services</span>
           </span>
         ),
         dataIndex: 'services',
         width: '150px',
         key: 'services',
         ellipsis: {
           showTitle: false,
         },
         render: (values) => (
           <span className="flex gap-1 flex-wrap">
             {values?.map((value: any) => <Tag color="success">{value}</Tag>)}
           </span>
         ),
       },
       {
         title: (
           <span className="flex text-[14px] font-semibold text-gray-500 items-center gap-1">
             <span>Status</span>
           </span>
         ),
         dataIndex: 'status',
         width: '150px',
         key: 'status',
         ellipsis: {
           showTitle: false,
         },
         render: (values) => (
           <span className="flex gap-1 flex-wrap">
             {values?.map((value: any) => <Tag color="success">{value}</Tag>)}
           </span>
         ),
       },
     ];

     const rowClick = (record: any) => ({
       onClick: () => handleRowClick?.(record),
     });

  return (
    <Skeleton
      active
      loading={isLoadingMigrations}
      paragraph={{ rows: 5 }}
    >
      <Table
        size="large"
        columns={columns}
        pagination={pagination}
        dataSource={migrationsData}
        scroll={{ x: isMobile ? true : 0 }}
        className={'transaction-table dark:bg-zinc-800 rounded-lg'}
        onRow={rowClick}
        loading={isLoadingMigrations}
      />
    </Skeleton>
  );
};

export default MigrationsTable;