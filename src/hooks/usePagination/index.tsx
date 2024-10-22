import { Pagination } from '@/_shared/namespace';
import { Dispatch, SetStateAction, useState } from 'react';

interface usePaginationType {
  key?: string;
  title?: string;
  perPage?: number;
}

interface usePaginationReturnProps {
  paginate: Record<'page' | 'perPage', any>;
  setPaginate?: Dispatch<SetStateAction<Record<'page' | 'perPage', any>>>;
  pagination: Pagination;
  setTotal: Dispatch<SetStateAction<number>>;
}

export const usePagination = ({
  key = '',
  title = '',
  perPage = 7,
}: usePaginationType): usePaginationReturnProps => {
  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: perPage,
  });
  const [total, setTotal] = useState<number>(0)

  const handlePageChange = (page: number, pageSize: number) => {
    // if (key === uniqueKey) {
    setPaginate({ page, perPage: pageSize });
    // }
  };

  const pagination = {
    showSizeChanger: false,
    showTotal: (total: number) => <span className="px-5">{`${total} ${title}`}</span>,
    onChange: handlePageChange,
    current: paginate?.page,
    pageSize: paginate?.perPage,
    total: total ?? 100,
    position: ['bottomLeft'],
  };

  return {
    paginate,
    pagination: pagination,
    setTotal
  };
};
