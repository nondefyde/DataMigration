import { migrationsUrl } from '@/_shared/constants';
import { fetchData } from '@/_shared/helpers';
import { usePagination } from '@/hooks/usePagination';
import React, { useEffect, useState } from 'react';

const MigrationPage = () => {
  const {paginate, pagination} = usePagination({perPage: 5});
  const [] = useState()

  const migrationsParams = {
    ...paginate
  }
 
  useEffect(() => {
    fetchData(migrationsUrl, {}, migrationsParams)
    .then((data: any) => {
        console.log('fetchhhhhhh', data);
        
      })
      .catch(() => {
       
      });
  }, [])

  return <div>Migrations Page</div>;
};

export default MigrationPage;