import React, { useState } from "react";
import { useContext } from "react";

const SchemaContext = React.createContext<any>({});

export const SchemaProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [schemaOrg, setSchemaOrg] = useState();
  const [schemaOrg1, setSchemaOrg1] = useState();

  return (
    <SchemaContext.Provider
      value={{
        schemaOrg,
        setSchemaOrg,
        schemaOrg1,
        setSchemaOrg1,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

// make sure use
export const useSchemaContext = () => {
  return useContext(SchemaContext);
};
