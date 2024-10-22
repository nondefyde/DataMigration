import { AppContext } from '@/app-context';
import { capitalize, startCase } from 'lodash';
import React, { useContext } from 'react';

const CurrentEnvironment = () => {
  const { environment } = useContext(AppContext);

  return (
    <div className="py-2 my-3 mb-6">
      <h2 className="text-xl font-bold mb-2">
        Environment: {startCase(capitalize(environment ?? ''))}
      </h2>
      <p className="text-sm text-muted-foreground">
        {environment === 'production' &&
          'You are currently in the production environment. Be cautious with any changes.'}
        {environment === 'project' &&
          'You are in the project environment. This is suitable for testing and development.'}
        {environment === 'development' &&
          'You are in the development environment. Feel free to experiment and make changes.'}
      </p>
    </div>
  );
};

export default CurrentEnvironment;
