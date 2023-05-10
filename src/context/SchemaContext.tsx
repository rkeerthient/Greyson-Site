import React, { useState } from "react";
import { useContext } from "react";

const SchemaContext = React.createContext<any>({});

export const SchemaProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [schemaOrg, setSchemaOrg] = useState();
  return (
    <SchemaContext.Provider
      value={{
        schemaOrg,
        setSchemaOrg,
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
